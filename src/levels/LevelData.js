export const LEVELS = [
  {
    id: 1,
    name: 'The Dark Beginning',
    worldWidth: 3200,
    bgColorIndex: 0,
    platforms: [
      { x: 0, y: 680, width: 3200, tileCount: 50 },
      { x: 300, y: 560, width: 256, tileCount: 4 },
      { x: 600, y: 480, width: 192, tileCount: 3 },
      { x: 900, y: 560, width: 256, tileCount: 4 },
      { x: 1200, y: 480, width: 320, tileCount: 5 },
      { x: 1600, y: 560, width: 256, tileCount: 4 },
      { x: 1900, y: 480, width: 192, tileCount: 3 },
      { x: 2200, y: 560, width: 256, tileCount: 4 },
      { x: 2600, y: 480, width: 320, tileCount: 5 }
    ],
    enemies: [
      { type: 'monster', x: 700, y: 650 },
      { type: 'monster', x: 1100, y: 650 },
      { type: 'monster', x: 1500, y: 650 },
      { type: 'waterGhost', x: 900, y: 400 }
    ],
    barrels: [
      { x: 400, y: 640 },
      { x: 800, y: 640 },
      { x: 1300, y: 640 }
    ],
    coins: [
      { x: 350, y: 530 },
      { x: 650, y: 450 },
      { x: 1250, y: 450 },
      { x: 1650, y: 530 },
      { x: 2000, y: 650 }
    ],
    npcs: [
      { x: 200, y: 640, dialog: ['Welcome to HDTwist!', 'Use WASD to move and jump.', 'Press SPACE to attack!', 'Find the door to continue.'] }
    ],
    doorX: 3050,
    hasBoss: false,
    bossX: 0,
    difficulty: 1
  },
  {
    id: 2,
    name: 'Shadows Deeper',
    worldWidth: 3400,
    bgColorIndex: 1,
    platforms: [
      { x: 0, y: 680, width: 3400, tileCount: 54 },
      { x: 250, y: 560, width: 256, tileCount: 4 },
      { x: 550, y: 480, width: 192, tileCount: 3 },
      { x: 800, y: 400, width: 192, tileCount: 3 },
      { x: 1100, y: 480, width: 256, tileCount: 4 },
      { x: 1400, y: 560, width: 192, tileCount: 3 },
      { x: 1700, y: 480, width: 256, tileCount: 4 },
      { x: 2000, y: 400, width: 192, tileCount: 3 },
      { x: 2300, y: 480, width: 256, tileCount: 4 },
      { x: 2700, y: 560, width: 320, tileCount: 5 },
      { x: 3000, y: 480, width: 192, tileCount: 3 }
    ],
    enemies: [
      { type: 'monster', x: 600, y: 650 },
      { type: 'monster', x: 900, y: 650 },
      { type: 'monster', x: 1200, y: 650 },
      { type: 'waterGhost', x: 800, y: 370 },
      { type: 'waterGhost', x: 1700, y: 370 },
      { type: 'monster', x: 2000, y: 650 }
    ],
    barrels: [
      { x: 450, y: 640 },
      { x: 1000, y: 640 },
      { x: 1600, y: 640 }
    ],
    coins: [
      { x: 300, y: 530 },
      { x: 600, y: 450 },
      { x: 850, y: 370 },
      { x: 1450, y: 530 },
      { x: 1800, y: 370 },
      { x: 2350, y: 450 },
      { x: 2750, y: 530 }
    ],
    npcs: [
      { x: 150, y: 640, dialog: ['The darkness grows here...', 'Barrels give coins when you jump over them!', 'Buy upgrades at the shop door.'] }
    ],
    doorX: 3250,
    hasBoss: false,
    bossX: 0,
    difficulty: 2
  },
  {
    id: 3,
    name: 'The Abyss',
    worldWidth: 3600,
    bgColorIndex: 2,
    platforms: [
      { x: 0, y: 680, width: 3600, tileCount: 57 },
      { x: 200, y: 560, width: 192, tileCount: 3 },
      { x: 500, y: 480, width: 192, tileCount: 3 },
      { x: 750, y: 400, width: 256, tileCount: 4 },
      { x: 1050, y: 320, width: 192, tileCount: 3 },
      { x: 1350, y: 400, width: 192, tileCount: 3 },
      { x: 1650, y: 480, width: 256, tileCount: 4 },
      { x: 1950, y: 400, width: 192, tileCount: 3 },
      { x: 2250, y: 480, width: 256, tileCount: 4 },
      { x: 2600, y: 400, width: 192, tileCount: 3 },
      { x: 2900, y: 480, width: 256, tileCount: 4 },
      { x: 3200, y: 560, width: 192, tileCount: 3 }
    ],
    enemies: [
      { type: 'monster', x: 500, y: 650 },
      { type: 'monster', x: 800, y: 650 },
      { type: 'waterGhost', x: 1050, y: 290 },
      { type: 'monster', x: 1200, y: 650 },
      { type: 'waterGhost', x: 1650, y: 370 },
      { type: 'monster', x: 1900, y: 650 },
      { type: 'waterGhost', x: 2600, y: 370 },
      { type: 'monster', x: 2800, y: 650 }
    ],
    barrels: [
      { x: 350, y: 640 },
      { x: 900, y: 640 },
      { x: 1500, y: 640 },
      { x: 2100, y: 640 }
    ],
    coins: [
      { x: 250, y: 530 },
      { x: 550, y: 450 },
      { x: 800, y: 370 },
      { x: 1100, y: 290 },
      { x: 1700, y: 450 },
      { x: 2000, y: 370 },
      { x: 2650, y: 370 },
      { x: 2950, y: 450 }
    ],
    npcs: [
      { x: 100, y: 640, dialog: ['Beware the Water Ghosts!', 'They can shoot back at you.', 'Duck with S to avoid projectiles.'] }
    ],
    doorX: 3450,
    hasBoss: false,
    bossX: 0,
    difficulty: 3
  },
  {
    id: 4,
    name: 'Night Falls',
    worldWidth: 3800,
    bgColorIndex: 3,
    platforms: [
      { x: 0, y: 680, width: 3800, tileCount: 60 },
      { x: 200, y: 580, width: 192, tileCount: 3 },
      { x: 450, y: 500, width: 192, tileCount: 3 },
      { x: 700, y: 420, width: 256, tileCount: 4 },
      { x: 1000, y: 340, width: 192, tileCount: 3 },
      { x: 1300, y: 420, width: 192, tileCount: 3 },
      { x: 1600, y: 500, width: 256, tileCount: 4 },
      { x: 1900, y: 420, width: 192, tileCount: 3 },
      { x: 2200, y: 340, width: 256, tileCount: 4 },
      { x: 2500, y: 420, width: 192, tileCount: 3 },
      { x: 2800, y: 500, width: 256, tileCount: 4 },
      { x: 3150, y: 420, width: 192, tileCount: 3 },
      { x: 3400, y: 500, width: 192, tileCount: 3 }
    ],
    enemies: [
      { type: 'monster', x: 400, y: 650 },
      { type: 'monster', x: 700, y: 650 },
      { type: 'waterGhost', x: 1000, y: 310 },
      { type: 'monster', x: 1350, y: 650 },
      { type: 'waterGhost', x: 1600, y: 370 },
      { type: 'monster', x: 1850, y: 650 },
      { type: 'waterGhost', x: 2200, y: 310 },
      { type: 'monster', x: 2500, y: 650 },
      { type: 'monster', x: 2800, y: 650 }
    ],
    barrels: [
      { x: 300, y: 640 },
      { x: 900, y: 640 },
      { x: 1500, y: 640 },
      { x: 2100, y: 640 },
      { x: 2700, y: 640 }
    ],
    coins: [
      { x: 250, y: 550 },
      { x: 500, y: 470 },
      { x: 750, y: 390 },
      { x: 1050, y: 310 },
      { x: 1350, y: 390 },
      { x: 1650, y: 470 },
      { x: 1950, y: 390 },
      { x: 2250, y: 310 },
      { x: 2550, y: 390 },
      { x: 2850, y: 470 }
    ],
    npcs: [
      { x: 100, y: 640, dialog: ['Use your special power with E!', 'Each character has a unique ability.', 'The boss at level 5 is fierce!'] }
    ],
    doorX: 3650,
    hasBoss: false,
    bossX: 0,
    difficulty: 4
  },
  {
    id: 5,
    name: 'Boss of the Dark',
    worldWidth: 4000,
    bgColorIndex: 4,
    platforms: [
      { x: 0, y: 680, width: 4000, tileCount: 63 },
      { x: 300, y: 580, width: 192, tileCount: 3 },
      { x: 600, y: 500, width: 256, tileCount: 4 },
      { x: 900, y: 420, width: 192, tileCount: 3 },
      { x: 1200, y: 340, width: 256, tileCount: 4 },
      { x: 1550, y: 420, width: 192, tileCount: 3 },
      { x: 1850, y: 500, width: 256, tileCount: 4 },
      { x: 2200, y: 420, width: 192, tileCount: 3 },
      { x: 2550, y: 340, width: 256, tileCount: 4 },
      { x: 2900, y: 420, width: 256, tileCount: 4 },
      { x: 3300, y: 500, width: 320, tileCount: 5 }
    ],
    enemies: [
      { type: 'monster', x: 500, y: 650 },
      { type: 'monster', x: 800, y: 650 },
      { type: 'waterGhost', x: 1200, y: 310 },
      { type: 'waterGhost', x: 1850, y: 370 },
      { type: 'monster', x: 2000, y: 650 },
      { type: 'monster', x: 2300, y: 650 },
      { type: 'waterGhost', x: 2550, y: 310 }
    ],
    barrels: [
      { x: 400, y: 640 },
      { x: 1000, y: 640 },
      { x: 1700, y: 640 },
      { x: 2400, y: 640 }
    ],
    coins: [
      { x: 350, y: 550 },
      { x: 650, y: 470 },
      { x: 950, y: 390 },
      { x: 1250, y: 310 },
      { x: 1600, y: 390 },
      { x: 1900, y: 470 },
      { x: 2250, y: 390 },
      { x: 2600, y: 310 },
      { x: 2950, y: 390 }
    ],
    npcs: [
      { x: 150, y: 640, dialog: ['A powerful boss awaits ahead!', 'Make sure to upgrade your gear.', 'The boss has two phases!', 'Good luck, brave warrior!'] }
    ],
    doorX: 3850,
    hasBoss: true,
    bossX: 3500,
    difficulty: 5
  },
  {
    id: 6,
    name: 'Twilight Caverns',
    worldWidth: 4000,
    bgColorIndex: 5,
    platforms: [
      { x: 0, y: 680, width: 4000, tileCount: 63 },
      { x: 250, y: 580, width: 192, tileCount: 3 },
      { x: 500, y: 500, width: 256, tileCount: 4 },
      { x: 800, y: 420, width: 192, tileCount: 3 },
      { x: 1100, y: 340, width: 256, tileCount: 4 },
      { x: 1450, y: 260, width: 192, tileCount: 3 },
      { x: 1750, y: 340, width: 256, tileCount: 4 },
      { x: 2100, y: 420, width: 192, tileCount: 3 },
      { x: 2400, y: 340, width: 256, tileCount: 4 },
      { x: 2750, y: 420, width: 192, tileCount: 3 },
      { x: 3050, y: 500, width: 256, tileCount: 4 },
      { x: 3400, y: 420, width: 192, tileCount: 3 }
    ],
    enemies: [
      { type: 'monster', x: 400, y: 650 },
      { type: 'monster', x: 700, y: 650 },
      { type: 'waterGhost', x: 1100, y: 310 },
      { type: 'waterGhost', x: 1450, y: 230 },
      { type: 'monster', x: 1600, y: 650 },
      { type: 'monster', x: 1900, y: 650 },
      { type: 'waterGhost', x: 2400, y: 310 },
      { type: 'monster', x: 2600, y: 650 },
      { type: 'monster', x: 2900, y: 650 }
    ],
    barrels: [
      { x: 350, y: 640 },
      { x: 950, y: 640 },
      { x: 1650, y: 640 },
      { x: 2300, y: 640 },
      { x: 3000, y: 640 }
    ],
    coins: [
      { x: 300, y: 550 },
      { x: 550, y: 470 },
      { x: 850, y: 390 },
      { x: 1150, y: 310 },
      { x: 1500, y: 230 },
      { x: 1800, y: 310 },
      { x: 2150, y: 390 },
      { x: 2450, y: 310 },
      { x: 2800, y: 390 },
      { x: 3100, y: 470 }
    ],
    npcs: [
      { x: 100, y: 640, dialog: ['The caverns hold many secrets.', 'Coins can be used to upgrade at the shop.', 'Press E to use your special ability!'] }
    ],
    doorX: 3800,
    hasBoss: false,
    bossX: 0,
    difficulty: 6
  },
  {
    id: 7,
    name: 'Purple Haze',
    worldWidth: 4200,
    bgColorIndex: 6,
    platforms: [
      { x: 0, y: 680, width: 4200, tileCount: 66 },
      { x: 200, y: 600, width: 192, tileCount: 3 },
      { x: 500, y: 520, width: 256, tileCount: 4 },
      { x: 800, y: 440, width: 192, tileCount: 3 },
      { x: 1100, y: 360, width: 192, tileCount: 3 },
      { x: 1400, y: 280, width: 256, tileCount: 4 },
      { x: 1750, y: 360, width: 192, tileCount: 3 },
      { x: 2050, y: 440, width: 256, tileCount: 4 },
      { x: 2400, y: 360, width: 192, tileCount: 3 },
      { x: 2700, y: 280, width: 256, tileCount: 4 },
      { x: 3050, y: 360, width: 192, tileCount: 3 },
      { x: 3350, y: 440, width: 256, tileCount: 4 },
      { x: 3700, y: 360, width: 192, tileCount: 3 }
    ],
    enemies: [
      { type: 'monster', x: 350, y: 650 },
      { type: 'waterGhost', x: 800, y: 410 },
      { type: 'monster', x: 950, y: 650 },
      { type: 'waterGhost', x: 1400, y: 250 },
      { type: 'monster', x: 1550, y: 650 },
      { type: 'waterGhost', x: 2050, y: 410 },
      { type: 'monster', x: 2200, y: 650 },
      { type: 'waterGhost', x: 2700, y: 250 },
      { type: 'monster', x: 2850, y: 650 },
      { type: 'monster', x: 3200, y: 650 }
    ],
    barrels: [
      { x: 400, y: 640 },
      { x: 1050, y: 640 },
      { x: 1800, y: 640 },
      { x: 2500, y: 640 },
      { x: 3150, y: 640 }
    ],
    coins: [
      { x: 250, y: 570 },
      { x: 550, y: 490 },
      { x: 850, y: 410 },
      { x: 1150, y: 330 },
      { x: 1450, y: 250 },
      { x: 1800, y: 330 },
      { x: 2100, y: 410 },
      { x: 2450, y: 330 },
      { x: 2750, y: 250 },
      { x: 3100, y: 330 },
      { x: 3400, y: 410 }
    ],
    npcs: [
      { x: 100, y: 640, dialog: ['The purple mist clouds vision here.', 'Water Ghosts lurk in the fog.', 'Your armor can reduce damage taken!'] }
    ],
    doorX: 4000,
    hasBoss: false,
    bossX: 0,
    difficulty: 7
  },
  {
    id: 8,
    name: 'Mystic Depths',
    worldWidth: 4400,
    bgColorIndex: 7,
    platforms: [
      { x: 0, y: 680, width: 4400, tileCount: 69 },
      { x: 200, y: 600, width: 192, tileCount: 3 },
      { x: 480, y: 520, width: 192, tileCount: 3 },
      { x: 760, y: 440, width: 256, tileCount: 4 },
      { x: 1060, y: 360, width: 192, tileCount: 3 },
      { x: 1360, y: 280, width: 192, tileCount: 3 },
      { x: 1640, y: 360, width: 256, tileCount: 4 },
      { x: 1940, y: 440, width: 192, tileCount: 3 },
      { x: 2220, y: 360, width: 256, tileCount: 4 },
      { x: 2560, y: 280, width: 192, tileCount: 3 },
      { x: 2840, y: 360, width: 256, tileCount: 4 },
      { x: 3180, y: 440, width: 192, tileCount: 3 },
      { x: 3460, y: 360, width: 256, tileCount: 4 },
      { x: 3800, y: 440, width: 192, tileCount: 3 }
    ],
    enemies: [
      { type: 'monster', x: 350, y: 650 },
      { type: 'waterGhost', x: 760, y: 410 },
      { type: 'monster', x: 900, y: 650 },
      { type: 'waterGhost', x: 1360, y: 250 },
      { type: 'monster', x: 1500, y: 650 },
      { type: 'waterGhost', x: 1940, y: 410 },
      { type: 'monster', x: 2100, y: 650 },
      { type: 'waterGhost', x: 2560, y: 250 },
      { type: 'monster', x: 2700, y: 650 },
      { type: 'waterGhost', x: 3180, y: 410 },
      { type: 'monster', x: 3350, y: 650 }
    ],
    barrels: [
      { x: 350, y: 640 },
      { x: 1000, y: 640 },
      { x: 1700, y: 640 },
      { x: 2400, y: 640 },
      { x: 3100, y: 640 }
    ],
    coins: [
      { x: 250, y: 570 },
      { x: 530, y: 490 },
      { x: 810, y: 410 },
      { x: 1110, y: 330 },
      { x: 1410, y: 250 },
      { x: 1690, y: 330 },
      { x: 1990, y: 410 },
      { x: 2270, y: 330 },
      { x: 2610, y: 250 },
      { x: 2890, y: 330 },
      { x: 3230, y: 410 },
      { x: 3510, y: 330 }
    ],
    npcs: [
      { x: 100, y: 640, dialog: ['Deep in the mystic realm...', 'Weapon upgrades greatly increase damage!', 'The King of Dragons heals himself with E!'] }
    ],
    doorX: 4200,
    hasBoss: false,
    bossX: 0,
    difficulty: 8
  },
  {
    id: 9,
    name: 'Storm Rising',
    worldWidth: 4600,
    bgColorIndex: 8,
    platforms: [
      { x: 0, y: 680, width: 4600, tileCount: 72 },
      { x: 200, y: 600, width: 192, tileCount: 3 },
      { x: 500, y: 520, width: 192, tileCount: 3 },
      { x: 800, y: 440, width: 192, tileCount: 3 },
      { x: 1100, y: 360, width: 192, tileCount: 3 },
      { x: 1400, y: 280, width: 192, tileCount: 3 },
      { x: 1700, y: 200, width: 192, tileCount: 3 },
      { x: 2000, y: 280, width: 256, tileCount: 4 },
      { x: 2350, y: 360, width: 192, tileCount: 3 },
      { x: 2650, y: 280, width: 192, tileCount: 3 },
      { x: 2950, y: 360, width: 256, tileCount: 4 },
      { x: 3300, y: 440, width: 192, tileCount: 3 },
      { x: 3600, y: 360, width: 256, tileCount: 4 },
      { x: 3950, y: 440, width: 192, tileCount: 3 },
      { x: 4200, y: 520, width: 192, tileCount: 3 }
    ],
    enemies: [
      { type: 'monster', x: 400, y: 650 },
      { type: 'waterGhost', x: 800, y: 410 },
      { type: 'monster', x: 1000, y: 650 },
      { type: 'waterGhost', x: 1400, y: 250 },
      { type: 'waterGhost', x: 1700, y: 170 },
      { type: 'monster', x: 1900, y: 650 },
      { type: 'waterGhost', x: 2650, y: 250 },
      { type: 'monster', x: 2800, y: 650 },
      { type: 'waterGhost', x: 3300, y: 410 },
      { type: 'monster', x: 3500, y: 650 },
      { type: 'monster', x: 3800, y: 650 }
    ],
    barrels: [
      { x: 350, y: 640 },
      { x: 950, y: 640 },
      { x: 1650, y: 640 },
      { x: 2450, y: 640 },
      { x: 3200, y: 640 }
    ],
    coins: [
      { x: 250, y: 570 }, { x: 550, y: 490 }, { x: 850, y: 410 },
      { x: 1150, y: 330 }, { x: 1450, y: 250 }, { x: 1750, y: 170 },
      { x: 2050, y: 250 }, { x: 2400, y: 330 }, { x: 2700, y: 250 },
      { x: 3000, y: 330 }, { x: 3350, y: 410 }, { x: 3650, y: 330 }
    ],
    npcs: [
      { x: 100, y: 640, dialog: ['The storm tests the brave!', 'Jump upgrade lets you reach higher platforms.', 'Selena\'s fire sword shreds through foes!'] }
    ],
    doorX: 4450,
    hasBoss: false,
    bossX: 0,
    difficulty: 9
  },
  {
    id: 10,
    name: 'Boss of Twilight',
    worldWidth: 4600,
    bgColorIndex: 9,
    platforms: [
      { x: 0, y: 680, width: 4600, tileCount: 72 },
      { x: 300, y: 600, width: 192, tileCount: 3 },
      { x: 600, y: 520, width: 256, tileCount: 4 },
      { x: 950, y: 440, width: 192, tileCount: 3 },
      { x: 1250, y: 360, width: 256, tileCount: 4 },
      { x: 1600, y: 280, width: 192, tileCount: 3 },
      { x: 1900, y: 360, width: 256, tileCount: 4 },
      { x: 2250, y: 440, width: 192, tileCount: 3 },
      { x: 2550, y: 360, width: 256, tileCount: 4 },
      { x: 2900, y: 280, width: 192, tileCount: 3 },
      { x: 3200, y: 360, width: 256, tileCount: 4 },
      { x: 3600, y: 440, width: 320, tileCount: 5 }
    ],
    enemies: [
      { type: 'monster', x: 500, y: 650 },
      { type: 'waterGhost', x: 950, y: 410 },
      { type: 'monster', x: 1100, y: 650 },
      { type: 'waterGhost', x: 1600, y: 250 },
      { type: 'monster', x: 1750, y: 650 },
      { type: 'waterGhost', x: 2250, y: 410 },
      { type: 'monster', x: 2400, y: 650 },
      { type: 'waterGhost', x: 2900, y: 250 },
      { type: 'monster', x: 3050, y: 650 }
    ],
    barrels: [
      { x: 400, y: 640 }, { x: 1100, y: 640 }, { x: 1900, y: 640 },
      { x: 2600, y: 640 }, { x: 3300, y: 640 }
    ],
    coins: [
      { x: 350, y: 570 }, { x: 650, y: 490 }, { x: 1000, y: 410 },
      { x: 1300, y: 330 }, { x: 1650, y: 250 }, { x: 1950, y: 330 },
      { x: 2300, y: 410 }, { x: 2600, y: 330 }, { x: 2950, y: 250 },
      { x: 3250, y: 330 }
    ],
    npcs: [
      { x: 150, y: 640, dialog: ['The twilight boss commands darkness!', 'It has two attack phases.', 'Stay agile and use your special!'] }
    ],
    doorX: 4450,
    hasBoss: true,
    bossX: 4100,
    difficulty: 10
  },
  {
    id: 11,
    name: 'Azure Reaches',
    worldWidth: 4800,
    bgColorIndex: 10,
    platforms: [
      { x: 0, y: 680, width: 4800, tileCount: 75 },
      { x: 250, y: 580, width: 192, tileCount: 3 },
      { x: 550, y: 500, width: 256, tileCount: 4 },
      { x: 900, y: 420, width: 192, tileCount: 3 },
      { x: 1200, y: 340, width: 192, tileCount: 3 },
      { x: 1500, y: 260, width: 256, tileCount: 4 },
      { x: 1850, y: 180, width: 192, tileCount: 3 },
      { x: 2150, y: 260, width: 256, tileCount: 4 },
      { x: 2500, y: 340, width: 192, tileCount: 3 },
      { x: 2800, y: 260, width: 256, tileCount: 4 },
      { x: 3150, y: 340, width: 192, tileCount: 3 },
      { x: 3450, y: 420, width: 256, tileCount: 4 },
      { x: 3800, y: 340, width: 192, tileCount: 3 },
      { x: 4100, y: 420, width: 256, tileCount: 4 }
    ],
    enemies: [
      { type: 'monster', x: 400, y: 650 },
      { type: 'waterGhost', x: 900, y: 390 },
      { type: 'monster', x: 1050, y: 650 },
      { type: 'waterGhost', x: 1500, y: 230 },
      { type: 'waterGhost', x: 1850, y: 150 },
      { type: 'monster', x: 2000, y: 650 },
      { type: 'waterGhost', x: 2800, y: 230 },
      { type: 'monster', x: 2950, y: 650 },
      { type: 'waterGhost', x: 3450, y: 390 },
      { type: 'monster', x: 3600, y: 650 },
      { type: 'monster', x: 3900, y: 650 }
    ],
    barrels: [
      { x: 350, y: 640 }, { x: 1050, y: 640 }, { x: 1800, y: 640 },
      { x: 2600, y: 640 }, { x: 3350, y: 640 }, { x: 4050, y: 640 }
    ],
    coins: [
      { x: 300, y: 550 }, { x: 600, y: 470 }, { x: 950, y: 390 },
      { x: 1250, y: 310 }, { x: 1550, y: 230 }, { x: 1900, y: 150 },
      { x: 2200, y: 230 }, { x: 2550, y: 310 }, { x: 2850, y: 230 },
      { x: 3200, y: 310 }, { x: 3500, y: 390 }, { x: 3850, y: 310 }
    ],
    npcs: [
      { x: 100, y: 640, dialog: ['The azure sky beckons!', 'Higher platforms mean more danger.', 'Mofasuuu\'s ring of fire is devastating!'] }
    ],
    doorX: 4650,
    hasBoss: false,
    bossX: 0,
    difficulty: 11
  },
  {
    id: 12,
    name: 'Crystal Caverns',
    worldWidth: 5000,
    bgColorIndex: 11,
    platforms: [
      { x: 0, y: 680, width: 5000, tileCount: 79 },
      { x: 200, y: 580, width: 192, tileCount: 3 },
      { x: 500, y: 500, width: 192, tileCount: 3 },
      { x: 800, y: 420, width: 256, tileCount: 4 },
      { x: 1150, y: 340, width: 192, tileCount: 3 },
      { x: 1450, y: 260, width: 192, tileCount: 3 },
      { x: 1750, y: 180, width: 256, tileCount: 4 },
      { x: 2100, y: 260, width: 192, tileCount: 3 },
      { x: 2400, y: 340, width: 256, tileCount: 4 },
      { x: 2750, y: 260, width: 192, tileCount: 3 },
      { x: 3050, y: 180, width: 256, tileCount: 4 },
      { x: 3400, y: 260, width: 192, tileCount: 3 },
      { x: 3700, y: 340, width: 256, tileCount: 4 },
      { x: 4050, y: 420, width: 192, tileCount: 3 },
      { x: 4350, y: 500, width: 256, tileCount: 4 }
    ],
    enemies: [
      { type: 'monster', x: 350, y: 650 },
      { type: 'waterGhost', x: 800, y: 390 },
      { type: 'monster', x: 950, y: 650 },
      { type: 'waterGhost', x: 1450, y: 230 },
      { type: 'waterGhost', x: 1750, y: 150 },
      { type: 'monster', x: 1900, y: 650 },
      { type: 'waterGhost', x: 3050, y: 150 },
      { type: 'monster', x: 3200, y: 650 },
      { type: 'waterGhost', x: 3700, y: 310 },
      { type: 'monster', x: 3850, y: 650 },
      { type: 'monster', x: 4150, y: 650 }
    ],
    barrels: [
      { x: 300, y: 640 }, { x: 950, y: 640 }, { x: 1650, y: 640 },
      { x: 2500, y: 640 }, { x: 3300, y: 640 }, { x: 4200, y: 640 }
    ],
    coins: [
      { x: 250, y: 550 }, { x: 550, y: 470 }, { x: 850, y: 390 },
      { x: 1200, y: 310 }, { x: 1500, y: 230 }, { x: 1800, y: 150 },
      { x: 2150, y: 230 }, { x: 2450, y: 310 }, { x: 2800, y: 230 },
      { x: 3100, y: 150 }, { x: 3450, y: 230 }, { x: 3750, y: 310 },
      { x: 4100, y: 390 }, { x: 4400, y: 470 }
    ],
    npcs: [
      { x: 100, y: 640, dialog: ['Crystals shine in the darkness!', 'The Princess summons gerbils to fight!', 'Stack upgrades for max power!'] }
    ],
    doorX: 4800,
    hasBoss: false,
    bossX: 0,
    difficulty: 12
  },
  {
    id: 13,
    name: 'The Bridge',
    worldWidth: 5000,
    bgColorIndex: 12,
    platforms: [
      { x: 0, y: 680, width: 5000, tileCount: 79 },
      { x: 300, y: 600, width: 192, tileCount: 3 },
      { x: 600, y: 520, width: 256, tileCount: 4 },
      { x: 950, y: 440, width: 192, tileCount: 3 },
      { x: 1250, y: 360, width: 256, tileCount: 4 },
      { x: 1600, y: 280, width: 192, tileCount: 3 },
      { x: 1900, y: 200, width: 256, tileCount: 4 },
      { x: 2250, y: 280, width: 192, tileCount: 3 },
      { x: 2550, y: 360, width: 256, tileCount: 4 },
      { x: 2900, y: 280, width: 192, tileCount: 3 },
      { x: 3200, y: 200, width: 256, tileCount: 4 },
      { x: 3550, y: 280, width: 192, tileCount: 3 },
      { x: 3850, y: 360, width: 256, tileCount: 4 },
      { x: 4200, y: 440, width: 192, tileCount: 3 },
      { x: 4500, y: 520, width: 192, tileCount: 3 }
    ],
    enemies: [
      { type: 'monster', x: 450, y: 650 },
      { type: 'waterGhost', x: 950, y: 410 },
      { type: 'monster', x: 1100, y: 650 },
      { type: 'waterGhost', x: 1600, y: 250 },
      { type: 'waterGhost', x: 1900, y: 170 },
      { type: 'monster', x: 2050, y: 650 },
      { type: 'waterGhost', x: 3200, y: 170 },
      { type: 'monster', x: 3350, y: 650 },
      { type: 'waterGhost', x: 3850, y: 330 },
      { type: 'monster', x: 4000, y: 650 },
      { type: 'monster', x: 4300, y: 650 }
    ],
    barrels: [
      { x: 350, y: 640 }, { x: 1050, y: 640 }, { x: 1750, y: 640 },
      { x: 2600, y: 640 }, { x: 3450, y: 640 }, { x: 4250, y: 640 }
    ],
    coins: [
      { x: 350, y: 570 }, { x: 650, y: 490 }, { x: 1000, y: 410 },
      { x: 1300, y: 330 }, { x: 1650, y: 250 }, { x: 1950, y: 170 },
      { x: 2300, y: 250 }, { x: 2600, y: 330 }, { x: 2950, y: 250 },
      { x: 3250, y: 170 }, { x: 3600, y: 250 }, { x: 3900, y: 330 },
      { x: 4250, y: 410 }, { x: 4550, y: 490 }
    ],
    npcs: [
      { x: 150, y: 640, dialog: ['The bridge connects two worlds.', 'Enemies grow more powerful here.', 'Keep your HP high for the challenges ahead!'] }
    ],
    doorX: 4800,
    hasBoss: false,
    bossX: 0,
    difficulty: 13
  },
  {
    id: 14,
    name: 'Sky Fortress',
    worldWidth: 5200,
    bgColorIndex: 13,
    platforms: [
      { x: 0, y: 680, width: 5200, tileCount: 82 },
      { x: 250, y: 580, width: 256, tileCount: 4 },
      { x: 600, y: 480, width: 192, tileCount: 3 },
      { x: 900, y: 380, width: 256, tileCount: 4 },
      { x: 1250, y: 300, width: 192, tileCount: 3 },
      { x: 1550, y: 220, width: 256, tileCount: 4 },
      { x: 1900, y: 300, width: 192, tileCount: 3 },
      { x: 2200, y: 380, width: 256, tileCount: 4 },
      { x: 2550, y: 300, width: 192, tileCount: 3 },
      { x: 2850, y: 220, width: 256, tileCount: 4 },
      { x: 3200, y: 300, width: 192, tileCount: 3 },
      { x: 3500, y: 380, width: 256, tileCount: 4 },
      { x: 3850, y: 300, width: 192, tileCount: 3 },
      { x: 4150, y: 380, width: 256, tileCount: 4 },
      { x: 4500, y: 460, width: 192, tileCount: 3 }
    ],
    enemies: [
      { type: 'monster', x: 400, y: 650 },
      { type: 'waterGhost', x: 900, y: 350 },
      { type: 'monster', x: 1050, y: 650 },
      { type: 'waterGhost', x: 1550, y: 190 },
      { type: 'monster', x: 1700, y: 650 },
      { type: 'waterGhost', x: 2200, y: 350 },
      { type: 'monster', x: 2350, y: 650 },
      { type: 'waterGhost', x: 2850, y: 190 },
      { type: 'monster', x: 3000, y: 650 },
      { type: 'waterGhost', x: 3500, y: 350 },
      { type: 'monster', x: 3650, y: 650 },
      { type: 'monster', x: 3950, y: 650 }
    ],
    barrels: [
      { x: 350, y: 640 }, { x: 1050, y: 640 }, { x: 1800, y: 640 },
      { x: 2600, y: 640 }, { x: 3400, y: 640 }, { x: 4200, y: 640 }
    ],
    coins: [
      { x: 300, y: 550 }, { x: 650, y: 450 }, { x: 950, y: 350 },
      { x: 1300, y: 270 }, { x: 1600, y: 190 }, { x: 1950, y: 270 },
      { x: 2250, y: 350 }, { x: 2600, y: 270 }, { x: 2900, y: 190 },
      { x: 3250, y: 270 }, { x: 3550, y: 350 }, { x: 3900, y: 270 },
      { x: 4200, y: 350 }, { x: 4550, y: 430 }
    ],
    npcs: [
      { x: 100, y: 640, dialog: ['Welcome to the Sky Fortress!', 'Two more bosses before the final battle.', 'Max out your upgrades before the end!'] }
    ],
    doorX: 5000,
    hasBoss: false,
    bossX: 0,
    difficulty: 14
  },
  {
    id: 15,
    name: 'Boss of the Skies',
    worldWidth: 5200,
    bgColorIndex: 14,
    platforms: [
      { x: 0, y: 680, width: 5200, tileCount: 82 },
      { x: 300, y: 600, width: 256, tileCount: 4 },
      { x: 700, y: 500, width: 192, tileCount: 3 },
      { x: 1050, y: 400, width: 256, tileCount: 4 },
      { x: 1450, y: 300, width: 192, tileCount: 3 },
      { x: 1750, y: 220, width: 256, tileCount: 4 },
      { x: 2150, y: 300, width: 192, tileCount: 3 },
      { x: 2450, y: 400, width: 256, tileCount: 4 },
      { x: 2800, y: 300, width: 192, tileCount: 3 },
      { x: 3100, y: 220, width: 256, tileCount: 4 },
      { x: 3500, y: 300, width: 192, tileCount: 3 },
      { x: 3800, y: 400, width: 320, tileCount: 5 }
    ],
    enemies: [
      { type: 'monster', x: 500, y: 650 },
      { type: 'waterGhost', x: 1050, y: 370 },
      { type: 'monster', x: 1200, y: 650 },
      { type: 'waterGhost', x: 1750, y: 190 },
      { type: 'monster', x: 1900, y: 650 },
      { type: 'waterGhost', x: 2450, y: 370 },
      { type: 'monster', x: 2600, y: 650 },
      { type: 'waterGhost', x: 3100, y: 190 },
      { type: 'monster', x: 3250, y: 650 }
    ],
    barrels: [
      { x: 450, y: 640 }, { x: 1200, y: 640 }, { x: 2050, y: 640 },
      { x: 2900, y: 640 }, { x: 3650, y: 640 }
    ],
    coins: [
      { x: 350, y: 570 }, { x: 750, y: 470 }, { x: 1100, y: 370 },
      { x: 1500, y: 270 }, { x: 1800, y: 190 }, { x: 2200, y: 270 },
      { x: 2500, y: 370 }, { x: 2850, y: 270 }, { x: 3150, y: 190 },
      { x: 3550, y: 270 }, { x: 3850, y: 370 }
    ],
    npcs: [
      { x: 150, y: 640, dialog: ['The sky boss commands the heavens!', 'Use all your abilities!', 'Almost at the final stretch!'] }
    ],
    doorX: 5000,
    hasBoss: true,
    bossX: 4600,
    difficulty: 15
  },
  {
    id: 16,
    name: 'Neon Wastes',
    worldWidth: 5400,
    bgColorIndex: 15,
    platforms: [
      { x: 0, y: 680, width: 5400, tileCount: 85 },
      { x: 200, y: 580, width: 256, tileCount: 4 },
      { x: 600, y: 480, width: 192, tileCount: 3 },
      { x: 950, y: 380, width: 256, tileCount: 4 },
      { x: 1350, y: 280, width: 192, tileCount: 3 },
      { x: 1700, y: 200, width: 256, tileCount: 4 },
      { x: 2100, y: 280, width: 192, tileCount: 3 },
      { x: 2450, y: 380, width: 256, tileCount: 4 },
      { x: 2850, y: 280, width: 192, tileCount: 3 },
      { x: 3200, y: 200, width: 256, tileCount: 4 },
      { x: 3600, y: 280, width: 192, tileCount: 3 },
      { x: 3950, y: 380, width: 256, tileCount: 4 },
      { x: 4350, y: 280, width: 192, tileCount: 3 },
      { x: 4700, y: 380, width: 256, tileCount: 4 }
    ],
    enemies: [
      { type: 'monster', x: 400, y: 650 },
      { type: 'waterGhost', x: 950, y: 350 },
      { type: 'monster', x: 1100, y: 650 },
      { type: 'waterGhost', x: 1700, y: 170 },
      { type: 'monster', x: 1850, y: 650 },
      { type: 'waterGhost', x: 2450, y: 350 },
      { type: 'monster', x: 2600, y: 650 },
      { type: 'waterGhost', x: 3200, y: 170 },
      { type: 'monster', x: 3350, y: 650 },
      { type: 'waterGhost', x: 3950, y: 350 },
      { type: 'monster', x: 4100, y: 650 },
      { type: 'monster', x: 4400, y: 650 }
    ],
    barrels: [
      { x: 350, y: 640 }, { x: 1100, y: 640 }, { x: 1950, y: 640 },
      { x: 2800, y: 640 }, { x: 3650, y: 640 }, { x: 4500, y: 640 }
    ],
    coins: [
      { x: 250, y: 550 }, { x: 650, y: 450 }, { x: 1000, y: 350 },
      { x: 1400, y: 250 }, { x: 1750, y: 170 }, { x: 2150, y: 250 },
      { x: 2500, y: 350 }, { x: 2900, y: 250 }, { x: 3250, y: 170 },
      { x: 3650, y: 250 }, { x: 4000, y: 350 }, { x: 4400, y: 250 },
      { x: 4750, y: 350 }
    ],
    npcs: [
      { x: 100, y: 640, dialog: ['Neon colors blind the wicked!', 'You\'ve come so far, warrior.', 'Only 4 levels remain!'] }
    ],
    doorX: 5200,
    hasBoss: false,
    bossX: 0,
    difficulty: 16
  },
  {
    id: 17,
    name: 'Candy Kingdom',
    worldWidth: 5600,
    bgColorIndex: 16,
    platforms: [
      { x: 0, y: 680, width: 5600, tileCount: 88 },
      { x: 200, y: 560, width: 256, tileCount: 4 },
      { x: 600, y: 460, width: 192, tileCount: 3 },
      { x: 1000, y: 360, width: 256, tileCount: 4 },
      { x: 1400, y: 260, width: 192, tileCount: 3 },
      { x: 1800, y: 180, width: 256, tileCount: 4 },
      { x: 2250, y: 260, width: 192, tileCount: 3 },
      { x: 2600, y: 360, width: 256, tileCount: 4 },
      { x: 3000, y: 260, width: 192, tileCount: 3 },
      { x: 3350, y: 180, width: 256, tileCount: 4 },
      { x: 3800, y: 260, width: 192, tileCount: 3 },
      { x: 4150, y: 360, width: 256, tileCount: 4 },
      { x: 4600, y: 260, width: 192, tileCount: 3 },
      { x: 4950, y: 360, width: 256, tileCount: 4 }
    ],
    enemies: [
      { type: 'monster', x: 400, y: 650 }, { type: 'monster', x: 750, y: 650 },
      { type: 'waterGhost', x: 1000, y: 330 }, { type: 'monster', x: 1150, y: 650 },
      { type: 'waterGhost', x: 1800, y: 150 }, { type: 'monster', x: 1950, y: 650 },
      { type: 'waterGhost', x: 2600, y: 330 }, { type: 'monster', x: 2750, y: 650 },
      { type: 'waterGhost', x: 3350, y: 150 }, { type: 'monster', x: 3500, y: 650 },
      { type: 'waterGhost', x: 4150, y: 330 }, { type: 'monster', x: 4300, y: 650 },
      { type: 'monster', x: 4750, y: 650 }
    ],
    barrels: [
      { x: 350, y: 640 }, { x: 1050, y: 640 }, { x: 1900, y: 640 },
      { x: 2750, y: 640 }, { x: 3600, y: 640 }, { x: 4450, y: 640 }
    ],
    coins: [
      { x: 250, y: 530 }, { x: 650, y: 430 }, { x: 1050, y: 330 },
      { x: 1450, y: 230 }, { x: 1850, y: 150 }, { x: 2300, y: 230 },
      { x: 2650, y: 330 }, { x: 3050, y: 230 }, { x: 3400, y: 150 },
      { x: 3850, y: 230 }, { x: 4200, y: 330 }, { x: 4650, y: 230 },
      { x: 5000, y: 330 }
    ],
    npcs: [
      { x: 100, y: 640, dialog: ['The Candy Kingdom is both sweet and deadly!', 'More enemies spawn now.', 'Use your special moves liberally!'] }
    ],
    doorX: 5400,
    hasBoss: false,
    bossX: 0,
    difficulty: 17
  },
  {
    id: 18,
    name: 'Crimson Peaks',
    worldWidth: 5800,
    bgColorIndex: 17,
    platforms: [
      { x: 0, y: 680, width: 5800, tileCount: 91 },
      { x: 200, y: 560, width: 256, tileCount: 4 },
      { x: 650, y: 460, width: 192, tileCount: 3 },
      { x: 1100, y: 360, width: 256, tileCount: 4 },
      { x: 1550, y: 260, width: 192, tileCount: 3 },
      { x: 2000, y: 180, width: 256, tileCount: 4 },
      { x: 2500, y: 260, width: 192, tileCount: 3 },
      { x: 2950, y: 360, width: 256, tileCount: 4 },
      { x: 3400, y: 260, width: 192, tileCount: 3 },
      { x: 3850, y: 180, width: 256, tileCount: 4 },
      { x: 4350, y: 260, width: 192, tileCount: 3 },
      { x: 4800, y: 360, width: 256, tileCount: 4 },
      { x: 5250, y: 460, width: 192, tileCount: 3 }
    ],
    enemies: [
      { type: 'monster', x: 400, y: 650 }, { type: 'monster', x: 800, y: 650 },
      { type: 'waterGhost', x: 1100, y: 330 }, { type: 'monster', x: 1300, y: 650 },
      { type: 'waterGhost', x: 2000, y: 150 }, { type: 'monster', x: 2200, y: 650 },
      { type: 'waterGhost', x: 2950, y: 330 }, { type: 'monster', x: 3150, y: 650 },
      { type: 'waterGhost', x: 3850, y: 150 }, { type: 'monster', x: 4050, y: 650 },
      { type: 'waterGhost', x: 4800, y: 330 }, { type: 'monster', x: 5000, y: 650 },
      { type: 'monster', x: 5300, y: 650 }
    ],
    barrels: [
      { x: 350, y: 640 }, { x: 1050, y: 640 }, { x: 1900, y: 640 },
      { x: 2750, y: 640 }, { x: 3600, y: 640 }, { x: 4500, y: 640 }, { x: 5200, y: 640 }
    ],
    coins: [
      { x: 250, y: 530 }, { x: 700, y: 430 }, { x: 1150, y: 330 },
      { x: 1600, y: 230 }, { x: 2050, y: 150 }, { x: 2550, y: 230 },
      { x: 3000, y: 330 }, { x: 3450, y: 230 }, { x: 3900, y: 150 },
      { x: 4400, y: 230 }, { x: 4850, y: 330 }, { x: 5300, y: 430 }
    ],
    npcs: [
      { x: 100, y: 640, dialog: ['The crimson peaks run with danger!', 'One more level before the final boss!', 'Save your special power!'] }
    ],
    doorX: 5600,
    hasBoss: false,
    bossX: 0,
    difficulty: 18
  },
  {
    id: 19,
    name: 'The Golden Path',
    worldWidth: 6000,
    bgColorIndex: 18,
    platforms: [
      { x: 0, y: 680, width: 6000, tileCount: 94 },
      { x: 200, y: 560, width: 256, tileCount: 4 },
      { x: 700, y: 460, width: 192, tileCount: 3 },
      { x: 1200, y: 360, width: 256, tileCount: 4 },
      { x: 1700, y: 260, width: 192, tileCount: 3 },
      { x: 2200, y: 180, width: 256, tileCount: 4 },
      { x: 2750, y: 260, width: 192, tileCount: 3 },
      { x: 3250, y: 360, width: 256, tileCount: 4 },
      { x: 3750, y: 260, width: 192, tileCount: 3 },
      { x: 4250, y: 180, width: 256, tileCount: 4 },
      { x: 4800, y: 260, width: 192, tileCount: 3 },
      { x: 5300, y: 360, width: 256, tileCount: 4 }
    ],
    enemies: [
      { type: 'monster', x: 400, y: 650 }, { type: 'monster', x: 900, y: 650 },
      { type: 'waterGhost', x: 1200, y: 330 }, { type: 'monster', x: 1400, y: 650 },
      { type: 'waterGhost', x: 2200, y: 150 }, { type: 'monster', x: 2400, y: 650 },
      { type: 'waterGhost', x: 3250, y: 330 }, { type: 'monster', x: 3450, y: 650 },
      { type: 'waterGhost', x: 4250, y: 150 }, { type: 'monster', x: 4450, y: 650 },
      { type: 'waterGhost', x: 5300, y: 330 }, { type: 'monster', x: 5500, y: 650 },
      { type: 'monster', x: 5700, y: 650 }
    ],
    barrels: [
      { x: 350, y: 640 }, { x: 1100, y: 640 }, { x: 2050, y: 640 },
      { x: 3000, y: 640 }, { x: 3950, y: 640 }, { x: 4900, y: 640 }, { x: 5600, y: 640 }
    ],
    coins: [
      { x: 250, y: 530 }, { x: 750, y: 430 }, { x: 1250, y: 330 },
      { x: 1750, y: 230 }, { x: 2250, y: 150 }, { x: 2800, y: 230 },
      { x: 3300, y: 330 }, { x: 3800, y: 230 }, { x: 4300, y: 150 },
      { x: 4850, y: 230 }, { x: 5350, y: 330 }
    ],
    npcs: [
      { x: 100, y: 640, dialog: ['The golden path leads to greatness!', 'The final boss awaits in level 20!', 'It has never been defeated before...'] }
    ],
    doorX: 5800,
    hasBoss: false,
    bossX: 0,
    difficulty: 19
  },
  {
    id: 20,
    name: 'The Final Confrontation',
    worldWidth: 6400,
    bgColorIndex: 19,
    platforms: [
      { x: 0, y: 680, width: 6400, tileCount: 100 },
      { x: 200, y: 560, width: 256, tileCount: 4 },
      { x: 700, y: 460, width: 256, tileCount: 4 },
      { x: 1250, y: 360, width: 256, tileCount: 4 },
      { x: 1800, y: 260, width: 256, tileCount: 4 },
      { x: 2350, y: 180, width: 192, tileCount: 3 },
      { x: 2800, y: 260, width: 256, tileCount: 4 },
      { x: 3350, y: 360, width: 256, tileCount: 4 },
      { x: 3900, y: 260, width: 256, tileCount: 4 },
      { x: 4450, y: 180, width: 192, tileCount: 3 },
      { x: 4900, y: 260, width: 256, tileCount: 4 },
      { x: 5450, y: 360, width: 320, tileCount: 5 }
    ],
    enemies: [
      { type: 'monster', x: 400, y: 650 }, { type: 'monster', x: 900, y: 650 },
      { type: 'waterGhost', x: 1250, y: 330 }, { type: 'monster', x: 1400, y: 650 },
      { type: 'waterGhost', x: 1800, y: 230 }, { type: 'monster', x: 1950, y: 650 },
      { type: 'waterGhost', x: 2350, y: 150 }, { type: 'monster', x: 2500, y: 650 },
      { type: 'waterGhost', x: 3350, y: 330 }, { type: 'monster', x: 3550, y: 650 },
      { type: 'waterGhost', x: 4450, y: 150 }, { type: 'monster', x: 4650, y: 650 },
      { type: 'waterGhost', x: 5450, y: 330 }, { type: 'monster', x: 5650, y: 650 }
    ],
    barrels: [
      { x: 400, y: 640 }, { x: 1150, y: 640 }, { x: 2100, y: 640 },
      { x: 3050, y: 640 }, { x: 4000, y: 640 }, { x: 5000, y: 640 }, { x: 5800, y: 640 }
    ],
    coins: [
      { x: 250, y: 530 }, { x: 750, y: 430 }, { x: 1300, y: 330 },
      { x: 1850, y: 230 }, { x: 2400, y: 150 }, { x: 2850, y: 230 },
      { x: 3400, y: 330 }, { x: 3950, y: 230 }, { x: 4500, y: 150 },
      { x: 4950, y: 230 }, { x: 5500, y: 330 }
    ],
    npcs: [
      { x: 100, y: 640, dialog: ['THIS IS IT! The final battle!', 'The ultimate boss has THREE phases!', 'You have come so far...', 'FINISH WHAT YOU STARTED!'] }
    ],
    doorX: 6250,
    hasBoss: true,
    bossX: 5900,
    difficulty: 20
  }
];
