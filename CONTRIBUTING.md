# Contributing to HDTwist 🎮

Thanks for your interest in contributing to HDTwist! This guide explains how to get set up, how we work, and what to keep in mind before opening a pull request.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Development Workflow](#development-workflow)
4. [Running Tests](#running-tests)
5. [Code Style](#code-style)
6. [Opening a Pull Request](#opening-a-pull-request)
7. [Reporting Bugs & Requesting Features](#reporting-bugs--requesting-features)

---

## Getting Started

### Prerequisites

- **Node.js** 20, 22, or 24+ and **npm** ≥ 9

### Install dependencies

**To run locally only** (no intent to submit changes):

```bash
git clone https://github.com/Sam-Rowe/HDTwist.git
cd HDTwist
npm install
```

**To contribute** (fork first, then clone your fork):

1. Click **Fork** on GitHub to create your own copy.
2. Clone your fork:

```bash
git clone https://github.com/<your-username>/HDTwist.git
cd HDTwist
npm install
```

### Start the dev server

```bash
npm start   # opens http://localhost:8080 automatically
```

### Production build

```bash
npm run build   # output in /dist
```

---

## Project Structure

```
src/
  config.js          — GAME_CONFIG, CHARACTER_DATA, UPGRADES, LEVEL_COLORS constants
  index.js           — Phaser game bootstrap; scene list
  levels/
    LevelData.js     — Level definitions (20 levels, platform layouts, boss flags)
  objects/           — Game objects (Player, Monster, Boss, Coin, Door, …)
  scenes/            — Phaser scenes (Boot, MainMenu, GameScene, HUD, Shop, …)
tests/               — Vitest unit tests
```

Constants and configuration belong in `src/config.js`; avoid magic numbers elsewhere.  
Level definitions belong in `src/levels/LevelData.js`.

---

## Development Workflow

1. **Fork** the repository and create a feature branch from `main`:

   ```bash
   git checkout -b feature/my-cool-feature
   ```

2. Make your changes in small, focused commits with clear messages:

   ```
   feat: add double-jump upgrade to the shop
   fix: prevent ghost projectiles spawning off-screen
   ```

3. **Write or update tests** for any new behaviour (see [Running Tests](#running-tests)).

4. Push your branch and open a pull request against `main`.

---

## Running Tests

Tests use **Vitest** and live in the `tests/` directory.

```bash
npm test        # runs vitest run (all tests, single pass)
```

### Writing tests

- Because Phaser is a browser framework, stub `globalThis.Phaser` in a `beforeAll` block before dynamically importing any source module that depends on Phaser. See the existing tests for the pattern:

  ```js
  import { beforeAll, describe, expect, it } from 'vitest';

  beforeAll(() => {
    globalThis.Phaser = { /* minimal stub */ };
  });

  const { MyClass } = await import('../src/objects/MyClass.js');
  ```

- All new code must be accompanied by unit tests.

---

## Code Style

- Use **ES module** syntax (`import` / `export`) throughout.
- Game objects extend the appropriate Phaser class (e.g. `Phaser.Physics.Arcade.Sprite`).
- Scenes extend `Phaser.Scene`.
- Keep constants in `src/config.js` rather than scattering magic numbers across files.
- Match the formatting style of the file you are editing (2-space indentation, single quotes).

---

## Opening a Pull Request

1. Ensure `npm test` passes locally.
2. Provide a clear description of **what** you changed and **why**.
3. Reference any related issue (e.g. `Closes #42`).
4. Keep PRs focused — one feature or fix per PR makes review much easier.

A maintainer will review your PR and may request changes or leave comments. Once approved, it will be merged into `main`.

---

## Reporting Bugs & Requesting Features

Please [open an issue](https://github.com/Sam-Rowe/HDTwist/issues) and include:

- **Bug reports**: steps to reproduce, expected vs actual behaviour, browser/OS version.
- **Feature requests**: a description of the feature and why it would be valuable.

---

This project is licensed under the [MIT License](LICENSE). By contributing, you agree that your contributions will be licensed under the same licence.
