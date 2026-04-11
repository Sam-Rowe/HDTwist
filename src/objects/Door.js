export default class Door extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'door');
    this.scene = scene;
    this.playerNear = false;
    this.promptText = null;
    this.flashTween = null;

    scene.add.existing(this);
    scene.physics.add.existing(this, true); // static body
    this.body.setSize(44, 60);
  }

  setPlayerNear(near) {
    if (near === this.playerNear) return;
    this.playerNear = near;
    if (near) {
      if (!this.promptText) {
        this.promptText = this.scene.add.text(this.x, this.y - 50, 'W = Shop', {
          fontSize: '14px', fill: '#ffffff', backgroundColor: '#000000',
          padding: { x: 4, y: 2 }
        }).setOrigin(0.5).setDepth(10);
      }
      if (!this.flashTween) {
        this.flashTween = this.scene.tweens.add({
          targets: this, alpha: 0.6, yoyo: true, repeat: -1, duration: 400
        });
      }
    } else {
      if (this.promptText) { this.promptText.destroy(); this.promptText = null; }
      if (this.flashTween) { this.flashTween.stop(); this.flashTween = null; this.setAlpha(1); }
    }
  }

  update(player) {
    if (!player || !player.active) return;
    const dist = Math.abs(player.x - this.x);
    this.setPlayerNear(dist < 80);
    if (this.promptText) {
      this.promptText.setPosition(this.x, this.y - 50);
    }
  }
}
