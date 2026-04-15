import Phaser from 'phaser';
import { GAME_CONFIG } from './config.js';
import BootScene from './scenes/BootScene.js';
import MainMenuScene from './scenes/MainMenuScene.js';
import CharacterSelectScene from './scenes/CharacterSelectScene.js';
import GameScene from './scenes/GameScene.js';
import HUDScene from './scenes/HUDScene.js';
import ShopScene from './scenes/ShopScene.js';
import LevelCompleteScene from './scenes/LevelCompleteScene.js';
import GameOverScene from './scenes/GameOverScene.js';

const config = {
  type: Phaser.AUTO,
  width: GAME_CONFIG.width,
  height: GAME_CONFIG.height,
  parent: 'game',
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: GAME_CONFIG.gravity },
      debug: false
    }
  },
  scene: [
    BootScene,
    MainMenuScene,
    CharacterSelectScene,
    GameScene,
    HUDScene,
    ShopScene,
    LevelCompleteScene,
    GameOverScene
  ]
};

window.__phaserGame = new Phaser.Game(config);
