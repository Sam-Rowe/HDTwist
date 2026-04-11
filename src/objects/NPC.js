export default class NPC extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, dialog) {
    super(scene, x, y, 'npc');
    this.scene = scene;
    this.dialog = dialog || ['Hello!'];
    this.dialogIndex = 0;
    this.playerNear = false;
    this.promptText = null;
    this.dialogBubble = null;
    this.dialogText = null;
    this.showingDialog = false;
    this.prevWKey = false;

    scene.add.existing(this);
    scene.physics.add.existing(this, true);
    this.body.setSize(22, 44);

    this.wKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  }

  showDialog() {
    this.showingDialog = true;
    const line = this.dialog[this.dialogIndex];
    if (this.dialogBubble) { this.dialogBubble.destroy(); this.dialogBubble = null; }
    if (this.dialogText) { this.dialogText.destroy(); this.dialogText = null; }

    this.dialogBubble = this.scene.add.graphics();
    this.dialogBubble.fillStyle(0xffffff, 0.95);
    this.dialogBubble.fillRoundedRect(this.x - 120, this.y - 120, 240, 60, 8);
    this.dialogBubble.fillStyle(0x000000, 1);
    this.dialogBubble.fillTriangle(this.x - 10, this.y - 62, this.x + 10, this.y - 62, this.x, this.y - 50);
    this.dialogBubble.setDepth(20);

    this.dialogText = this.scene.add.text(this.x, this.y - 90, line, {
      fontSize: '13px', fill: '#000000', wordWrap: { width: 220 }, align: 'center'
    }).setOrigin(0.5).setDepth(21);

    const nextHint = this.scene.add.text(this.x + 100, this.y - 65, this.dialogIndex < this.dialog.length - 1 ? 'W→' : 'W✕', {
      fontSize: '11px', fill: '#666666'
    }).setOrigin(0.5).setDepth(21);
    this.scene.time.delayedCall(3000, () => { if (nextHint.active) nextHint.destroy(); });
  }

  hideDialog() {
    this.showingDialog = false;
    this.dialogIndex = 0;
    if (this.dialogBubble) { this.dialogBubble.destroy(); this.dialogBubble = null; }
    if (this.dialogText) { this.dialogText.destroy(); this.dialogText = null; }
  }

  update(player) {
    if (!player || !player.active) return;
    const dist = Math.abs(player.x - this.x);
    const near = dist < 80;

    if (near !== this.playerNear) {
      this.playerNear = near;
      if (!near) {
        this.hideDialog();
        if (this.promptText) { this.promptText.destroy(); this.promptText = null; }
      } else {
        if (!this.promptText) {
          this.promptText = this.scene.add.text(this.x, this.y - 55, 'W = Talk', {
            fontSize: '13px', fill: '#ffffff', backgroundColor: '#000000',
            padding: { x: 4, y: 2 }
          }).setOrigin(0.5).setDepth(10);
        }
      }
    }

    if (this.promptText) this.promptText.setPosition(this.x, this.y - 55);

    if (near) {
      const wDown = this.wKey.isDown;
      if (wDown && !this.prevWKey) {
        if (!this.showingDialog) {
          this.dialogIndex = 0;
          this.showDialog();
        } else {
          this.dialogIndex++;
          if (this.dialogIndex >= this.dialog.length) {
            this.hideDialog();
          } else {
            this.showDialog();
          }
        }
      }
      this.prevWKey = wDown;
    }
  }
}
