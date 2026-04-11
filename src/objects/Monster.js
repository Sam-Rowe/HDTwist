import Projectile from './Projectile.js';

export default class Monster extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, level) {
    super(scene, x, y, 'monster');
    this.scene = scene;
    this.level = level || 1;
    this.maxHealth = 30 + level * 10;
    this.health = this.maxHealth;
    this.damage = 8 + level * 2;
    this.speed = 80 + level * 5;
    this.chaseRange = 300;
    this.patrolDir = 1;
    this.patrolTimer = 0;
    this.patrolDistance = 0;
    this.maxPatrolDistance = 150;
    this.startX = x;
    this.isDead = false;
    this.attackCooldown = false;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setSize(28, 32);
  }

  takeDamage(amount) {
    if (this.isDead) return;
    this.health -= amount;
    this.setTint(0xff0000);
    this.scene.time.delayedCall(150, () => { if (this.active) this.clearTint(); });
    if (this.health <= 0) { this.die(); }
  }

  die() {
    if (this.isDead) return;
    this.isDead = true;
    // Chance to drop coin
    if (Math.random() < 0.4) {
      this.scene.spawnCoin(this.x, this.y);
    }
    this.scene.tweens.add({
      targets: this, alpha: 0, y: this.y - 20, duration: 300,
      onComplete: () => { this.destroy(); }
    });
  }

  update(player) {
    if (this.isDead || !this.active || !player || !player.active) return;
    const distX = player.x - this.x;
    const distY = player.y - this.y;
    const dist = Math.sqrt(distX * distX + distY * distY);

    if (dist < this.chaseRange) {
      // Chase player
      const dir = distX > 0 ? 1 : -1;
      this.setVelocityX(dir * this.speed);
      this.setFlipX(dir < 0);
    } else {
      // Patrol
      this.patrolDistance += Math.abs(this.body.velocity.x) * (1 / 60);
      if (this.patrolDistance > this.maxPatrolDistance) {
        this.patrolDir *= -1;
        this.patrolDistance = 0;
      }
      this.setVelocityX(this.patrolDir * this.speed * 0.5);
      this.setFlipX(this.patrolDir < 0);
    }
  }
}
