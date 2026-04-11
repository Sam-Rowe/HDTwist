import { CHARACTER_DATA, GAME_CONFIG, UPGRADES } from '../config.js';
import Projectile from './Projectile.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, characterType) {
    const charData = CHARACTER_DATA[characterType];
    super(scene, x, y, 'player_' + characterType);
    this.scene = scene;
    this.characterType = characterType;
    this.charData = charData;

    // Stats
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.coins = scene.game.registry.get('coins') || 0;
    this.score = 0;

    // Upgrades from registry
    const savedUpgrades = scene.game.registry.get('upgrades') || { jump: 0, weapon: 0, armor: 0, skin: 0 };
    this.upgrades = savedUpgrades;

    // State
    this.isDucking = false;
    this.isInvincible = false;
    this.invincibleTimer = null;
    this.facingRight = true;
    this.isOnGround = false;

    // Special power
    this.specialActive = false;
    this.specialCooldown = false;
    this.specialTimer = null;
    this.specialCooldownTimer = null;
    this.specialDamageMultiplier = 1;

    // Gerbils (PrincessZ special)
    this.gerbils = [];

    // Fire cooldown
    this.canFire = true;
    this.fireRate = 400;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setSize(28, 44);
    this.body.setMaxVelocityX(400);

    // Input
    this.cursors = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      fire: Phaser.Input.Keyboard.KeyCodes.SPACE,
      special: Phaser.Input.Keyboard.KeyCodes.E
    });

    this.fireKey = this.cursors.fire;
    this.specialKey = this.cursors.special;
    this.prevFireKey = false;
    this.prevSpecialKey = false;
    this.prevUpKey = false;
  }

  getJumpVelocity() {
    const base = GAME_CONFIG.baseJumpVelocity;
    const bonus = UPGRADES.jump.levels[this.upgrades.jump].bonus;
    return base - bonus;
  }

  getWeaponDamage() {
    const base = this.charData.projectileDamage;
    const mult = UPGRADES.weapon.levels[this.upgrades.weapon].bonus;
    return base * mult * this.specialDamageMultiplier;
  }

  getArmorReduction() {
    return UPGRADES.armor.levels[this.upgrades.armor].bonus;
  }

  takeDamage(amount) {
    if (this.isInvincible || !this.active) return;
    const reduction = this.getArmorReduction();
    const reducedDamage = Math.floor(amount * (1 - reduction));
    const actualDamage = amount > 0 ? Math.max(1, reducedDamage) : 0;
    this.health = Math.max(0, this.health - actualDamage);
    this.isInvincible = true;
    this.setAlpha(0.5);
    if (this.invincibleTimer) this.invincibleTimer.remove();
    this.invincibleTimer = this.scene.time.delayedCall(1000, () => {
      this.isInvincible = false;
      if (this.active) this.setAlpha(1);
    });
    this.scene.game.registry.set('playerHealth', this.health);
    if (this.health <= 0) {
      this.scene.playerDied();
    }
  }

  heal(amount) {
    this.health = Math.min(this.maxHealth, this.health + amount);
    this.scene.game.registry.set('playerHealth', this.health);
  }

  addCoin() {
    this.coins++;
    this.scene.game.registry.set('coins', this.coins);
  }

  rechargeSpecial() {
    if (!this.specialCooldown) return false;

    this.specialCooldown = false;
    if (this.specialCooldownTimer) {
      this.specialCooldownTimer.remove();
      this.specialCooldownTimer = null;
    }

    this.scene.game.registry.set('specialCooldown', false);
    this.scene.game.registry.set('specialCooldownLeft', 0);
    return true;
  }

  fire() {
    if (!this.canFire) return;
    this.canFire = false;
    this.scene.time.delayedCall(this.fireRate, () => { this.canFire = true; });

    const dir = this.facingRight ? 1 : -1;
    const projKey = this.charData.projectileKey;
    const damage = this.getWeaponDamage();
    const speed = this.charData.projectileSpeed;

    const proj = new Projectile(this.scene, this.x + dir * 20, this.y, projKey, {
      damage, speed, direction: dir, velocityX: dir * speed, fromPlayer: true,
      lifespan: this.charData.projectileLifespan
    });
    if (this.scene.playerProjectiles) {
      this.scene.playerProjectiles.add(proj);
    }
  }

  activateSpecial() {
    if (this.specialCooldown || this.specialActive) return;
    const type = this.characterType;
    if (type === 'princess_z') { this.specialPrincessZ(); }
    else if (type === 'selena') { this.specialSelena(); }
    else if (type === 'mofasuuu') { this.specialMofasuuu(); }
    else if (type === 'king_dragon') { this.specialKingDragon(); }

    if (type !== 'king_dragon') {
      this.specialActive = true;
      this.scene.game.registry.set('specialActive', true);
      this.scene.game.registry.set('specialTimeLeft', 30);
      if (this.specialTimer) this.specialTimer.remove();
      this.specialTimer = this.scene.time.delayedCall(30000, () => {
        this.specialActive = false;
        this.specialDamageMultiplier = 1;
        this.scene.game.registry.set('specialActive', false);
        this.startSpecialCooldown();
      });
    } else {
      this.startSpecialCooldown();
    }
  }

  startSpecialCooldown() {
    this.specialCooldown = true;
    this.scene.game.registry.set('specialCooldown', true);
    this.scene.game.registry.set('specialCooldownLeft', 60);
    if (this.specialCooldownTimer) this.specialCooldownTimer.remove();
    this.specialCooldownTimer = this.scene.time.delayedCall(60000, () => {
      this.specialCooldown = false;
      this.specialCooldownTimer = null;
      this.scene.game.registry.set('specialCooldown', false);
      this.scene.game.registry.set('specialCooldownLeft', 0);
    });
  }

  specialPrincessZ() {
    // Spawn 8 gerbils that attack enemies
    const enemies = this.scene.enemies ? [...this.scene.enemies.getChildren()] : [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const gx = this.x + Math.cos(angle) * 60;
      const gy = this.y + Math.sin(angle) * 30;
      const gerbil = this.scene.physics.add.sprite(gx, gy, 'gerbil');
      gerbil.body.setAllowGravity(false);
      gerbil.setScale(1.5);
      gerbil.setTint(0xffaaff);
      this.gerbils.push(gerbil);
      // Simple tween to move around
      this.scene.tweens.add({
        targets: gerbil, x: this.x + Math.cos(angle + Math.PI) * 200,
        y: this.y, duration: 2000, ease: 'Linear',
        onComplete: () => { if (gerbil.active) gerbil.destroy(); }
      });
      // Attack nearest enemy
      if (enemies.length > 0) {
        const target = enemies[i % enemies.length];
        if (target && target.active) {
          target.takeDamage(20);
        }
      }
    }
    this.scene.time.delayedCall(30000, () => {
      this.gerbils.forEach(g => { if (g.active) g.destroy(); });
      this.gerbils = [];
    });
  }

  specialSelena() {
    this.specialDamageMultiplier = 10;
    this.setTint(0xff6600);
    this.scene.time.delayedCall(30000, () => {
      this.specialDamageMultiplier = 1;
      if (this.active) this.clearTint();
    });
  }

  specialMofasuuu() {
    // Fire in 8 directions
    const directions = [
      { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 },
      { x: 0.707, y: -0.707 }, { x: -0.707, y: -0.707 },
      { x: 0.707, y: 0.707 }, { x: -0.707, y: 0.707 }
    ];
    const speed = this.charData.projectileSpeed;
    const damage = this.getWeaponDamage();
    directions.forEach(dir => {
      const proj = new Projectile(this.scene, this.x, this.y, 'proj_mofasuuu', {
        damage, speed, direction: dir.x >= 0 ? 1 : -1,
        velocityX: dir.x * speed, velocityY: dir.y * speed, fromPlayer: true,
        lifespan: this.charData.projectileLifespan
      });
      if (this.scene.playerProjectiles) this.scene.playerProjectiles.add(proj);
    });
  }

  specialKingDragon() {
    this.heal(50);
    // Visual effect
    const text = this.scene.add.text(this.x, this.y - 40, '+50 HP!', {
      fontSize: '20px', fill: '#00ff00', fontStyle: 'bold'
    }).setOrigin(0.5);
    this.scene.tweens.add({
      targets: text, y: this.y - 80, alpha: 0, duration: 1500,
      onComplete: () => text.destroy()
    });
  }

  duck(isDucking) {
    if (this.isDucking === isDucking) return;
    this.isDucking = isDucking;
    if (isDucking) {
      this.body.setSize(28, 24);
      this.body.setOffset(0, 20);
    } else {
      this.body.setSize(28, 44);
      this.body.setOffset(0, 0);
    }
  }

  update() {
    if (!this.active) return;
    const keys = this.cursors;
    const onGround = this.body.blocked.down;
    this.isOnGround = onGround;
    const speed = GAME_CONFIG.playerSpeed;

    // Horizontal movement
    if (keys.left.isDown) {
      this.setVelocityX(-speed);
      this.facingRight = false;
      this.setFlipX(true);
    } else if (keys.right.isDown) {
      this.setVelocityX(speed);
      this.facingRight = true;
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    // Ducking
    if (keys.down.isDown && onGround) {
      this.duck(true);
    } else {
      this.duck(false);
    }

    // Jump
    if (keys.up.isDown && !this.prevUpKey && onGround && !this.isDucking) {
      this.setVelocityY(this.getJumpVelocity());
    }
    this.prevUpKey = keys.up.isDown;

    // Fire
    if (keys.fire.isDown && !this.prevFireKey) {
      this.fire();
    }
    this.prevFireKey = keys.fire.isDown;

    // Special
    if (keys.special.isDown && !this.prevSpecialKey) {
      this.activateSpecial();
    }
    this.prevSpecialKey = keys.special.isDown;
  }
}
