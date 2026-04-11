export default class Barrel extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;
    this.isJumped = false;

    const sprite = scene.add.sprite(0, 0, 'barrel');
    this.add(sprite);

    scene.add.existing(this);
    scene.physics.add.existing(this, true); // static body
    this.body.setSize(36, 36);
    this.body.setOffset(-18, -18);

    // Jump zone (area above barrel)
    this.jumpZone = scene.add.zone(x, y - 40, 50, 30);
    scene.physics.add.existing(this.jumpZone, false);
    this.jumpZone.body.setAllowGravity(false);
    this.jumpZone.barrel = this;
  }
}
