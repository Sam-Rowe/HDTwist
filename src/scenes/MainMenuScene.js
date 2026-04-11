import { LEVEL_COLORS } from '../config.js';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' });
  }

  create() {
    const { width, height } = this.cameras.main;
    const col = LEVEL_COLORS[0];

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, col.bg);

    // Animated background particles
    for (let i = 0; i < 20; i++) {
      const x = Phaser.Math.Between(0, width);
      const y = Phaser.Math.Between(0, height);
      const size = Phaser.Math.Between(2, 6);
      const star = this.add.rectangle(x, y, size, size, 0x444466, 0.5);
      this.tweens.add({
        targets: star, alpha: { from: 0.1, to: 0.6 }, yoyo: true, repeat: -1,
        duration: Phaser.Math.Between(1000, 3000), delay: Phaser.Math.Between(0, 2000)
      });
    }

    // Title
    const title = this.add.text(width / 2, 180, 'HDTwist', {
      fontSize: '96px', fill: '#ffffff', fontStyle: 'bold',
      stroke: '#6644ff', strokeThickness: 8
    }).setOrigin(0.5);
    this.tweens.add({
      targets: title, scaleX: 1.04, scaleY: 1.04, yoyo: true, repeat: -1, duration: 1200, ease: 'Sine.easeInOut'
    });

    // Subtitle
    this.add.text(width / 2, 285, 'A game by Sam & Hazel', {
      fontSize: '22px', fill: '#aaaacc', fontStyle: 'italic'
    }).setOrigin(0.5);

    // Play button
    const playBtn = this.add.text(width / 2, 400, '▶  PLAY', {
      fontSize: '48px', fill: '#ffffff', backgroundColor: '#334488',
      padding: { x: 30, y: 14 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    playBtn.on('pointerover', () => playBtn.setStyle({ fill: '#ffff88', backgroundColor: '#5566aa' }));
    playBtn.on('pointerout', () => playBtn.setStyle({ fill: '#ffffff', backgroundColor: '#334488' }));
    playBtn.on('pointerdown', () => this.scene.start('CharacterSelectScene'));

    // Bouncing arrow
    const arrow = this.add.text(width / 2, 490, '↓ Select Character', {
      fontSize: '18px', fill: '#8888aa'
    }).setOrigin(0.5);
    this.tweens.add({ targets: arrow, y: 500, yoyo: true, repeat: -1, duration: 700 });

    // Controls hint
    this.add.text(width / 2, 580, 'A/D = Move   W = Jump   S = Duck   SPACE = Attack   E = Special', {
      fontSize: '16px', fill: '#666688'
    }).setOrigin(0.5);

    // Character name decorations (corners)
    const chars = ['Princess Z', 'Selena the Dragon Slayer', 'Mofasuuu', 'King of Dragons!'];
    const positions = [[80, 80], [width - 80, 80], [80, height - 80], [width - 80, height - 80]];
    chars.forEach((name, i) => {
      this.add.text(positions[i][0], positions[i][1], name, {
        fontSize: '13px', fill: '#445566', fontStyle: 'italic'
      }).setOrigin(0.5);
    });
  }
}
