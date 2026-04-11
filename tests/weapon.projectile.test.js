import { describe, it, expect, vi, beforeAll } from 'vitest';

let Player;
let Projectile;
let CHARACTER_DATA;

beforeAll(async () => {
  globalThis.Phaser = {
    Physics: {
      Arcade: {
        Sprite: class {
          setVelocity() {}
          destroy() {}
        }
      }
    },
    Input: {
      Keyboard: {
        KeyCodes: {}
      }
    }
  };

  ([{ default: Player }, { default: Projectile }, { CHARACTER_DATA }] = await Promise.all([
    import('../src/objects/Player.js'),
    import('../src/objects/Projectile.js'),
    import('../src/config.js')
  ]));
});

// ─── Config sanity checks ────────────────────────────────────────────────────

describe('CHARACTER_DATA weapon config', () => {
  it("princess_z projectileDamage is at least as high as king_dragon's", () => {
    expect(CHARACTER_DATA.princess_z.projectileDamage).toBeGreaterThanOrEqual(
      CHARACTER_DATA.king_dragon.projectileDamage
    );
  });

  it('princess_z projectile travels at least 10 squares (640 px) before expiring', () => {
    const SQUARE_PX = 64;
    const { projectileSpeed, projectileLifespan } = CHARACTER_DATA.princess_z;
    const rangeInSquares = (projectileSpeed * projectileLifespan) / 1000 / SQUARE_PX;
    expect(rangeInSquares).toBeGreaterThanOrEqual(10);
  });

  it.each(['princess_z', 'selena', 'mofasuuu', 'king_dragon'])(
    '%s has a projectileLifespan defined',
    (charKey) => {
      expect(CHARACTER_DATA[charKey].projectileLifespan).toBeGreaterThan(0);
    }
  );
});

// ─── Projectile lifespan ─────────────────────────────────────────────────────

describe('Projectile lifespan', () => {
  function buildScene() {
    const delayedCall = vi.fn((ms, cb) => ({ remove: vi.fn(), delay: ms, callback: cb }));
    const scene = {
      add: { existing: vi.fn() },
      physics: {
        add: {
          existing: vi.fn((sprite) => {
            sprite.body = { setAllowGravity: vi.fn() };
          })
        }
      },
      time: { delayedCall }
    };
    return { scene, delayedCall };
  }

  it('uses the provided lifespan for the destroy timer', () => {
    const { scene, delayedCall } = buildScene();
    new Projectile(scene, 0, 0, 'key', { lifespan: 5000 });
    expect(delayedCall).toHaveBeenCalledWith(5000, expect.any(Function));
  });

  it('defaults to 3000 ms lifespan when none is provided', () => {
    const { scene, delayedCall } = buildScene();
    new Projectile(scene, 0, 0, 'key', {});
    expect(delayedCall).toHaveBeenCalledWith(3000, expect.any(Function));
  });
});

// ─── Player.getWeaponDamage ───────────────────────────────────────────────────

describe('Player.getWeaponDamage for princess_z', () => {
  function buildPrincessStub({ weaponLevel = 0 } = {}) {
    const player = Object.create(Player.prototype);
    player.characterType = 'princess_z';
    player.charData = CHARACTER_DATA.princess_z;
    player.upgrades = { jump: 0, weapon: weaponLevel, armor: 0, skin: 0 };
    player.specialDamageMultiplier = 1;
    return player;
  }

  it('base damage equals the configured projectileDamage', () => {
    const player = buildPrincessStub();
    expect(player.getWeaponDamage()).toBe(CHARACTER_DATA.princess_z.projectileDamage);
  });

  it('base damage equals king_dragon base damage', () => {
    const princess = buildPrincessStub();

    const dragon = Object.create(Player.prototype);
    dragon.charData = CHARACTER_DATA.king_dragon;
    dragon.upgrades = { jump: 0, weapon: 0, armor: 0, skin: 0 };
    dragon.specialDamageMultiplier = 1;

    expect(princess.getWeaponDamage()).toBe(dragon.getWeaponDamage());
  });
});
