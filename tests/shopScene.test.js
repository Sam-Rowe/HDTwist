import { describe, it, expect, vi, beforeAll } from 'vitest';

let ShopScene;

beforeAll(async () => {
  globalThis.Phaser = {
    Scene: class {},
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
      Distance: {
        Between: () => 0
      }
    }
  };

  ({ default: ShopScene } = await import('../src/scenes/ShopScene.js'));
});

function buildShopScene({ coins = 10, upgrades = { jump: 0, weapon: 0, armor: 0, skin: 0 } } = {}) {
  const scene = Object.create(ShopScene.prototype);

  scene.coins = coins;
  scene.upgrades = { ...upgrades };

  const registrySet = vi.fn();
  const registryGet = vi.fn((key) => {
    if (key === 'coins') return coins;
    if (key === 'upgrades') return { ...upgrades };
    return null;
  });

  scene.game = {
    registry: { set: registrySet, get: registryGet }
  };

  const addTextObj = {
    setOrigin: vi.fn().mockReturnThis(),
    setInteractive: vi.fn().mockReturnThis(),
    on: vi.fn().mockReturnThis(),
    setStyle: vi.fn().mockReturnThis()
  };

  scene.add = {
    text: vi.fn(() => ({ ...addTextObj })),
    rectangle: vi.fn(() => ({ setStrokeStyle: vi.fn() }))
  };

  scene.scene = {
    stop: vi.fn(),
    resume: vi.fn(),
    restart: vi.fn(),
    get: vi.fn(() => null)
  };

  return { scene, registrySet, registryGet };
}

describe('ShopScene._buyUpgrade', () => {
  it('deducts the correct cost and increments the upgrade level', () => {
    const { scene, registrySet } = buildShopScene({ coins: 10, upgrades: { jump: 0, weapon: 0, armor: 0, skin: 0 } });

    scene._buyUpgrade('jump', 10);

    expect(scene.coins).toBe(0);
    expect(scene.upgrades.jump).toBe(1);
    expect(registrySet).toHaveBeenCalledWith('coins', 0);
    expect(registrySet).toHaveBeenCalledWith('upgrades', expect.objectContaining({ jump: 1 }));
  });

  it('does not allow purchase when coins are insufficient', () => {
    const { scene, registrySet } = buildShopScene({ coins: 5 });

    scene._buyUpgrade('jump', 10);

    expect(scene.coins).toBe(5);
    expect(scene.upgrades.jump).toBe(0);
    expect(registrySet).not.toHaveBeenCalled();
  });

  it('does not exceed the maximum upgrade level', () => {
    const { scene } = buildShopScene({ coins: 999, upgrades: { jump: 4, weapon: 0, armor: 0, skin: 0 } });

    scene._buyUpgrade('jump', 100);

    expect(scene.upgrades.jump).toBe(4);
  });

  it('restarts the scene after a successful purchase', () => {
    const { scene } = buildShopScene({ coins: 10 });

    scene._buyUpgrade('jump', 10);

    expect(scene.scene.restart).toHaveBeenCalledTimes(1);
  });

  it('also updates the player in the game scene when present', () => {
    const { scene } = buildShopScene({ coins: 15, upgrades: { jump: 0, weapon: 0, armor: 0, skin: 0 } });
    const mockPlayer = { coins: 15, upgrades: {} };
    scene.scene.get = vi.fn((key) => key === 'GameScene' ? { player: mockPlayer } : null);

    scene._buyUpgrade('weapon', 15);

    expect(mockPlayer.coins).toBe(0);
    expect(mockPlayer.upgrades).toEqual(expect.objectContaining({ weapon: 1 }));
  });
});

describe('ShopScene._closeShop', () => {
  it('stops ShopScene and resumes GameScene', () => {
    const { scene } = buildShopScene();

    scene._closeShop();

    expect(scene.scene.stop).toHaveBeenCalledWith('ShopScene');
    expect(scene.scene.resume).toHaveBeenCalledWith('GameScene');
  });
});

describe('ShopScene._createUpgradeRow', () => {
  it('calls setInteractive only when player can afford the upgrade', async () => {
    const { scene } = buildShopScene({ coins: 10 });

    // Mock add.text to track setInteractive calls
    const interactiveCalls = [];
    scene.add.text = vi.fn(() => {
      const obj = {
        setOrigin: vi.fn().mockReturnThis(),
        setInteractive: vi.fn(function() { interactiveCalls.push(this); return this; }),
        on: vi.fn().mockReturnThis()
      };
      return obj;
    });
    scene.add.rectangle = vi.fn(() => ({ setStrokeStyle: vi.fn() }));

    // jump upgrade: cost 10 (affordable at 10 coins)
    const { UPGRADES } = await import('../src/config.js');
    expect(UPGRADES).toBeDefined();

    scene._createUpgradeRow(640, 230, 'jump', UPGRADES.jump);

    // The affordable button should have setInteractive called
    expect(interactiveCalls.length).toBeGreaterThanOrEqual(1);
  });

  it('does not call setInteractive when player cannot afford the upgrade', async () => {
    const { scene } = buildShopScene({ coins: 0 }); // 0 coins, cannot afford anything

    const setInteractiveMock = vi.fn().mockReturnThis();
    scene.add.text = vi.fn(() => ({
      setOrigin: vi.fn().mockReturnThis(),
      setInteractive: setInteractiveMock,
      on: vi.fn().mockReturnThis()
    }));
    scene.add.rectangle = vi.fn(() => ({ setStrokeStyle: vi.fn() }));

    const { UPGRADES } = await import('../src/config.js');
    expect(UPGRADES).toBeDefined();

    scene._createUpgradeRow(640, 230, 'jump', UPGRADES.jump);

    // setInteractive should NOT be called for the upgrade button since player can't afford it
    expect(setInteractiveMock).not.toHaveBeenCalled();
  });
});
