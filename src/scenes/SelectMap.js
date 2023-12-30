import Phaser from "phaser";
import maps from "../utils/maps";
import { size } from "../constants";
import GameState from "../utils/GameState";

export default class SelectMap extends Phaser.Scene{
    constructor(){
        super('selectMap');
        this.mapButtons=null;
    }
    create(){
        const state = GameState.getState();
        if(state){
            this.scene.start('playScene')
        }
        this.setBg();
        this.addSelectMapText();
        this.addMaps();
    }
    setBg=()=>{
        this.cameras.main.setBackgroundColor('#FFFFFF');
    }
    addSelectMapText = () => {
        this.add.text(0,0,'Select Map',{
            fontSize: '45px',
            color:'#000',
        })
    }
    addMaps = () => {
        let container = this.add.container(0, 0);
        const containerWidth = size.width-size.width/10;
        const containerHeight = size.height-100;
        container.setSize(containerWidth, containerHeight);
        container.setInteractive(); 
    
        const imageSize = 200;
        const spacing = 20;
        let xPos = spacing;
        let yPos = spacing;
    
        maps.forEach((map) => {
            let mapBtn = this.add.image(xPos, yPos,`${map.name}-gassStation`)
            .setOrigin(0,0)
            .setDisplaySize(imageSize, imageSize)
            xPos += imageSize + spacing;
            if (xPos + imageSize + spacing > container.width) {
                xPos = spacing;
                yPos += imageSize + spacing;
            }
    
            mapBtn.setInteractive({useHandCursor: true}).on('pointerdown',  ()=>{
                window.GAME_RC.map=map;
                this.scene.start('playScene');
            });
    
            container.add(mapBtn);
        });
    
        Phaser.Display.Align.In.Center(container, this.add.zone(size.width/10, 100, size.width, size.height));
    
    };
    
}