# GitHub Copilot Instructions for HDTwist

## About the Project

HDTwist is a browser-based 2D platformer game built with [Phaser 3](https://phaser.io/) by Sam and Hazel.
All graphics are drawn procedurally at runtime — there are no image assets in this project.

## Tech Stack

- **Phaser 3** — game framework (physics, rendering, input, scenes)
- **Webpack 5** — module bundler; entry point `src/index.js`, output `dist/bundle.js`
- **Vitest** — unit testing framework (`npm test` runs `vitest run`)
- **Node / npm** — package management and scripts

### Key scripts

| Command | Purpose |
|---------|---------|
| `npm start` | Dev server at `http://localhost:8080` |
| `npm run build` | Production build in `/dist` |
| `npm test` | Run all unit tests |

## Repository Structure

```
src/
  config.js          — GAME_CONFIG, CHARACTER_DATA, UPGRADES, LEVEL_COLORS constants
  index.js           — Phaser game bootstrap; scene list
  levels/
    LevelData.js     — Level definitions (20 levels, platform layouts, boss flags)
  objects/
    Player.js        — Player sprite, movement, damage, special powers
    Monster.js       — Melee enemy
    WaterGhost.js    — Ranged floating enemy
    Boss.js          — Boss enemy (appears at levels 5, 10, 15, 20)
    Coin.js          — Collectible coins
    Door.js          — Shop/level-exit door
    NPC.js           — Story-hint NPCs
    Projectile.js    — Fired projectiles (player and enemy)
  scenes/
    BootScene.js         — Generates all procedural textures
    MainMenuScene.js     — Main menu
    CharacterSelectScene.js — Character picker
    GameScene.js         — Core gameplay loop
    HUDScene.js          — HUD overlay (runs in parallel with GameScene)
    ShopScene.js         — Upgrade shop overlay
    LevelCompleteScene.js
    GameOverScene.js
tests/
  player.damage.test.js
  gameScene.contactDamage.test.js
```

## Scene Flow

```
BootScene → MainMenuScene → CharacterSelectScene
  → GameScene + HUDScene (parallel)
    → ShopScene (overlay) | LevelCompleteScene | GameOverScene
```

Persistent state (health, coins, upgrades, current level, selected character) is stored in
`game.registry` so it survives scene transitions.

## Game Features

- 20 levels with increasing difficulty
- Progressive colour theme across levels (dark grey → vivid pinks, yellows, greens)
- Barrels — jump over them to earn coins
- NPCs — press **W** when nearby to read story hints
- Shop Doors — press **W** to open the upgrade shop
- Enemies: Monsters (melee), Water Ghosts (ranged), Boss (levels 5 / 10 / 15 / 20)

## Characters

| Character | Weapon | Special (key E) |
|-----------|--------|-----------------|
| Princess Z | Hairbrushes | Summons the Gerbil Kingdom for 30 s |
| Selena the Dragon Slayer | Massive Sword | Ignites sword for 10× damage for 30 s |
| Mofasuuu | Magic Staff | Fires a ring of magic in all directions |
| The King of all Dragons! | Fireballs | Heals 50 HP instantly |

## Controls

| Key | Action |
|-----|--------|
| **A** | Move left |
| **D** | Move right |
| **W** | Jump |
| **S** | Duck / block |
| **SPACE** | Fire weapon |
| **E** | Activate special power |
| **W** (near NPC/Door) | Talk to NPC / open shop |
| **ESC** | Close shop |

## Upgrades (purchased in the shop)

| Upgrade | Max bonus |
|---------|-----------|
| Jump Boost | +200 jump velocity |
| Weapon Power | 5× damage |
| Armour | 50% damage reduction |
| Player Skin | 4 cosmetic tiers |

## Coding Conventions

- All source files use **ES module** syntax (`import` / `export`).
- Game objects extend Phaser classes (e.g. `Phaser.Physics.Arcade.Sprite`).
- Scenes extend `Phaser.Scene`.
- Constants and configuration live in `src/config.js`; avoid magic numbers elsewhere.
- Level definitions live in `src/levels/LevelData.js`.

## Testing Requirements

**All new code must be unit tested as it is added in.**

- Tests live in the `tests/` directory alongside the source they cover.
- Use **Vitest** (`describe` / `it` / `expect` / `vi`).
- Because Phaser is a browser framework, stub `globalThis.Phaser` in `beforeAll` before
  dynamically importing source modules (see existing tests for the pattern).
- Run `npm test` to execute the full test suite before opening a pull request.
