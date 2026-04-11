import Projectile from './Projectile.js';

export default class Boss extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, level) {
    super(scene, x, y, 'boss');
    this.scene = scene;
    this.level = level || 1;
    this.maxHealth = 200 + level * 50;
    this.health = this.maxHealth;
    this.damage = 20 + level * 5;
    this.phase = 1;
    this.isDead = false;
    this.isCharging = false;
    this.chargeTimer = null;
    this.shootTimer = null;
    this.canShoot = true;
    this.chargeSpeed = 250 + level * 10;
    this.normalSpeed = 80;
    this.startX = x;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setSize(56, 60);
    this.setScale(1.2);
    this.setTint(0x880000);

    this.scheduleCharge();
    this.scheduleShoot();
  }

  takeDamage(amount) {
    if (this.isDead) return;
    this.health -= amount;
    const pct = this.health / this.maxHealth;

    // Check phase transition
    if (pct <= 0.5 && this.phase === 1) {
      this.phase = 2;
      this.setTint(0xff0000);
      this.chargeSpeed *= 1.5;
    }

    this.setAlpha(0.5);
    this.scene.time.delayedCall(100, () => { if (this.active) this.setAlpha(1); });
    this.scene.game.registry.set('bossHealth', this.health);
    this.scene.game.registry.set('bossMaxHealth', this.maxHealth);

    if (this.health <= 0) { this.die(); }
  }

  die() {
    if (this.isDead) return;
    this.isDead = true;
    if (this.chargeTimer) this.chargeTimer.remove();
    if (this.shootTimer) this.shootTimer.remove();
    // Big coin reward
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      const cx = this.x + Math.cos(angle) * 50;
      const cy = this.y + Math.sin(angle) * 30;
      this.scene.spawnCoin(cx, cy);
    }
    this.scene.tweens.add({
      targets: this, alpha: 0, scaleX: 2, scaleY: 2, duration: 600,
      onComplete: () => {
        this.scene.bossDefeated();
        this.destroy();
      }
    });
  }

  scheduleCharge() {
    const interval = this.phase === 2 ? 2000 : 3500;
    if (this.chargeTimer) this.chargeTimer.remove();
    this.chargeTimer = this.scene.time.delayedCall(interval, () => {
      if (!this.isDead && this.active) {
        this.startCharge();
        this.scheduleCharge();
      }
    });
  }

  startCharge() {
    const player = this.scene.player;
    if (!player || !player.active) return;
    const dir = player.x > this.x ? 1 : -1;
    this.isCharging = true;
    this.setTint(this.phase === 2 ? 0xff8800 : 0xcc0000);
    this.setVelocityX(dir * this.chargeSpeed);
    this.scene.time.delayedCall(600, () => {
      if (this.active) {
        this.isCharging = false;
        this.setVelocityX(0);
        this.setTint(this.phase === 2 ? 0xff0000 : 0x880000);
      }
    });
  }

  scheduleShoot() {
    const interval = this.phase === 2 ? 1500 : 4000;
    if (this.shootTimer) this.shootTimer.remove();
    this.shootTimer = this.scene.time.delayedCall(interval, () => {
      if (!this.isDead && this.active) {
        if (this.phase === 2) this.shootAtPlayer();
        this.scheduleShoot();
      }
    });
  }

  shootAtPlayer() {
    const player = this.scene.player;
    if (!player || !player.active) return;
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len === 0) return;
    const speed = 250;
    const proj = new Projectile(this.scene, this.x, this.y, 'proj_king', {
      damage: this.damage, speed,
      velocityX: (dx / len) * speed, velocityY: (dy / len) * speed,
      fromPlayer: false
    });
    if (this.scene.enemyProjectiles) this.scene.enemyProjectiles.add(proj);
  }

  update(player) {
    if (this.isDead || !this.active) return;
    if (!this.isCharging && player && player.active) {
      const dir = player.x > this.x ? 1 : -1;
      this.setVelocityX(dir * this.normalSpeed);
      this.setFlipX(dir < 0);
    }
  }
}
