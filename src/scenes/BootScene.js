
export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create() {
    this._createTextures();
    this.scene.start('MainMenuScene');
  }

  _makeTexture(key, w, h, drawFn) {
    const g = this.make.graphics({ x: 0, y: 0, add: false });
    drawFn(g);
    g.generateTexture(key, w, h);
    g.destroy();
  }

  _createTextures() {
    // --- Platform ---
    this._makeTexture('platform', 64, 20, g => {
      g.fillStyle(0x555566); g.fillRect(0, 0, 64, 20);
      g.fillStyle(0x7777aa); g.fillRect(0, 0, 64, 4);
      g.fillStyle(0x333344); g.fillRect(0, 16, 64, 4);
    });

    // --- Player: Princess Z ---
    this._makeTexture('player_princess_z', 32, 48, g => {
      // Body
      g.fillStyle(0xff69b4); g.fillRect(8, 20, 16, 20);
      // Head
      g.fillStyle(0xffcc99); g.fillRect(8, 4, 16, 16);
      // Hair
      g.fillStyle(0xffff00); g.fillRect(6, 2, 20, 6);
      // Crown
      g.fillStyle(0xffd700);
      g.fillTriangle(8, 2, 11, -2, 14, 2);
      g.fillTriangle(14, 2, 16, -2, 18, 2);
      g.fillTriangle(18, 2, 21, -2, 24, 2);
      // Legs
      g.fillStyle(0xffcc99); g.fillRect(8, 40, 6, 8); g.fillRect(18, 40, 6, 8);
      // Arms
      g.fillStyle(0xff69b4); g.fillRect(2, 22, 6, 12); g.fillRect(24, 22, 6, 12);
      // Eyes
      g.fillStyle(0x000000); g.fillRect(11, 9, 3, 3); g.fillRect(18, 9, 3, 3);
    });

    // --- Player: Selena ---
    this._makeTexture('player_selena', 32, 48, g => {
      // Body
      g.fillStyle(0x4169e1); g.fillRect(8, 20, 16, 20);
      // Head
      g.fillStyle(0xffcc99); g.fillRect(8, 4, 16, 16);
      // Hair
      g.fillStyle(0x8b4513); g.fillRect(6, 2, 20, 8);
      // Sword
      g.fillStyle(0xc0c0c0); g.fillRect(26, 10, 4, 28);
      g.fillStyle(0x8b4513); g.fillRect(24, 22, 8, 4);
      // Legs
      g.fillStyle(0x2a2a6e); g.fillRect(8, 40, 6, 8); g.fillRect(18, 40, 6, 8);
      // Arms
      g.fillStyle(0x4169e1); g.fillRect(2, 22, 6, 12); g.fillRect(24, 22, 6, 12);
      // Eyes
      g.fillStyle(0x000000); g.fillRect(11, 9, 3, 3); g.fillRect(18, 9, 3, 3);
    });

    // --- Player: Mofasuuu ---
    this._makeTexture('player_mofasuuu', 32, 48, g => {
      // Robe
      g.fillStyle(0x6a0dad); g.fillRect(6, 20, 20, 22);
      // Head
      g.fillStyle(0xffcc99); g.fillRect(8, 6, 16, 16);
      // Hat
      g.fillStyle(0x4a0080);
      g.fillTriangle(16, -2, 6, 14, 26, 14);
      g.fillRect(4, 13, 24, 4);
      // Staff
      g.fillStyle(0x8b4513); g.fillRect(26, 8, 4, 32);
      g.fillStyle(0x87ceeb); g.fillCircle(28, 8, 5);
      // Arms
      g.fillStyle(0x6a0dad); g.fillRect(2, 22, 6, 12); g.fillRect(24, 22, 6, 12);
      // Eyes
      g.fillStyle(0x87ceeb); g.fillRect(11, 11, 3, 3); g.fillRect(18, 11, 3, 3);
    });

    // --- Player: King Dragon ---
    this._makeTexture('player_king_dragon', 32, 48, g => {
      // Body (dragon red)
      g.fillStyle(0x8b0000); g.fillRect(6, 18, 20, 22);
      // Head
      g.fillStyle(0xcc2200); g.fillRect(6, 4, 20, 16);
      // Crown
      g.fillStyle(0xffd700);
      g.fillRect(6, 2, 20, 4);
      g.fillTriangle(8, 2, 10, -3, 12, 2);
      g.fillTriangle(14, 2, 16, -3, 18, 2);
      g.fillTriangle(20, 2, 22, -3, 24, 2);
      // Wings
      g.fillStyle(0x660000);
      g.fillTriangle(0, 20, 6, 18, 6, 38);
      g.fillTriangle(32, 20, 26, 18, 26, 38);
      // Horns
      g.fillStyle(0xffa500);
      g.fillTriangle(8, 4, 6, -2, 12, 4);
      g.fillTriangle(24, 4, 26, -2, 20, 4);
      // Eyes
      g.fillStyle(0xffff00); g.fillRect(9, 9, 4, 4); g.fillRect(19, 9, 4, 4);
      g.fillStyle(0x000000); g.fillRect(10, 10, 2, 2); g.fillRect(20, 10, 2, 2);
      // Legs
      g.fillStyle(0x8b0000); g.fillRect(8, 40, 6, 8); g.fillRect(18, 40, 6, 8);
    });

    // --- Monster ---
    this._makeTexture('monster', 30, 36, g => {
      g.fillStyle(0xaa2200); g.fillRect(2, 8, 26, 24);
      g.fillStyle(0xcc3300); g.fillRect(4, 2, 22, 14);
      // Spikes on head
      g.fillStyle(0xff4400);
      g.fillTriangle(6, 2, 8, -4, 10, 2);
      g.fillTriangle(14, 2, 16, -4, 18, 2);
      g.fillTriangle(22, 2, 24, -4, 26, 2);
      // Eyes
      g.fillStyle(0xff0000); g.fillRect(7, 6, 5, 5); g.fillRect(18, 6, 5, 5);
      g.fillStyle(0x000000); g.fillRect(8, 7, 3, 3); g.fillRect(19, 7, 3, 3);
      // Mouth / teeth
      g.fillStyle(0xffffff);
      g.fillRect(8, 18, 3, 4); g.fillRect(14, 18, 3, 4); g.fillRect(20, 18, 3, 4);
      // Legs
      g.fillStyle(0xaa2200); g.fillRect(4, 32, 8, 4); g.fillRect(18, 32, 8, 4);
    });

    // --- Water Ghost ---
    this._makeTexture('water_ghost', 28, 40, g => {
      g.fillStyle(0x6699ff, 0.7); g.fillRect(2, 0, 24, 28);
      g.fillCircle(14, 14, 12);
      // Wavy bottom
      g.fillStyle(0x4477dd, 0.8);
      g.fillRect(2, 22, 24, 14);
      g.fillStyle(0x6699ff, 0.5);
      g.fillCircle(8, 32, 6); g.fillCircle(20, 32, 6);
      // Eyes
      g.fillStyle(0xffffff); g.fillCircle(9, 12, 4); g.fillCircle(19, 12, 4);
      g.fillStyle(0x0000cc); g.fillCircle(9, 13, 2); g.fillCircle(19, 13, 2);
    });

    // --- Boss ---
    this._makeTexture('boss', 64, 64, g => {
      g.fillStyle(0x880000); g.fillRect(8, 16, 48, 42);
      g.fillStyle(0xcc0000); g.fillRect(12, 4, 40, 26);
      // Wings
      g.fillStyle(0x550000);
      g.fillTriangle(0, 20, 8, 16, 8, 58);
      g.fillTriangle(64, 20, 56, 16, 56, 58);
      // Horns
      g.fillStyle(0xff8800);
      g.fillTriangle(14, 4, 10, -8, 22, 4);
      g.fillTriangle(50, 4, 54, -8, 42, 4);
      // Eyes
      g.fillStyle(0xffff00); g.fillCircle(22, 14, 7); g.fillCircle(42, 14, 7);
      g.fillStyle(0x000000); g.fillCircle(22, 14, 4); g.fillCircle(42, 14, 4);
      g.fillStyle(0xff0000); g.fillCircle(22, 14, 2); g.fillCircle(42, 14, 2);
      // Teeth
      g.fillStyle(0xffffff);
      for (let i = 0; i < 4; i++) { g.fillRect(16 + i * 9, 32, 5, 8); }
      // Legs
      g.fillStyle(0x880000); g.fillRect(12, 58, 12, 6); g.fillRect(40, 58, 12, 6);
    });

    // --- Barrel ---
    this._makeTexture('barrel', 36, 36, g => {
      g.fillStyle(0x8b4513); g.fillRect(4, 0, 28, 36);
      g.fillStyle(0xdaa520);
      g.fillRect(2, 6, 32, 4); g.fillRect(2, 26, 32, 4);
      g.fillStyle(0xa0522d);
      g.fillRect(0, 0, 4, 36); g.fillRect(32, 0, 4, 36);
      g.fillStyle(0xffd700, 0.4); g.fillRect(8, 2, 6, 32);
    });

    // --- Coin ---
    this._makeTexture('coin', 16, 16, g => {
      g.fillStyle(0xffd700); g.fillCircle(8, 8, 7);
      g.fillStyle(0xffec50); g.fillCircle(6, 6, 3);
      g.fillStyle(0xd4a800); g.fillCircle(8, 8, 7);
      g.fillStyle(0xffd700); g.fillCircle(7, 7, 6);
      g.fillStyle(0xffec50); g.fillCircle(6, 6, 2);
    });

    // --- Door ---
    this._makeTexture('door', 48, 64, g => {
      // Frame
      g.fillStyle(0x8b6914); g.fillRect(0, 0, 48, 64);
      // Door panel
      g.fillStyle(0xa07820); g.fillRect(4, 4, 40, 56);
      // Inner panel
      g.fillStyle(0xb8920a); g.fillRect(8, 8, 32, 24); g.fillRect(8, 36, 32, 20);
      // Handle
      g.fillStyle(0xffd700); g.fillCircle(34, 36, 4);
      // Top arch
      g.fillStyle(0x8b6914); g.fillRect(4, 4, 40, 8);
      // Shine
      g.fillStyle(0xffeedd, 0.3); g.fillRect(10, 10, 8, 40);
    });

    // --- NPC ---
    this._makeTexture('npc', 24, 48, g => {
      // Body
      g.fillStyle(0x228b22); g.fillRect(4, 20, 16, 18);
      // Head
      g.fillStyle(0xffcc99); g.fillRect(4, 4, 16, 16);
      // Hair
      g.fillStyle(0x5c3317); g.fillRect(2, 2, 20, 6);
      // Arms
      g.fillStyle(0x228b22); g.fillRect(0, 22, 4, 12); g.fillRect(20, 22, 4, 12);
      // Legs
      g.fillStyle(0x444444); g.fillRect(4, 38, 6, 10); g.fillRect(14, 38, 6, 10);
      // Eyes
      g.fillStyle(0x000000); g.fillRect(7, 9, 3, 3); g.fillRect(14, 9, 3, 3);
      // Smile
      g.fillStyle(0xcc6644); g.fillRect(7, 15, 10, 2);
    });

    // --- Projectile: Princess Z (hairbrush) ---
    this._makeTexture('proj_princess', 14, 8, g => {
      g.fillStyle(0xff69b4); g.fillRect(0, 2, 10, 4);
      g.fillStyle(0xffffff);
      for (let i = 0; i < 4; i++) { g.fillRect(10 + i, 0, 1, 8); }
    });

    // --- Projectile: Selena (slash) ---
    this._makeTexture('proj_selena', 20, 6, g => {
      g.fillStyle(0xc0c0c0); g.fillRect(0, 1, 20, 4);
      g.fillStyle(0xffffff, 0.6); g.fillRect(0, 1, 20, 2);
    });

    // --- Projectile: Mofasuuu (magic fireball) ---
    this._makeTexture('proj_mofasuuu', 12, 12, g => {
      g.fillStyle(0x0000ff); g.fillCircle(6, 6, 6);
      g.fillStyle(0x8888ff); g.fillCircle(4, 4, 3);
      g.fillStyle(0xffffff, 0.5); g.fillCircle(3, 3, 1);
    });

    // --- Projectile: King Dragon (fireball) ---
    this._makeTexture('proj_king', 14, 10, g => {
      g.fillStyle(0xff4500); g.fillCircle(7, 5, 5);
      g.fillStyle(0xff8c00); g.fillCircle(6, 4, 3);
      g.fillStyle(0xffff00); g.fillCircle(5, 3, 1);
    });

    // --- Projectile: Ghost ---
    this._makeTexture('proj_ghost', 10, 10, g => {
      g.fillStyle(0x88aaff); g.fillCircle(5, 5, 5);
      g.fillStyle(0xccddff, 0.6); g.fillCircle(3, 3, 2);
    });

    // --- Gerbil ---
    this._makeTexture('gerbil', 16, 12, g => {
      g.fillStyle(0xc8a878); g.fillRect(0, 4, 12, 8);
      g.fillCircle(12, 6, 5);
      g.fillStyle(0xffc0cb); g.fillRect(2, 0, 4, 4);
      g.fillStyle(0x000000); g.fillCircle(13, 5, 1);
    });

    // --- Background (1x1 pixel, used for tinted rectangles) ---
    this._makeTexture('pixel', 1, 1, g => {
      g.fillStyle(0xffffff); g.fillRect(0, 0, 1, 1);
    });
  }
}
