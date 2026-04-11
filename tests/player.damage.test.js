import { describe, it, expect, vi, beforeAll } from 'vitest';

let Player;

beforeAll(async () => {
  globalThis.Phaser = {
    Physics: {
      Arcade: {
        Sprite: class {}
      }
    },
    Input: {
      Keyboard: {
        KeyCodes: {}
      }
    }
  };

  ({ default: Player } = await import('../src/objects/Player.js'));
});

describe('Player.takeDamage', () => {
  function buildPlayerStub({ health = 10, armorLevel = 0 } = {}) {
    const player = Object.create(Player.prototype);

    player.active = true;
    player.health = health;
    player.maxHealth = 100;
    player.isInvincible = false;
    player.invincibleTimer = null;
    player.upgrades = { jump: 0, weapon: 0, armor: armorLevel, skin: 0 };
    player.setAlpha = vi.fn();

    const registrySet = vi.fn();
    const delayedCall = vi.fn(() => ({ remove: vi.fn() }));
    const playerDied = vi.fn();

    player.scene = {
      time: { delayedCall },
      game: { registry: { set: registrySet } },
      playerDied
    };

    return { player, registrySet, delayedCall, playerDied };
  }

  it('applies at least 1 damage for a positive hit even at max armor', () => {
    const { player } = buildPlayerStub({ health: 10, armorLevel: 4 });

    player.takeDamage(1);

    expect(player.health).toBe(9);
  });

  it('does not apply damage when amount is zero', () => {
    const { player } = buildPlayerStub({ health: 10, armorLevel: 4 });

    player.takeDamage(0);

    expect(player.health).toBe(10);
  });
});
