/**
 * Tests for the game-won win screen freeze bug fix.
 *
 * Root causes addressed:
 *  1. GameScene._checkLevelComplete fired every frame once the door was passed,
 *     potentially queuing multiple scene transitions.  Fixed with a _levelComplete guard.
 *  2. CharacterSelectScene did not update the start button when the scene was
 *     restarted with an already-selected character (constructor only runs once for
 *     Phaser scene singletons).  Fixed by re-reading selectedCharacter from the
 *     registry in create() and calling _updateStartButton() when appropriate.
 *  3. LevelCompleteScene "Play Again" did not reset playerHealth to 100, so the
 *     new game would start with the player's leftover HP from level 20.
 */

import { describe, it, expect, vi, beforeAll } from 'vitest';

let GameScene;
let LevelCompleteScene;
let CharacterSelectScene;

beforeAll(async () => {
  globalThis.Phaser = {
    Scene: class {
      constructor() {}
    },
    GameObjects: {
      Sprite: class {}
    },
    Physics: {
      Arcade: {
        Sprite: class {}
      }
    },
    Input: {
      Keyboard: {
        KeyCodes: {}
      }
    },
    Math: {
      Distance: { Between: () => 0 },
      Between: (min, max) => min
    }
  };

  ([{ default: GameScene }, { default: LevelCompleteScene }, { default: CharacterSelectScene }] =
    await Promise.all([
      import('../src/scenes/GameScene.js'),
      import('../src/scenes/LevelCompleteScene.js'),
      import('../src/scenes/CharacterSelectScene.js')
    ]));
});

// ---------------------------------------------------------------------------
// Fix 1 – GameScene._checkLevelComplete guard
// ---------------------------------------------------------------------------
describe('GameScene._checkLevelComplete guard', () => {
  function makeScene(playerX, doorX, currentLevel) {
    const scene = Object.create(GameScene.prototype);
    scene._levelComplete = false;
    scene.levelScore = 0;
    scene.coinsAtStart = 0;
    scene.levelData = { doorX };
    scene.player = { x: playerX, health: 80, coins: 5 };
    scene.game = {
      registry: {
        get: vi.fn((key) => (key === 'currentLevel' ? currentLevel : 0)),
        set: vi.fn()
      }
    };
    scene.scene = {
      stop: vi.fn(),
      start: vi.fn()
    };
    return scene;
  }

  it('triggers level complete when player passes the door', () => {
    const scene = makeScene(400, 300, 5);
    scene._checkLevelComplete();
    expect(scene.scene.start).toHaveBeenCalledWith('LevelCompleteScene');
    expect(scene._levelComplete).toBe(true);
  });

  it('does NOT trigger level complete a second time (guard prevents double-fire)', () => {
    const scene = makeScene(400, 300, 5);
    scene._checkLevelComplete(); // first call – should fire
    const callCount = scene.scene.start.mock.calls.length;
    scene._checkLevelComplete(); // second call – should be blocked
    expect(scene.scene.start.mock.calls.length).toBe(callCount); // no additional call
  });

  it('does not trigger when player has not reached the door', () => {
    const scene = makeScene(100, 300, 5);
    scene._checkLevelComplete();
    expect(scene.scene.start).not.toHaveBeenCalled();
  });

  it('does not advance currentLevel beyond 20 at the final level', () => {
    const scene = makeScene(400, 300, 20);
    scene._checkLevelComplete();
    // set should NOT be called with 'currentLevel' to advance it
    const levelAdvanceCalls = scene.game.registry.set.mock.calls.filter(
      ([key, val]) => key === 'currentLevel' && val === 21
    );
    expect(levelAdvanceCalls.length).toBe(0);
  });

  it('stops HUDScene when level is complete', () => {
    const scene = makeScene(400, 300, 3);
    scene._checkLevelComplete();
    expect(scene.scene.stop).toHaveBeenCalledWith('HUDScene');
  });
});

// ---------------------------------------------------------------------------
// Fix 2 – CharacterSelectScene restores selectedCharacter in create()
// ---------------------------------------------------------------------------
describe('CharacterSelectScene selectedCharacter restoration', () => {
  function makeCharSelectScene(registryCharacter) {
    const scene = Object.create(CharacterSelectScene.prototype);
    // Simulate what Phaser calls before create():
    scene.selectedCharacter = null; // as if constructor ran once
    scene._updateStartButton = vi.fn();
    scene.game = {
      registry: {
        get: vi.fn((key) => (key === 'selectedCharacter' ? registryCharacter : undefined)),
        set: vi.fn()
      }
    };
    scene.cameras = { main: { width: 1280, height: 720 } };
    scene.add = {
      rectangle: vi.fn().mockReturnThis(),
      text: vi.fn().mockReturnValue({
        setOrigin: vi.fn().mockReturnThis(),
        setInteractive: vi.fn().mockReturnThis(),
        on: vi.fn().mockReturnThis()
      }),
      sprite: vi.fn().mockReturnValue({ setScale: vi.fn().mockReturnThis() }),
      graphics: vi.fn().mockReturnValue({
        fillStyle: vi.fn(), fillRoundedRect: vi.fn(),
        lineStyle: vi.fn(), strokeRoundedRect: vi.fn(),
        clear: vi.fn()
      }),
      zone: vi.fn().mockReturnValue({ setInteractive: vi.fn().mockReturnThis(), on: vi.fn().mockReturnThis() })
    };
    scene.scene = { start: vi.fn() };
    return scene;
  }

  it('restores selectedCharacter from registry on create()', () => {
    const scene = makeCharSelectScene('princess_z');
    CharacterSelectScene.prototype.create.call(scene);
    expect(scene.selectedCharacter).toBe('princess_z');
  });

  it('calls _updateStartButton immediately when a character was previously selected', () => {
    const scene = makeCharSelectScene('selena');
    CharacterSelectScene.prototype.create.call(scene);
    expect(scene._updateStartButton).toHaveBeenCalled();
  });

  it('does NOT call _updateStartButton when no character is in the registry (fresh start)', () => {
    const scene = makeCharSelectScene(null);
    CharacterSelectScene.prototype.create.call(scene);
    expect(scene._updateStartButton).not.toHaveBeenCalled();
  });

  it('leaves selectedCharacter null when registry returns undefined', () => {
    const scene = makeCharSelectScene(undefined);
    CharacterSelectScene.prototype.create.call(scene);
    expect(scene.selectedCharacter).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Fix 3 – LevelCompleteScene "Play Again" resets playerHealth
// ---------------------------------------------------------------------------
describe('LevelCompleteScene Play Again resets playerHealth', () => {
  function makeLevelCompleteScene(completedLevel) {
    const registryValues = {
      completedLevel,
      currentLevel: completedLevel + 1,
      playerHealth: 30,
      score: 405,
      coinsEarned: 5,
      levelScore: 100
    };
    const registryMock = {
      get: vi.fn((key) => registryValues[key] ?? 0),
      set: vi.fn((key, val) => { registryValues[key] = val; })
    };

    // Capture pointerdown callbacks in registration order so tests can invoke
    // the real nextBtn handler rather than mirroring the source manually.
    const pointerdownHandlers = [];
    const makeInteractiveText = () => ({
      setOrigin: vi.fn().mockReturnThis(),
      setInteractive: vi.fn().mockReturnThis(),
      setStyle: vi.fn().mockReturnThis(),
      // Use a regular function (not arrow) so `return this` refers to the text
      // mock object itself, enabling fluent chaining in the scene code.
      on: vi.fn(function (event, cb) {
        if (event === 'pointerdown') pointerdownHandlers.push(cb);
        return this;
      })
    });

    const scene = Object.create(LevelCompleteScene.prototype);
    scene.cameras = { main: { width: 1280, height: 720 } };
    scene.game = { registry: registryMock };
    scene.scene = { start: vi.fn() };
    scene.add = {
      rectangle: vi.fn().mockReturnValue({ setStrokeStyle: vi.fn().mockReturnThis() }),
      text: vi.fn(() => makeInteractiveText())
    };
    scene.tweens = { add: vi.fn() };

    return { scene, registryMock, sceneMock: scene.scene, pointerdownHandlers };
  }

  it('Play Again button pointerdown resets playerHealth to 100 and starts CharacterSelectScene', () => {
    const { scene, registryMock, sceneMock, pointerdownHandlers } = makeLevelCompleteScene(20);
    LevelCompleteScene.prototype.create.call(scene);
    // nextBtn registers the first pointerdown handler
    expect(pointerdownHandlers[0]).toBeDefined();
    pointerdownHandlers[0]();
    expect(registryMock.set).toHaveBeenCalledWith('playerHealth', 100);
    expect(registryMock.set).toHaveBeenCalledWith('currentLevel', 1);
    expect(registryMock.set).toHaveBeenCalledWith('score', 0);
    expect(sceneMock.start).toHaveBeenCalledWith('CharacterSelectScene');
  });

  it('ensures playerHealth is 100 in registry after Play Again (not stale level-20 HP)', () => {
    const { scene, registryMock, pointerdownHandlers } = makeLevelCompleteScene(20);
    LevelCompleteScene.prototype.create.call(scene);
    pointerdownHandlers[0]();
    expect(registryMock.get('playerHealth')).toBe(100);
  });
});
