export const GAME_CONFIG = {
  width: 1280,
  height: 720,
  gravity: 800,
  playerSpeed: 300,
  baseJumpVelocity: -580
};

export const CHARACTERS = {
  PRINCESS_Z: 'princess_z',
  SELENA: 'selena',
  MOFASUUU: 'mofasuuu',
  KING_DRAGON: 'king_dragon'
};

export const CHARACTER_DATA = {
  princess_z: {
    name: 'Princess Z',
    description: 'Throws hairbrushes with surprising force!',
    colors: { body: 0xff69b4, hair: 0xffff00, skin: 0xffcc99 },
    weapon: 'hairbrush',
    projectileKey: 'proj_princess',
    projectileColor: 0xff69b4,
    projectileDamage: 25,
    projectileSpeed: 400,
    projectileLifespan: 3000,
    special: {
      name: 'Gerbil Kingdom',
      description: 'Summons gerbils to attack enemies!',
      duration: 30000,
      cooldown: 60000
    }
  },
  selena: {
    name: 'Selena the Dragon Slayer',
    description: 'Wields a massive sword with deadly precision.',
    colors: { body: 0x4169e1, hair: 0x8b4513, skin: 0xffcc99 },
    weapon: 'sword',
    projectileKey: 'proj_selena',
    projectileColor: 0xc0c0c0,
    projectileDamage: 40,
    projectileSpeed: 350,
    projectileLifespan: 3000,
    special: {
      name: 'Ignite Sword',
      description: '10x damage for 30 seconds!',
      duration: 30000,
      cooldown: 60000
    }
  },
  mofasuuu: {
    name: 'Mofasuuu',
    description: 'Master wizard who commands magical fire.',
    colors: { body: 0x6a0dad, hair: 0x87ceeb, skin: 0xffcc99 },
    weapon: 'staff',
    projectileKey: 'proj_mofasuuu',
    projectileColor: 0x0000ff,
    projectileDamage: 20,
    projectileSpeed: 450,
    projectileLifespan: 3000,
    special: {
      name: 'Ring of Fire',
      description: 'Fires magic in all directions!',
      duration: 30000,
      cooldown: 60000
    }
  },
  king_dragon: {
    name: 'The King of all Dragons!',
    description: 'The mightiest dragon king who ever lived.',
    colors: { body: 0x8b0000, hair: 0xff4500, skin: 0xffa500 },
    weapon: 'fireball',
    projectileKey: 'proj_king',
    projectileColor: 0xff4500,
    projectileDamage: 25,
    projectileSpeed: 380,
    projectileLifespan: 3000,
    special: {
      name: 'Dragon Heal',
      description: 'Heals 50 HP instantly!',
      duration: 1,
      cooldown: 60000
    }
  }
};

export const UPGRADES = {
  jump: {
    name: 'Jump Boost',
    levels: [
      { cost: 0, bonus: 0, desc: 'Normal jump' },
      { cost: 10, bonus: 50, desc: '+50 jump velocity' },
      { cost: 25, bonus: 100, desc: '+100 jump velocity' },
      { cost: 50, bonus: 150, desc: '+150 jump velocity' },
      { cost: 100, bonus: 200, desc: '+200 jump velocity (MAX)' }
    ]
  },
  weapon: {
    name: 'Weapon Power',
    levels: [
      { cost: 0, bonus: 1, desc: 'Base damage' },
      { cost: 15, bonus: 1.5, desc: '1.5x damage' },
      { cost: 30, bonus: 2, desc: '2x damage' },
      { cost: 60, bonus: 3, desc: '3x damage' },
      { cost: 120, bonus: 5, desc: '5x damage (MAX)' }
    ]
  },
  armor: {
    name: 'Armour',
    levels: [
      { cost: 0, bonus: 0, desc: 'No armor' },
      { cost: 12, bonus: 0.1, desc: '10% damage reduction' },
      { cost: 25, bonus: 0.2, desc: '20% damage reduction' },
      { cost: 50, bonus: 0.35, desc: '35% damage reduction' },
      { cost: 100, bonus: 0.5, desc: '50% damage reduction (MAX)' }
    ]
  },
  skin: {
    name: 'Player Skin',
    levels: [
      { cost: 0, bonus: 0, desc: 'Default look' },
      { cost: 20, bonus: 1, desc: 'Shiny skin' },
      { cost: 40, bonus: 2, desc: 'Glowing skin' },
      { cost: 80, bonus: 3, desc: 'Rainbow skin' },
      { cost: 150, bonus: 4, desc: 'Legendary skin (MAX)' }
    ]
  }
};

export const LEVEL_COLORS = [
  { bg: 0x111111, platform: 0x222222, accent: 0x333333 },
  { bg: 0x121212, platform: 0x252525, accent: 0x383838 },
  { bg: 0x141418, platform: 0x28282e, accent: 0x3c3c44 },
  { bg: 0x16161e, platform: 0x2c2c38, accent: 0x414152 },
  { bg: 0x181826, platform: 0x302c42, accent: 0x48445e },
  { bg: 0x1a1a30, platform: 0x343060, accent: 0x504878 },
  { bg: 0x1c1a38, platform: 0x38306e, accent: 0x584e86 },
  { bg: 0x1e2040, platform: 0x3a3880, accent: 0x606098 },
  { bg: 0x202248, platform: 0x404090, accent: 0x6868a8 },
  { bg: 0x222450, platform: 0x4448a0, accent: 0x7070b8 },
  { bg: 0x243060, platform: 0x5060b0, accent: 0x8090c8 },
  { bg: 0x2a3870, platform: 0x6070c0, accent: 0x90a0d8 },
  { bg: 0x304090, platform: 0x7080d0, accent: 0xa0b0e8 },
  { bg: 0x3850a0, platform: 0x8090e0, accent: 0xb0c0f0 },
  { bg: 0x4060b0, platform: 0x90a0e8, accent: 0xc0d0f8 },
  { bg: 0x6040c0, platform: 0xa060e0, accent: 0xd080f8 },
  { bg: 0xa040d0, platform: 0xd040e0, accent: 0xff80ff },
  { bg: 0xd04080, platform: 0xff4080, accent: 0xff80a0 },
  { bg: 0xff8020, platform: 0xffb040, accent: 0xffd060 },
  { bg: 0xff1493, platform: 0x00ff00, accent: 0xffff00 }
];
