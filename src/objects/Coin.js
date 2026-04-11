export default class Coin extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'coin');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.body.setSize(14, 14);
    this.collected = false;

    // Spinning tween
    scene.tweens.add({
      targets: this, scaleX: 0.1, yoyo: true, repeat: -1, duration: 500, ease: 'Linear'
    });
  }

  collect(player) {
    if (this.collected) return;
    this.collected = true;
    player.addCoin();
    // Show +1 text
    const text = this.scene.add.text(this.x, this.y - 10, '+1', {
      fontSize: '14px', fill: '#ffff00', fontStyle: 'bold'
    }).setOrigin(0.5);
    this.scene.tweens.add({
      targets: text, y: this.y - 40, alpha: 0, duration: 800,
      onComplete: () => text.destroy()
    });
    this.destroy();
  }
}
