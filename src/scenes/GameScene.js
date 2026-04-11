import { LEVELS } from '../levels/LevelData.js';
import { LEVEL_COLORS, GAME_CONFIG } from '../config.js';
import Player from '../objects/Player.js';
import Monster from '../objects/Monster.js';
import WaterGhost from '../objects/WaterGhost.js';
import Boss from '../objects/Boss.js';
import Coin from '../objects/Coin.js';
import Door from '../objects/Door.js';
import NPC from '../objects/NPC.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    const levelIndex = (this.game.registry.get('currentLevel') || 1) - 1;
    this.levelData = LEVELS[Math.min(levelIndex, LEVELS.length - 1)];
    this.worldWidth = this.levelData.worldWidth;
    const colors = LEVEL_COLORS[this.levelData.bgColorIndex];

    // Physics bounds
    this.physics.world.setBounds(0, 0, this.worldWidth, GAME_CONFIG.height);
    this.physics.world.gravity.y = GAME_CONFIG.gravity;

    // Background
    this.bgRect = this.add.rectangle(this.worldWidth / 2, GAME_CONFIG.height / 2,
      this.worldWidth, GAME_CONFIG.height, colors.bg);
    this.bgRect.setDepth(-10);

    // Background decorations (subtle)
    this._createBgDecorations(colors);

    // Platforms
    this.platforms = this.physics.add.staticGroup();
    this._buildPlatforms(colors);

    // Player
    const charKey = this.game.registry.get('selectedCharacter') || 'princess_z';
    const savedHealth = this.game.registry.get('playerHealth') || 100;
    this.player = new Player(this, 100, 600, charKey);
    this.player.health = savedHealth;
    this.player.maxHealth = 100;
    this.physics.add.collider(this.player, this.platforms);

    // Projectile groups
    this.playerProjectiles = this.physics.add.group();
    this.enemyProjectiles = this.physics.add.group();

    // Enemies
    this.enemies = this.physics.add.group();
    this.waterGhosts = this.physics.add.group();
    this._spawnEnemies();

    // Boss
    this.boss = null;
    if (this.levelData.hasBoss) {
      this._spawnBoss();
    }

    // Barrels
    this.barrels = this.physics.add.staticGroup();
    this.barrelJumpZones = this.physics.add.group();
    this._spawnBarrels();

    // Coins
    this.coinGroup = this.physics.add.group();
    this._spawnCoins();

    // NPCs
    this.npcs = [];
    this._spawnNPCs();

    // Door
    this.door = new Door(this, this.levelData.doorX, GAME_CONFIG.height - 52);
    this.physics.add.collider(this.door, this.platforms);

    // Camera
    this.cameras.main.setBounds(0, 0, this.worldWidth, GAME_CONFIG.height);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    // Colliders and overlaps
    this._setupColliders();

    // HUD
    this.game.registry.set('playerHealth', this.player.health);
    this.game.registry.set('playerMaxHealth', this.player.maxHealth);
    this.game.registry.set('levelName', this.levelData.name);
    this.game.registry.set('specialActive', false);
    this.game.registry.set('specialCooldown', false);
    this.game.registry.set('bossHealth', 0);
    this.game.registry.set('bossMaxHealth', 1);

    if (!this.scene.isActive('HUDScene')) {
      this.scene.launch('HUDScene');
    }

    // W key for door/npc interaction (tracked separately)
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.prevWForDoor = false;

    // Score tracking
    this.levelScore = 0;
    this.coinsAtStart = this.player.coins;
  }

  _createBgDecorations(colors) {
    // Simple background shapes for atmosphere
    for (let i = 0; i < 8; i++) {
      const x = (i + 0.5) * (this.worldWidth / 8);
      const h = Phaser.Math.Between(100, 300);
      this.add.rectangle(x, GAME_CONFIG.height - h / 2, 60, h, colors.accent, 0.2).setDepth(-5);
    }
  }

  _buildPlatforms(colors) {
    this.levelData.platforms.forEach(plat => {
      const tileW = 64;
      const totalTiles = Math.ceil(plat.width / tileW);
      for (let t = 0; t < totalTiles; t++) {
        const tile = this.platforms.create(plat.x + t * tileW + tileW / 2, plat.y, 'platform');
        tile.setTint(colors.platform);
        tile.refreshBody();
      }
    });
  }

  _spawnEnemies() {
    this.levelData.enemies.forEach(e => {
      if (e.type === 'monster') {
        const m = new Monster(this, e.x, e.y, this.levelData.difficulty);
        this.enemies.add(m);
        this.physics.add.collider(m, this.platforms);
      } else if (e.type === 'waterGhost') {
        const wg = new WaterGhost(this, e.x, e.y, this.levelData.difficulty);
        this.waterGhosts.add(wg);
      }
    });
  }

  _spawnBoss() {
    this.boss = new Boss(this, this.levelData.bossX, GAME_CONFIG.height - 80, this.levelData.difficulty);
    this.physics.add.collider(this.boss, this.platforms);
    this.game.registry.set('bossHealth', this.boss.health);
    this.game.registry.set('bossMaxHealth', this.boss.maxHealth);
    this.game.registry.set('showBoss', true);
  }

  _spawnBarrels() {
    this.levelData.barrels.forEach(b => {
      const barrel = this.physics.add.staticImage(b.x, b.y, 'barrel');
      barrel.refreshBody();
      this.barrels.add(barrel);

      // Jump zone above barrel
      const zone = this.add.zone(b.x, b.y - 50, 60, 40);
      this.physics.add.existing(zone, false);
      zone.body.setAllowGravity(false);
      zone.barrelX = b.x;
      zone.jumped = false;
      this.barrelJumpZones.add(zone);
    });
  }

  _spawnCoins() {
    this.levelData.coins.forEach(c => {
      const coin = new Coin(this, c.x, c.y);
      this.coinGroup.add(coin);
    });
  }

  _spawnNPCs() {
    this.levelData.npcs.forEach(n => {
      const npc = new NPC(this, n.x, GAME_CONFIG.height - 52, n.dialog);
      this.npcs.push(npc);
    });
  }

  spawnCoin(x, y) {
    const coin = new Coin(this, x, y);
    this.coinGroup.add(coin);
    return coin;
  }

  _setupColliders() {
    // Player projectiles hit enemies
    this.physics.add.overlap(this.playerProjectiles, this.enemies, (proj, enemy) => {
      if (proj.active && enemy.active) {
        enemy.takeDamage(proj.damage);
        proj.destroySelf();
      }
    });

    // Player projectiles hit water ghosts
    this.physics.add.overlap(this.playerProjectiles, this.waterGhosts, (proj, ghost) => {
      if (proj.active && ghost.active) {
        ghost.takeDamage(proj.damage);
        proj.destroySelf();
      }
    });

    // Player projectiles hit boss
    if (this.boss) {
      this.physics.add.overlap(this.playerProjectiles, this.boss, (proj, boss) => {
        if (proj.active && boss.active && !boss.isDead) {
          boss.takeDamage(proj.damage);
          proj.destroySelf();
        }
      });
    }

    // Enemy projectiles hit player
    this.physics.add.overlap(this.enemyProjectiles, this.player, (proj, player) => {
      if (proj.active) {
        player.takeDamage(proj.damage);
        proj.destroySelf();
      }
    });

    // Enemies touch player
    this.physics.add.overlap(this.enemies, this.player, (enemy, player) => {
      if (enemy.active && !enemy.isDead && !enemy.attackCooldown) {
        enemy.attackCooldown = true;
        player.takeDamage(enemy.damage);
        this.time.delayedCall(800, () => { if (enemy.active) enemy.attackCooldown = false; });
      }
    });

    // Water ghosts touch player
    this.physics.add.overlap(this.waterGhosts, this.player, (ghost, player) => {
      if (ghost.active && !ghost.isDead && !ghost.attackCooldown) {
        ghost.attackCooldown = true;
        player.takeDamage(ghost.damage);
        this.time.delayedCall(900, () => { if (ghost.active) ghost.attackCooldown = false; });
      }
    });

    // Boss touches player
    if (this.boss) {
      this.physics.add.overlap(this.boss, this.player, (boss, player) => {
        if (!boss.isDead && !boss.attackCooldown) {
          boss.attackCooldown = true;
          player.takeDamage(boss.damage);
          this.time.delayedCall(600, () => { boss.attackCooldown = false; });
        }
      });
    }

    // Coins collected by player
    this.physics.add.overlap(this.player, this.coinGroup, (player, coin) => {
      if (coin.active && !coin.collected) {
        coin.collect(player);
        this.levelScore += 10;
        this.game.registry.set('score', (this.game.registry.get('score') || 0) + 10);
      }
    });

    // Barrel jump zones
    this.physics.add.overlap(this.player, this.barrelJumpZones, (player, zone) => {
      if (!zone.jumped && !player.body.blocked.down && player.body.velocity.y < 0) {
        zone.jumped = true;
        player.addCoin();
        this.levelScore += 15;
        this.game.registry.set('score', (this.game.registry.get('score') || 0) + 15);
        // Show coin popup
        const txt = this.add.text(zone.x, zone.y - 20, '🪙 Barrel Jump!', {
          fontSize: '14px', fill: '#ffd700', fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(15);
        this.tweens.add({ targets: txt, y: zone.y - 60, alpha: 0, duration: 1000, onComplete: () => txt.destroy() });
      }
    });

    // Projectiles destroy on platforms
    this.physics.add.collider(this.playerProjectiles, this.platforms, (proj) => {
      if (proj.active && proj.destroySelf) proj.destroySelf();
    });
    this.physics.add.collider(this.enemyProjectiles, this.platforms, (proj) => {
      if (proj.active && proj.destroySelf) proj.destroySelf();
    });
  }

  playerDied() {
    this.game.registry.set('playerHealth', 0);
    this.game.registry.set('levelReached', this.levelData.id);
    this.scene.stop('HUDScene');
    this.scene.start('GameOverScene');
  }

  bossDefeated() {
    this.game.registry.set('showBoss', false);
    this.boss = null;
    // Show victory message
    const txt = this.add.text(this.player.x, this.player.y - 80, 'BOSS DEFEATED!', {
      fontSize: '32px', fill: '#ffff00', fontStyle: 'bold', stroke: '#ff8800', strokeThickness: 4
    }).setOrigin(0.5).setDepth(20);
    this.tweens.add({ targets: txt, y: txt.y - 60, alpha: 0, duration: 2000, onComplete: () => txt.destroy() });
  }

  _checkDoorInteraction() {
    if (!this.door || !this.player) return;
    const near = Math.abs(this.player.x - this.door.x) < 80;
    const wPressed = this.wKey.isDown && !this.prevWForDoor;
    this.prevWForDoor = this.wKey.isDown;
    if (near && wPressed) {
      this.scene.pause('GameScene');
      this.scene.launch('ShopScene');
    }
  }

  _checkLevelComplete() {
    if (!this.player) return;
    if (this.player.x > this.levelData.doorX + 80) {
      // Level complete!
      const currentLevel = this.game.registry.get('currentLevel') || 1;
      this.game.registry.set('completedLevel', currentLevel);
      this.game.registry.set('coinsEarned', this.player.coins - this.coinsAtStart);
      this.game.registry.set('levelScore', this.levelScore);
      this.game.registry.set('playerHealth', this.player.health);
      if (currentLevel < 20) {
        this.game.registry.set('currentLevel', currentLevel + 1);
      }
      this.scene.stop('HUDScene');
      this.scene.start('LevelCompleteScene');
    }
  }

  update(time, delta) {
    if (!this.player || !this.player.active) return;

    this.player.update();

    // Update enemies
    this.enemies.getChildren().forEach(e => {
      if (e.active) e.update(this.player);
    });
    this.waterGhosts.getChildren().forEach(wg => {
      if (wg.active) wg.update(this.player, time);
    });

    // Update boss
    if (this.boss && this.boss.active) {
      this.boss.update(this.player);
    }

    // Update NPCs
    this.npcs.forEach(npc => { if (npc.active) npc.update(this.player); });

    // Update door
    if (this.door) this.door.update(this.player);

    // Projectile cleanup
    this.playerProjectiles.getChildren().forEach(p => { if (p.active && p.update) p.update(); });
    this.enemyProjectiles.getChildren().forEach(p => { if (p.active && p.update) p.update(); });

    // Door interaction
    this._checkDoorInteraction();

    // Level complete check
    this._checkLevelComplete();

    // Update HUD
    this.game.registry.set('playerHealth', this.player.health);
    this.game.registry.set('coins', this.player.coins);
    if (this.boss && this.boss.active) {
      this.game.registry.set('bossHealth', this.boss.health);
    }
  }
}
