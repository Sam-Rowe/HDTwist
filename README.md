# HDTwist 🎮

A browser-based platformer game made by Sam & Hazel, built with [Phaser 3](https://phaser.io/).

## How to Play

### Install & Run

```bash
npm install
npm start        # dev server at http://localhost:8080
npm run build    # production build in /dist
```

### Controls

| Key | Action |
|-----|--------|
| **A** | Move Left |
| **D** | Move Right |
| **W** | Jump |
| **S** | Duck / Block |
| **SPACE** | Fire Weapon |
| **E** | Activate Special Power |
| **W** (near NPC/Door) | Talk / Open Shop |
| **ESC** | Close Shop |

## Characters

| Character | Weapon | Special Power |
|-----------|--------|---------------|
| **Princess Z** | Hairbrushes 💇 | Summons the Gerbil Kingdom for 30 seconds! |
| **Selena the Dragon Slayer** | Massive Sword ⚔️ | Ignites sword for 10× damage for 30 seconds! |
| **Mofasuuu** | Magic Staff 🪄 | Fires a ring of blue fireballs in all directions! |
| **The King of all Dragons!** | Fireballs 🔥 | Heals 50 HP instantly! |

## Game Features

- **20 levels** with increasing difficulty
- **Progressive colour theme** — starts dark grey, ends in vivid pinks, yellows, and greens
- **Barrels** — jump *over* them to earn coins 🪙
- **NPCs** — approach and press W to hear story hints
- **Shop Doors** — press W to buy upgrades:
  - Jump Boost (up to +200 velocity)
  - Weapon Power (up to 5× damage)
  - Armour (up to 50% damage reduction)
  - Player Skin (4 cosmetic tiers)
- **Enemies** — Monsters (melee), Water Ghosts (ranged, floating), Boss (levels 5 / 10 / 15 / 20)
- **Boss battles** at levels 5, 10, 15, and 20 with two attack phases

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions, coding conventions, and how to open a pull request.

## Licence

This project is released under the [MIT License](LICENSE).
