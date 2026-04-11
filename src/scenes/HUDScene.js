export default class HUDScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HUDScene' });
  }

  create() {
    this.cameras.main.setScroll(0, 0);
    this._buildHUD();
    this._setupRegistryListeners();
  }

  _buildHUD() {
    const r = this.game.registry;
    const level = r.get('currentLevel') || 1;
    const levelName = r.get('levelName') || '';
    const health = r.get('playerHealth') || 100;
    const maxHealth = r.get('playerMaxHealth') || 100;
    const coins = r.get('coins') || 0;
    const charKey = r.get('selectedCharacter') || 'princess_z';

    // Dark HUD background strip
    this.hudBg = this.add.rectangle(640, 22, 1280, 44, 0x000000, 0.6).setDepth(50);

    // HP bar background
    this.add.rectangle(140, 22, 204, 18, 0x330000, 1).setDepth(51);
    this.hpBarBg = this.add.rectangle(140, 22, 200, 14, 0x550000, 1).setDepth(52);
    this.hpBar = this.add.rectangle(40, 22, 200 * (health / maxHealth), 14, 0x00cc44, 1)
      .setDepth(53).setOrigin(0, 0.5);
    this.hpBar.x = 40;

    this.hpLabel = this.add.text(10, 14, 'HP', { fontSize: '13px', fill: '#ffffff', fontStyle: 'bold' }).setDepth(54);
    this.hpText = this.add.text(248, 14, `${health}/${maxHealth}`, { fontSize: '12px', fill: '#ccffcc' }).setDepth(54);

    // Coin display
    this.coinIcon = this.add.sprite(285, 22, 'coin').setDepth(53).setScale(1.2);
    this.coinText = this.add.text(298, 14, `x${coins}`, { fontSize: '14px', fill: '#ffd700', fontStyle: 'bold' }).setDepth(54);

    // Level display
    this.levelText = this.add.text(400, 10, `Level ${level}: ${levelName}`, {
      fontSize: '14px', fill: '#aaaacc', fontStyle: 'italic'
    }).setDepth(54);

    // Character name
    const charNames = {
      princess_z: 'Princess Z', selena: 'Selena', mofasuuu: 'Mofasuuu', king_dragon: 'Dragon King'
    };
    this.add.text(700, 10, charNames[charKey] || charKey, {
      fontSize: '13px', fill: '#88aaff'
    }).setDepth(54);

    // Special power indicator
    this.specialLabel = this.add.text(860, 10, 'SPECIAL [E]', {
      fontSize: '12px', fill: '#888888'
    }).setDepth(54);
    this.specialStatus = this.add.text(960, 10, 'READY', {
      fontSize: '12px', fill: '#00ff88', fontStyle: 'bold'
    }).setDepth(54);

    // Controls reminder
    this.add.text(1100, 10, 'WASD Move  SPC Fire  E Special', {
      fontSize: '10px', fill: '#444466'
    }).setDepth(54);

    // Boss health bar (hidden initially)
    this.bossHudBg = this.add.rectangle(640, 700, 400, 24, 0x000000, 0.8).setDepth(50).setVisible(false);
    this.add.rectangle(640, 700, 396, 14, 0x330000, 1).setDepth(51).setVisible(false);
    this.bossBarBg = this.add.rectangle(640, 700, 392, 10, 0x550000, 1).setDepth(52);
    this.bossBar = this.add.rectangle(442, 700, 392, 10, 0xff4400, 1).setDepth(53).setOrigin(0, 0.5);
    this.bossLabel = this.add.text(520, 690, 'BOSS', { fontSize: '14px', fill: '#ff4400', fontStyle: 'bold' }).setDepth(54);
    this.bossHudBg.setVisible(false);
    this.bossBarBg.setVisible(false);
    this.bossBar.setVisible(false);
    this.bossLabel.setVisible(false);
  }

  _setupRegistryListeners() {
    const r = this.game.registry;
    r.events.on('changedata', (parent, key, value) => {
      this._onRegistryChange(key, value);
    });
  }

  _onRegistryChange(key, value) {
    if (!this.scene.isActive()) return;
    switch (key) {
      case 'playerHealth': {
        const max = this.game.registry.get('playerMaxHealth') || 100;
        const pct = Math.max(0, Math.min(1, value / max));
        this.hpBar.width = 200 * pct;
        const color = pct > 0.5 ? 0x00cc44 : pct > 0.25 ? 0xffaa00 : 0xff2200;
        this.hpBar.setFillStyle(color);
        this.hpText.setText(`${value}/${max}`);
        break;
      }
      case 'coins':
        this.coinText.setText(`x${value}`);
        break;
      case 'specialActive':
        if (value) {
          this.specialStatus.setText('ACTIVE').setStyle({ fill: '#ffff00', fontStyle: 'bold' });
        } else if (!this.game.registry.get('specialCooldown')) {
          this.specialStatus.setText('READY').setStyle({ fill: '#00ff88', fontStyle: 'bold' });
        }
        break;
      case 'specialCooldown':
        if (value) {
          this.specialStatus.setText('COOLDOWN').setStyle({ fill: '#ff4444', fontStyle: 'normal' });
        } else {
          this.specialStatus.setText('READY').setStyle({ fill: '#00ff88', fontStyle: 'bold' });
        }
        break;
      case 'showBoss':
        this.bossHudBg.setVisible(!!value);
        this.bossBarBg.setVisible(!!value);
        this.bossBar.setVisible(!!value);
        this.bossLabel.setVisible(!!value);
        break;
      case 'bossHealth': {
        const bossMax = this.game.registry.get('bossMaxHealth') || 1;
        const pct = Math.max(0, Math.min(1, value / bossMax));
        this.bossBar.width = 392 * pct;
        break;
      }
    }
  }
}
