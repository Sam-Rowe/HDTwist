import { LEVEL_COLORS } from '../config.js';

export default class LevelCompleteScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LevelCompleteScene' });
  }

  create() {
    const { width, height } = this.cameras.main;
    const prevLevel = (this.game.registry.get('currentLevel') || 2) - 1;
    const colorIdx = Math.min(prevLevel - 1, LEVEL_COLORS.length - 1);
    const colors = LEVEL_COLORS[colorIdx];
    const coinsEarned = this.game.registry.get('coinsEarned') || 0;
    const score = this.game.registry.get('score') || 0;
    const levelScore = this.game.registry.get('levelScore') || 0;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, colors.bg);

    // Celebration particles
    for (let i = 0; i < 30; i++) {
      const x = Phaser.Math.Between(0, width);
      const y = Phaser.Math.Between(0, height);
      const colors2 = [0xffd700, 0xff69b4, 0x00ff88, 0x88aaff, 0xffff00];
      const c = colors2[Math.floor(Math.random() * colors2.length)];
      const star = this.add.rectangle(x, y, Phaser.Math.Between(4, 12), Phaser.Math.Between(4, 12), c);
      this.tweens.add({
        targets: star, y: y + Phaser.Math.Between(100, 300), alpha: 0,
        duration: Phaser.Math.Between(1500, 3000), delay: Phaser.Math.Between(0, 1000),
        repeat: -1, repeatDelay: Phaser.Math.Between(0, 2000),
        onRepeat: (tween, targets) => {
          targets[0].x = Phaser.Math.Between(0, width);
          targets[0].y = Phaser.Math.Between(-50, 100);
          targets[0].alpha = 1;
        }
      });
    }

    // "LEVEL COMPLETE!" text
    const brightness = Math.min(1, 0.3 + prevLevel / 20);
    // Levels 16+ use vibrant neon colours — switch to bright yellow text for contrast
    const textColor = colorIdx >= 15 ? '#ffff00' : '#ffffff';
    const strokeColor = colors.accent;

    this.add.text(width / 2, 160, 'LEVEL COMPLETE!', {
      fontSize: '72px', fill: textColor, fontStyle: 'bold',
      stroke: `#${strokeColor.toString(16).padStart(6, '0')}`, strokeThickness: 6
    }).setOrigin(0.5);

    this.add.text(width / 2, 260, `Level ${prevLevel} - Cleared!`, {
      fontSize: '28px', fill: '#aaaacc'
    }).setOrigin(0.5);

    // Stats panel
    this.add.rectangle(width / 2, 400, 400, 180, 0x000000, 0.6)
      .setStrokeStyle(2, colors.accent);
    this.add.text(width / 2, 340, '📊 Results', {
      fontSize: '22px', fill: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);
    this.add.text(width / 2, 380, `Coins Earned: ${coinsEarned} 🪙`, {
      fontSize: '20px', fill: '#ffd700'
    }).setOrigin(0.5);
    this.add.text(width / 2, 415, `Level Score: ${levelScore}`, {
      fontSize: '20px', fill: '#88aaff'
    }).setOrigin(0.5);
    this.add.text(width / 2, 450, `Total Score: ${score}`, {
      fontSize: '20px', fill: '#ffffff'
    }).setOrigin(0.5);

    // Next level / end button
    const isLastLevel = prevLevel >= 20;
    const btnText = isLastLevel ? '🏆 YOU WIN! Play Again' : '▶ Next Level';
    const nextBtn = this.add.text(width / 2, 560, btnText, {
      fontSize: '34px', fill: '#ffffff', backgroundColor: '#334488',
      padding: { x: 24, y: 12 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    nextBtn.on('pointerover', () => nextBtn.setStyle({ fill: '#ffff88', backgroundColor: '#5566aa' }));
    nextBtn.on('pointerout', () => nextBtn.setStyle({ fill: '#ffffff', backgroundColor: '#334488' }));
    nextBtn.on('pointerdown', () => {
      if (isLastLevel) {
        this.game.registry.set('currentLevel', 1);
        this.game.registry.set('score', 0);
        this.scene.start('CharacterSelectScene');
      } else {
        this.scene.start('GameScene');
      }
    });

    // Main menu
    const menuBtn = this.add.text(width / 2, 630, 'Main Menu', {
      fontSize: '18px', fill: '#888899'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    menuBtn.on('pointerdown', () => {
      this.scene.start('MainMenuScene');
    });
  }
}
