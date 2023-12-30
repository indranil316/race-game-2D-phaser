import Phaser from "phaser";
import maps from "../utils/maps";

export default class Preload extends Phaser.Scene{
    constructor(){
        super('preloadScene');
    }
    preload(){
        const location = 'assets/Levels/'
        maps.forEach(map=>{
            this.load.image(`${map.name}-gassStation`,location+map.gassStation);
            this.load.image(`${map.name}-road`,location+map.road);
        })
        // this.load.image('track','assets/Levels/Desert_gas_station (128 x 304).png');
        // this.load.image('road','assets/Levels/Desert_road (64 x 64).png');
        this.load.spritesheet('car','assets/Cars/Player_blue (16 x 16).png',{
            frameWidth: 16,
            frameHeight: 16,
        })
        this.load.spritesheet('police','assets/Cars/Police (16 x 16).png',{
            frameWidth: 16,
            frameHeight: 16
        })
        window.GAME_RC={}
    }
    create(){
        this.scene.start('selectMap');
    }
}