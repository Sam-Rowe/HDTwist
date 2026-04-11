import { UPGRADES } from '../config.js';

export default class ShopScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ShopScene' });
  }

  create() {
    const { width, height } = this.cameras.main;
    this.coins = this.game.registry.get('coins') || 0;
    this.upgrades = Object.assign({ jump: 0, weapon: 0, armor: 0, skin: 0 },
      this.game.registry.get('upgrades') || {});

    // Semi-transparent overlay
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.85);

    // Shop panel
    const panelW = 700, panelH = 520;
    this.add.rectangle(width / 2, height / 2, panelW, panelH, 0x1a1a2e).setStrokeStyle(3, 0x8855ff);

    // Title
    this.add.text(width / 2, height / 2 - 230, '🏪 UPGRADE SHOP', {
      fontSize: '32px', fill: '#ffd700', fontStyle: 'bold'
    }).setOrigin(0.5);

    // Coins display
    this.coinsText = this.add.text(width / 2, height / 2 - 190, `Coins: ${this.coins}`, {
      fontSize: '22px', fill: '#ffd700'
    }).setOrigin(0.5);

    // Upgrade items
    const upgradeKeys = Object.keys(UPGRADES);
    const startY = height / 2 - 130;
    this.upgradeRows = {};

    upgradeKeys.forEach((key, i) => {
      const upg = UPGRADES[key];
      const y = startY + i * 80;
      this._createUpgradeRow(width / 2, y, key, upg);
    });

    // Close button
    const closeBtn = this.add.text(width / 2, height / 2 + 220, '✖ CLOSE SHOP', {
      fontSize: '24px', fill: '#ffffff', backgroundColor: '#553311',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    closeBtn.on('pointerover', () => closeBtn.setStyle({ fill: '#ffff88' }));
    closeBtn.on('pointerout', () => closeBtn.setStyle({ fill: '#ffffff' }));
    closeBtn.on('pointerdown', this._closeShop, this);

    // ESC to close
    this._boundHandleEsc = this._boundHandleEsc || this._handleEscKey.bind(this);
    this._boundShutdownHandler = this._boundShutdownHandler || this._onShutdown.bind(this);
    this.input.keyboard.on('keydown-ESC', this._boundHandleEsc);
    this.events.once('shutdown', this._boundShutdownHandler);
  }

  _closeShop() {
    this.scene.stop('ShopScene');
    this.scene.resume('GameScene');
  }

  _handleEscKey() {
    this._closeShop();
  }

  _onShutdown() {
    if (this.input && this.input.keyboard && this._boundHandleEsc) {
      this.input.keyboard.off('keydown-ESC', this._boundHandleEsc);
    }
  }

  _createUpgradeRow(cx, y, key, upg) {
    const currentLevel = this.upgrades[key];
    const maxLevel = upg.levels.length - 1;
    const levelData = upg.levels[currentLevel];
    const nextData = currentLevel < maxLevel ? upg.levels[currentLevel + 1] : null;

    // Name
    this.add.text(cx - 320, y, upg.name, {
      fontSize: '16px', fill: '#ffffff', fontStyle: 'bold'
    });

    // Level pips
    for (let l = 0; l < upg.levels.length; l++) {
      const pip = this.add.rectangle(cx - 170 + l * 24, y + 8, 18, 12,
        l <= currentLevel ? 0x8855ff : 0x333355);
      if (l === currentLevel) pip.setStrokeStyle(2, 0xffffff);
    }

    // Current description
    this.add.text(cx - 80, y, levelData.desc, {
      fontSize: '13px', fill: '#aaaacc'
    });

    if (nextData && currentLevel < maxLevel) {
      // Buy button
      const canAfford = this.coins >= nextData.cost;
      const btnText = `Upgrade (${nextData.cost} 🪙)`;
      const btn = this.add.text(cx + 220, y, btnText, {
        fontSize: '14px',
        fill: canAfford ? '#ffffff' : '#666666',
        backgroundColor: canAfford ? '#335533' : '#222222',
        padding: { x: 10, y: 5 }
      }).setOrigin(0, 0).setInteractive(canAfford ? { useHandCursor: true } : {});

      if (canAfford) {
        btn.on('pointerover', () => btn.setStyle({ fill: '#ffff88', backgroundColor: '#557755' }));
        btn.on('pointerout', () => btn.setStyle({ fill: '#ffffff', backgroundColor: '#335533' }));
        btn.on('pointerdown', () => this._buyUpgrade(key, nextData.cost));
      }
    } else {
      this.add.text(cx + 220, y, currentLevel >= maxLevel ? '\u2713 MAX' : '', {
        fontSize: '14px', fill: '#ffd700', fontStyle: 'bold'
      });
    }
  }

  _buyUpgrade(key, cost) {
    if (this.coins < cost) return;
    this.coins -= cost;
    this.upgrades[key] = Math.min(this.upgrades[key] + 1, UPGRADES[key].levels.length - 1);
    this.game.registry.set('coins', this.coins);
    this.game.registry.set('upgrades', Object.assign({}, this.upgrades));

    // Also update player in game scene
    const gameScene = this.scene.get('GameScene');
    if (gameScene && gameScene.player) {
      gameScene.player.coins = this.coins;
      gameScene.player.upgrades = Object.assign({}, this.upgrades);
    }

    // Refresh shop
    this.scene.restart();
  }
}
