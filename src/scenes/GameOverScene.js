export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  create() {
    const { width, height } = this.cameras.main;
    const levelReached = this.game.registry.get('levelReached') || 1;
    const score = this.game.registry.get('score') || 0;

    // Dark background
    this.add.rectangle(width / 2, height / 2, width, height, 0x050008);

    // Red vignette
    const vignette = this.add.graphics();
    vignette.fillGradientStyle(0x660000, 0x660000, 0x000000, 0x000000, 0.5);
    vignette.fillRect(0, 0, width, height);

    // GAME OVER text with dramatic effect
    const goText = this.add.text(width / 2, 200, 'GAME OVER', {
      fontSize: '90px', fill: '#cc0000', fontStyle: 'bold',
      stroke: '#ff0000', strokeThickness: 4
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: goText, alpha: 1, y: 210, duration: 800, ease: 'Back.easeOut'
    });

    // Flickering effect
    this.time.delayedCall(1000, () => {
      this.tweens.add({
        targets: goText, alpha: 0.7, yoyo: true, repeat: -1, duration: 200,
        ease: 'Stepped', steps: 2
      });
    });

    // Stats
    this.time.delayedCall(600, () => {
      this.add.text(width / 2, 330, `You reached Level ${levelReached}`, {
        fontSize: '28px', fill: '#ff8888'
      }).setOrigin(0.5);

      this.add.text(width / 2, 375, `Final Score: ${score}`, {
        fontSize: '24px', fill: '#ffaaaa'
      }).setOrigin(0.5);
    });

    // Buttons (appear after delay)
    this.time.delayedCall(1200, () => {
      const retryBtn = this.add.text(width / 2 - 140, 480, '🔄 RETRY', {
        fontSize: '30px', fill: '#ffffff', backgroundColor: '#442200',
        padding: { x: 20, y: 12 }
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });
      retryBtn.on('pointerover', () => retryBtn.setStyle({ fill: '#ffff88', backgroundColor: '#664400' }));
      retryBtn.on('pointerout', () => retryBtn.setStyle({ fill: '#ffffff', backgroundColor: '#442200' }));
      retryBtn.on('pointerdown', () => {
        // Reset health but keep level and coins
        this.game.registry.set('playerHealth', 100);
        this.scene.start('GameScene');
      });

      const menuBtn = this.add.text(width / 2 + 140, 480, '🏠 MENU', {
        fontSize: '30px', fill: '#ffffff', backgroundColor: '#222244',
        padding: { x: 20, y: 12 }
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });
      menuBtn.on('pointerover', () => menuBtn.setStyle({ fill: '#ffff88', backgroundColor: '#334466' }));
      menuBtn.on('pointerout', () => menuBtn.setStyle({ fill: '#ffffff', backgroundColor: '#222244' }));
      menuBtn.on('pointerdown', () => {
        this.game.registry.set('currentLevel', 1);
        this.game.registry.set('score', 0);
        this.game.registry.set('coins', 0);
        this.game.registry.set('upgrades', { jump: 0, weapon: 0, armor: 0, skin: 0 });
        this.scene.start('MainMenuScene');
      });

      // Skull decorations
      this.add.text(width / 2 - 280, 480, '💀', { fontSize: '40px' }).setOrigin(0.5);
      this.add.text(width / 2 + 280, 480, '💀', { fontSize: '40px' }).setOrigin(0.5);
    });

    // Tip text
    this.time.delayedCall(1500, () => {
      const tips = [
        'Tip: Buy upgrades at shop doors!',
        'Tip: Jump over barrels for bonus coins!',
        'Tip: Duck with S to avoid projectiles!',
        'Tip: Use your special power more often!',
        'Tip: Talk to NPCs for story hints!'
      ];
      const tip = tips[Math.floor(Math.random() * tips.length)];
      this.add.text(width / 2, 570, tip, {
        fontSize: '16px', fill: '#666688', fontStyle: 'italic'
      }).setOrigin(0.5);
    });
  }
}
