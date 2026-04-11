import { CHARACTER_DATA, CHARACTERS } from '../config.js';

export default class CharacterSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CharacterSelectScene' });
    this.selectedCharacter = null;
  }

  create() {
    const { width, height } = this.cameras.main;

    this.add.rectangle(width / 2, height / 2, width, height, 0x0a0a1a);

    this.add.text(width / 2, 50, 'SELECT YOUR CHARACTER', {
      fontSize: '38px', fill: '#ffffff', fontStyle: 'bold',
      stroke: '#334499', strokeThickness: 5
    }).setOrigin(0.5);

    const charKeys = Object.values(CHARACTERS);
    const cardW = 260;
    const cardH = 340;
    const startX = (width - (cardW * charKeys.length + 20 * (charKeys.length - 1))) / 2 + cardW / 2;

    charKeys.forEach((charKey, i) => {
      const data = CHARACTER_DATA[charKey];
      const cx = startX + i * (cardW + 20);
      const cy = height / 2 + 30;
      this._createCard(cx, cy, cardW, cardH, charKey, data, i);
    });

    // Back button
    const backBtn = this.add.text(60, 30, '← BACK', {
      fontSize: '22px', fill: '#aaaacc'
    }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });
    backBtn.on('pointerover', () => backBtn.setStyle({ fill: '#ffffff' }));
    backBtn.on('pointerout', () => backBtn.setStyle({ fill: '#aaaacc' }));
    backBtn.on('pointerdown', () => this.scene.start('MainMenuScene'));

    // Start button (disabled initially)
    this.startBtn = this.add.text(width / 2, height - 40, 'SELECT A CHARACTER TO START', {
      fontSize: '26px', fill: '#666688', backgroundColor: '#222233',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5);
  }

  _createCard(cx, cy, cardW, cardH, charKey, data, index) {
    const cardColors = [0xff3388, 0x4169e1, 0x6a0dad, 0x8b0000];
    const bgColor = cardColors[index];
    const card = this.add.graphics();
    card.fillStyle(0x1a1a2e); card.fillRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 12);
    card.lineStyle(2, bgColor, 1); card.strokeRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 12);

    // Character sprite
    const sprite = this.add.sprite(cx, cy - 80, 'player_' + charKey).setScale(2.5);

    // Name
    this.add.text(cx, cy + 10, data.name, {
      fontSize: '15px', fill: '#ffffff', fontStyle: 'bold', wordWrap: { width: cardW - 20 }, align: 'center'
    }).setOrigin(0.5);

    // Description
    this.add.text(cx, cy + 55, data.description, {
      fontSize: '12px', fill: '#aaaacc', wordWrap: { width: cardW - 20 }, align: 'center'
    }).setOrigin(0.5);

    // Special
    this.add.text(cx, cy + 110, `⚡ ${data.special.name}`, {
      fontSize: '12px', fill: '#ffdd44', fontStyle: 'italic', wordWrap: { width: cardW - 20 }, align: 'center'
    }).setOrigin(0.5);
    this.add.text(cx, cy + 132, data.special.description, {
      fontSize: '11px', fill: '#888899', wordWrap: { width: cardW - 20 }, align: 'center'
    }).setOrigin(0.5);

    // Clickable zone
    const zone = this.add.zone(cx, cy, cardW, cardH).setInteractive({ useHandCursor: true });
    zone.on('pointerover', () => {
      card.clear();
      card.fillStyle(0x2a2a3e); card.fillRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 12);
      card.lineStyle(3, 0xffffff, 1); card.strokeRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 12);
      sprite.setScale(2.8);
    });
    zone.on('pointerout', () => {
      const isSelected = this.selectedCharacter === charKey;
      card.clear();
      card.fillStyle(0x1a1a2e); card.fillRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 12);
      card.lineStyle(isSelected ? 4 : 2, isSelected ? 0xffff00 : bgColor, 1);
      card.strokeRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 12);
      sprite.setScale(isSelected ? 3.0 : 2.5);
    });
    zone.on('pointerdown', () => {
      this.selectedCharacter = charKey;
      this.game.registry.set('selectedCharacter', charKey);
      this.game.registry.set('coins', 0);
      this.game.registry.set('upgrades', { jump: 0, weapon: 0, armor: 0, skin: 0 });
      this.game.registry.set('currentLevel', 1);
      this.game.registry.set('score', 0);

      // Redraw all cards
      this.scene.restart();

      // Actually start the game after restart would lose state, so use this:
    });

    // If this is the selected character, highlight
    if (this.selectedCharacter === charKey) {
      card.clear();
      card.fillStyle(0x2a2a3e); card.fillRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 12);
      card.lineStyle(4, 0xffff00, 1); card.strokeRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 12);
      sprite.setScale(3.0);

      this.startBtn.setStyle({ fill: '#ffffff', backgroundColor: '#334488' });
      this.startBtn.setText('▶ START GAME');
      this.startBtn.setInteractive({ useHandCursor: true });
      this.startBtn.on('pointerdown', () => {
        this.scene.start('GameScene');
      });
    }

    zone.on('pointerdown', () => {
      this.selectedCharacter = charKey;
      this.game.registry.set('selectedCharacter', charKey);
      if (!this.game.registry.get('coins')) {
        this.game.registry.set('coins', 0);
        this.game.registry.set('upgrades', { jump: 0, weapon: 0, armor: 0, skin: 0 });
        this.game.registry.set('currentLevel', 1);
        this.game.registry.set('score', 0);
      }
      this._updateStartButton();
    });
  }

  _updateStartButton() {
    if (this.selectedCharacter) {
      this.startBtn.setStyle({ fill: '#ffffff', backgroundColor: '#334488' });
      this.startBtn.setText('▶ START GAME');
      if (!this.startBtn.listenerCount('pointerdown')) {
        this.startBtn.setInteractive({ useHandCursor: true });
        this.startBtn.on('pointerover', () => this.startBtn.setStyle({ fill: '#ffff88', backgroundColor: '#5566aa' }));
        this.startBtn.on('pointerout', () => this.startBtn.setStyle({ fill: '#ffffff', backgroundColor: '#334488' }));
        this.startBtn.on('pointerdown', () => this.scene.start('GameScene'));
      }
    }
  }
}
