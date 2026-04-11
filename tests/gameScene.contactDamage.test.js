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
});
