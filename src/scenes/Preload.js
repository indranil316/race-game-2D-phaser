import Phaser from "phaser";

export default class Preload extends Phaser.Scene{
    constructor(){
        super('preloadScene');
    }
    preload(){
        this.load.image('track','assets/Levels/Desert_gas_station (128 x 304).png');
        this.load.image('road','assets/Levels/Desert_road (64 x 64).png');
        this.load.spritesheet('car','assets/Cars/Player_blue (16 x 16).png',{
            frameWidth: 16,
            frameHeight: 16,
        })
        this.load.spritesheet('police','assets/Cars/Police (16 x 16).png',{
            frameWidth: 16,
            frameHeight: 16
        })
    }
    create(){
        this.scene.start('playScene');
    }
}