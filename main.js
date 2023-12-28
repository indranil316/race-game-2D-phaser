import Phaser from "phaser";
import { size } from './src/constants';
import PlayScene from "./src/scenes/PlayScene";
import Preload from "./src/scenes/Preload";

const gameCanvas = document.querySelector('canvas#game');

const config={
  type: Phaser.WEBGL,
  width: size.width,
  height: size.height,
  canvas: gameCanvas,
  backgroundColor:'#EFB681',
  physics:{
    default: 'arcade',
  },
  scene:[Preload, PlayScene]
}
const game = new Phaser.Game(config);