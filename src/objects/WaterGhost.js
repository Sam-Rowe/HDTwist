import Projectile from './Projectile.js';

export default class WaterGhost extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, level) {
    super(scene, x, y, 'water_ghost');
    this.scene = scene;
    this.level = level || 1;
    this.maxHealth = 20 + level * 8;
    this.health = this.maxHealth;
    this.damage = 6 + level * 2;
    this.shootRange = 400;
    this.isDead = false;
    this.canShoot = true;
    this.shootInterval = Math.max(1500, 3000 - level * 80);
    this.floatOffset = Math.random() * Math.PI * 2;
    this.startY = y;
    this.startX = x;
    this.floatAmplitude = 20;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.body.setSize(24, 36);
    this.setAlpha(0.85);
  }

  takeDamage(amount) {
    if (this.isDead) return;
    this.health -= amount;
    this.setTint(0xaaaaff);
    this.scene.time.delayedCall(150, () => { if (this.active) this.clearTint(); });
    if (this.health <= 0) { this.die(); }
  }

  die() {
    if (this.isDead) return;
    this.isDead = true;
    if (Math.random() < 0.5) {
      this.scene.spawnCoin(this.x, this.y);
    }
    this.scene.tweens.add({
      targets: this, alpha: 0, y: this.y - 30, duration: 400,
      onComplete: () => { this.destroy(); }
    });
  }

  shootAt(player) {
    if (!this.canShoot || this.isDead || !player.active) return;
    this.canShoot = false;
    this.scene.time.delayedCall(this.shootInterval, () => { this.canShoot = true; });
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len === 0) return;
    const speed = 200;
    const proj = new Projectile(this.scene, this.x, this.y, 'proj_ghost', {
      damage: this.damage, speed,
      velocityX: (dx / len) * speed, velocityY: (dy / len) * speed,
      fromPlayer: false
    });
    if (this.scene.enemyProjectiles) {
      this.scene.enemyProjectiles.add(proj);
    }
  }

  update(player, time) {
    if (this.isDead || !this.active) return;
    const t = time * 0.002;
    this.y = this.startY + Math.sin(t + this.floatOffset) * this.floatAmplitude;

    if (!player || !player.active) return;
    const distX = player.x - this.x;
    const distY = player.y - this.y;
    const dist = Math.sqrt(distX * distX + distY * distY);

    if (dist < this.shootRange) {
      this.shootAt(player);
      const dir = distX > 0 ? 1 : -1;
      this.setFlipX(dir < 0);
    }
  }
}
