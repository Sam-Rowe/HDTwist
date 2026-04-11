export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, config = {}) {
    super(scene, x, y, key);
    this.scene = scene;
    this.damage = config.damage || 10;
    this.speed = config.speed || 400;
    this.fromPlayer = config.fromPlayer !== undefined ? config.fromPlayer : true;
    this.direction = config.direction || 1;
    this.velocityX = config.velocityX || this.direction * this.speed;
    this.velocityY = config.velocityY || 0;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.setVelocity(this.velocityX, this.velocityY);
    const lifespan = typeof config.lifespan === 'number' && config.lifespan >= 0
      ? config.lifespan
      : (config.lifespan ?? 3000);
    this.lifeTimer = scene.time.delayedCall(
      typeof lifespan === 'number' && lifespan >= 0 ? lifespan : 3000,
      () => { this.destroySelf(); }
    );
  }

  destroySelf() {
    if (this.lifeTimer) { this.lifeTimer.remove(); }
    if (this.active) { this.destroy(); }
  }

  update() {
    if (!this.active) return;
    if (this.x < -100 || this.x > (this.scene.worldWidth || 10000) + 100) {
      this.destroySelf();
    }
  }
}
