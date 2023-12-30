import Phaser from "phaser";
import { size } from './src/constants';
import PlayScene from "./src/scenes/PlayScene";
import Preload from "./src/scenes/Preload";
import SelectMap from "./src/scenes/SelectMap";

const gameCanvas = document.querySelector('canvas#game');

const config={
  type: Phaser.WEBGL,
  width: size.width,
  height: size.height,
  canvas: gameCanvas,
  physics:{
    default: 'arcade',
  },
  input: {
    touch: true,
  },
  scene:[Preload, SelectMap, PlayScene]
}
const game = new Phaser.Game(config);