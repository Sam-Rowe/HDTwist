import { describe, it, expect, vi, beforeAll } from 'vitest';

let GameScene;

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

  ({ default: GameScene } = await import('../src/scenes/GameScene.js'));
});

describe('GameScene contact damage helpers', () => {
  it('applies monster contact damage and sets cooldown', () => {
    const scene = Object.create(GameScene.prototype);
    scene.time = { delayedCall: vi.fn() };

    const player = { takeDamage: vi.fn() };
    const enemy = { active: true, isDead: false, attackCooldown: false, damage: 9 };

    scene._applyEnemyContactDamage(enemy, player);

    expect(player.takeDamage).toHaveBeenCalledWith(9);
    expect(enemy.attackCooldown).toBe(true);
    expect(scene.time.delayedCall).toHaveBeenCalledTimes(1);
  });

  it('applies water ghost contact damage and sets cooldown', () => {
    const scene = Object.create(GameScene.prototype);
    scene.time = { delayedCall: vi.fn() };

    const player = { takeDamage: vi.fn() };
    const ghost = { active: true, isDead: false, attackCooldown: false, damage: 7 };

    scene._applyGhostContactDamage(ghost, player);

    expect(player.takeDamage).toHaveBeenCalledWith(7);
    expect(ghost.attackCooldown).toBe(true);
    expect(scene.time.delayedCall).toHaveBeenCalledTimes(1);
  });

  it('detects when the player lands on top of a barrel', () => {
    const scene = Object.create(GameScene.prototype);

    const player = {
      body: {
        y: 120,
        prev: { y: 112 },
        height: 44,
        bottom: 164,
        touching: { down: true },
        velocity: { y: 220 }
      }
    };

    const barrel = {
      body: { top: 164 }
    };

    expect(scene._didPlayerLandOnBarrel(player, barrel)).toBe(true);
  });

  it('does not treat side contact as a barrel landing', () => {
    const scene = Object.create(GameScene.prototype);

    const player = {
      body: {
        y: 120,
        prev: { y: 120 },
        height: 44,
        bottom: 164,
        touching: { down: false },
        velocity: { y: 0 }
      }
    };

    const barrel = {
      body: { top: 164 }
    };

    expect(scene._didPlayerLandOnBarrel(player, barrel)).toBe(false);
  });

  it('rewards a barrel landing with a coin, score, and recharge attempt', () => {
    const scene = Object.create(GameScene.prototype);
    const registrySet = vi.fn();

    scene.levelScore = 0;
    scene.game = {
      registry: {
        get: vi.fn((key) => (key === 'score' ? 40 : 0)),
        set: registrySet
      }
    };
    scene._didPlayerLandOnBarrel = vi.fn(() => true);
    scene._tryRechargePlayerSpecial = vi.fn(() => true);
    scene._showBarrelRewardText = vi.fn();

    const player = { addCoin: vi.fn() };
    const barrel = { rewardClaimed: false, x: 320, y: 600 };

    scene._handlePlayerBarrelCollision(player, barrel);

    expect(barrel.rewardClaimed).toBe(true);
    expect(player.addCoin).toHaveBeenCalledTimes(1);
    expect(scene._tryRechargePlayerSpecial).toHaveBeenCalledWith(player);
    expect(scene.levelScore).toBe(15);
    expect(registrySet).toHaveBeenCalledWith('score', 55);
    expect(scene._showBarrelRewardText).toHaveBeenCalledWith(320, 600, true);
  });

  it('recharges the special on a successful barrel recharge roll', () => {
    const scene = Object.create(GameScene.prototype);
    const player = {
      specialCooldown: true,
      rechargeSpecial: vi.fn(() => true)
    };

    scene._rollBarrelRechargeChance = vi.fn(() => true);

    expect(scene._tryRechargePlayerSpecial(player)).toBe(true);
    expect(scene._rollBarrelRechargeChance).toHaveBeenCalledTimes(1);
    expect(player.rechargeSpecial).toHaveBeenCalledTimes(1);
  });

  it('does not recharge the special when the barrel recharge roll fails', () => {
    const scene = Object.create(GameScene.prototype);
    const player = {
      specialCooldown: true,
      rechargeSpecial: vi.fn(() => true)
    };

    scene._rollBarrelRechargeChance = vi.fn(() => false);

    expect(scene._tryRechargePlayerSpecial(player)).toBe(false);
    expect(scene._rollBarrelRechargeChance).toHaveBeenCalledTimes(1);
    expect(player.rechargeSpecial).not.toHaveBeenCalled();
  });

  it('does not attempt a barrel recharge when the special is already ready', () => {
    const scene = Object.create(GameScene.prototype);
    const player = {
      specialCooldown: false,
      rechargeSpecial: vi.fn(() => true)
    };

    scene._rollBarrelRechargeChance = vi.fn(() => true);

    expect(scene._tryRechargePlayerSpecial(player)).toBe(false);
    expect(scene._rollBarrelRechargeChance).not.toHaveBeenCalled();
    expect(player.rechargeSpecial).not.toHaveBeenCalled();
  });

  it('does not reward the same barrel more than once', () => {
    const scene = Object.create(GameScene.prototype);

    scene.game = {
      registry: {
        get: vi.fn(() => 0),
        set: vi.fn()
      }
    };
    scene._didPlayerLandOnBarrel = vi.fn(() => true);
    scene._tryRechargePlayerSpecial = vi.fn();
    scene._showBarrelRewardText = vi.fn();

    const player = { addCoin: vi.fn() };
    const barrel = { rewardClaimed: true, x: 320, y: 600 };

    scene._handlePlayerBarrelCollision(player, barrel);

    expect(player.addCoin).not.toHaveBeenCalled();
    expect(scene._tryRechargePlayerSpecial).not.toHaveBeenCalled();
    expect(scene.game.registry.set).not.toHaveBeenCalled();
  });
});

describe('GameScene.playerDied', () => {
  function buildSceneForDeath() {
    const scene = Object.create(GameScene.prototype);
    scene._playerDying = false;
    scene.levelData = { id: 1 };

    const registrySet = vi.fn();
    scene.game = { registry: { set: registrySet } };
    scene.scene = {
      stop: vi.fn(),
      start: vi.fn()
    };
    scene.player = {
      body: { enable: true },
      setActive: vi.fn()
    };

    return { scene, registrySet };
  }

  it('transitions to GameOverScene and disables the player on first call', () => {
    const { scene, registrySet } = buildSceneForDeath();

    scene.playerDied();

    expect(registrySet).toHaveBeenCalledWith('playerHealth', 0);
    expect(registrySet).toHaveBeenCalledWith('levelReached', 1);
    expect(scene.scene.stop).toHaveBeenCalledWith('HUDScene');
    expect(scene.scene.start).toHaveBeenCalledWith('GameOverScene');
    expect(scene.player.body.enable).toBe(false);
    expect(scene.player.setActive).toHaveBeenCalledWith(false);
    expect(scene._playerDying).toBe(true);
  });

  it('does not trigger a second scene transition if called again while dying', () => {
    const { scene } = buildSceneForDeath();

    scene.playerDied();
    scene.playerDied();

    expect(scene.scene.stop).toHaveBeenCalledTimes(1);
    expect(scene.scene.start).toHaveBeenCalledTimes(1);
  });
});
