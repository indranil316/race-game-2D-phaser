import Phaser from "phaser";
import { size } from "../constants";

export default class PlayScene extends Phaser.Scene{
    constructor(){
        super("playScene");
        this.roadOrigin=null;
        this.tracks=null;
        this.scalingFactor=3;
        this.carWidth = 20;
        this.carMovementSpeed = 150;
        this.speed = 150;
        this.opponentSpeedRange = [50,150];
        this.opponentSpeed = Phaser.Math.Between(...this.opponentSpeedRange);
        this.opponentRange = [200,400];
        this.opponents=null;
        this.totalOpponents = 20;
        this.score=0;
        this.scoreText=null;
        this.gameOverText = null;
        this.timer = null;
        this.timerElapsed=60;
        this.level = 1;
    }
    create(){
        this.createRoadOrigin();
        this.createTrack();
        this.addCar();
        this.addOpponent();
        this.moveCar();
        this.createScoreBoard();
        this.createTimer();
    }
    update(){
        this.recycleTracks();
        this.updateScoreBoard()
        this.checkCarHittingRoadEnd();
        this.checkScore();     
    }
    checkScore = () => {
        this.opponents.getChildren().forEach(opponent=>{
            if(opponent.y >= size.height) {
                this.score ++;
                this.placeOpponent(opponent);
            }
        })
    }
    createTimer = () => {
        const timerConfig = {
            delay: 1000, 
            callback: this.updateTimer,
            callbackScope: this,
            loop: true,
            repeat: -1,
        };
    
        this.timer = this.time.addEvent(timerConfig);    
        this.timerText = this.add.text(size.width - 28, 28, `Timer: 60`, {
            fontSize: '28px',
            color: '#000',
        }).setOrigin(1, 0);
        this.levelText = this.add.text(size.width - 28, 56,'Level: 1',{
            fontSize: '28px',
            color: '#000',
        }).setOrigin(1, 0);
    };
    updateTimer = () => {
        if (this.timer) {
            this.timerElapsed -= this.timer.getElapsedSeconds();
    
            if (this.timerElapsed <= 0) {
                this.level++;
                this.timerElapsed = 60;
                this.timer.reset({ delay: 1000, callback: this.updateTimer, callbackScope: this, loop: true });
            }
    
            this.timerText.setText(`Timer: ${this.timerElapsed}`);
            this.levelText.setText(`Level: ${this.level}`);
        }
    };
    checkCarHittingRoadEnd = () => {
        let carHalfWidth = this.car.width * 0.5;
        let roadLeftBoundary = this.roadOrigin.x - this.roadOrigin.displayWidth * 0.2;
        let roadRightBoundary = this.roadOrigin.x + this.roadOrigin.displayWidth * 0.1;
    
        if (this.car.x - carHalfWidth <= roadLeftBoundary) {
            this.car.x = roadLeftBoundary + carHalfWidth;
            this.car.body.setVelocityX(0);
        } else if (this.car.x + carHalfWidth >= roadRightBoundary) {
            this.car.x = roadRightBoundary - carHalfWidth;
            this.car.body.setVelocityX(0);
        }
    }
    createScoreBoard = () => {
        this.scoreText = this.add.text(28,28,'Score : 0',{
            fontSize: '28px',
            color:'#000'
        })
    }
    updateScoreBoard = () => {
        this.scoreText.setText(`Score : ${this.score}`);
    }
    placeOpponent = (opponent) => {
        let MIN = Infinity;
        this.opponents.getChildren().forEach((opponent, i)=>{
            if(opponent.y < MIN){
                MIN = opponent.y;
            }
        })
        opponent.y = MIN - Phaser.Math.Between(...this.opponentRange);
    }
    createRoadOrigin = () => {
        this.roadOrigin= this.physics.add.image(size.width/2,size.height,'track')
        .setOrigin(0.3,1)
        .setScale(this.scalingFactor);
        this.roadOrigin.body.setVelocityY(this.speed)
    }
    createTrack = () => {
        let x = this.roadOrigin.x;
        let y = size.height - this.scalingFactor*this.roadOrigin.height;
        let totalTracks = 20;
        this.tracks = this.physics.add.group();
        for(let i = 0; i<totalTracks; i++){
            let track = this.tracks.create(x,y,'road')
            .setOrigin(0.6,1)
            .setScale(this.scalingFactor);
            y = y-track.height;   
        }
        this.tracks.setVelocityY(this.speed)
    }
    recycleTracks = () => {
        this.tracks.getChildren().forEach(track=>{
            if(track.y>=size.height+track.height){
                track.y=this.getTopMostTrack()-50
            }
        })
    }
    getTopMostTrack = () => {
        let top = Infinity;
        this.tracks.getChildren().forEach(track=>{
            if(track.y<top){
                top=track.y;
            }
        })
        return top;
    }
    addCar = () => {
        this.car = this.physics.add.sprite(size.width/2,size.height*.8,'car')
        .setScale(this.scalingFactor)
        .setOrigin(0.5,0.5)
    }
    addOpponent = () => {
        this.opponents = this.physics.add.group();
        let y=0;
        let trackWidth = this.tracks.getChildren()[0].width;
        let range = [size.width/2-trackWidth, size.width/2+trackWidth-this.car.width*2];
        for(let i = 0; i<= this.totalOpponents; i++){
            let x = Phaser.Math.Between(...range);
            y-=Phaser.Math.Between(...this.opponentRange);
            let opponent = this.opponents.create(x,y,'police')
            .setScale(this.scalingFactor)
            .setOrigin(0.5,0.5)
            .setVelocityY(this.speed + this.opponentSpeed);
            this.physics.add.overlap(opponent, this.car, ()=>{
                let t = Math.abs(opponent.x - this.car.x)
                if(t < 32){
                    this.collide();
                }
            })
        }
    }
    collide = () => {
        this.physics.pause()
        this.time.paused=true;
        this.timerElapsed=60;
        this.gameOver();
    }
    gameOver = () => {
        this.gameOverText = this.add.text(size.width / 2, size.height / 2 - 50, `Game Over!\nYour score = ${this.score}`, {
            fontSize: '45px',
            color: '#fff',
            align: 'center'
        }).setOrigin(0.5, 0.5);
    
        const restartButton = this.add.text(size.width / 2, size.height / 2 + 50, 'Restart', {
            fontSize: '30px',
            color: '#fff',
            backgroundColor: '#000',
            padding: {
                x: 10,
                y: 5
            }
        }).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true }).setDepth(1); 
    
        const closeButton = this.add.text(size.width / 2, size.height / 2 + 100, 'Close', {
            fontSize: '30px',
            color: '#fff',
            backgroundColor: '#000',
            padding: {
                x: 10,
                y: 5
            }
        }).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true }).setDepth(1); 
    
        restartButton.on('pointerdown', () => {
            this.time.paused=false;
            this.scene.restart();
        });
    
        closeButton.on('pointerdown', () => {
            this.game.destroy(true);
        });
    }    
    
    
    
    moveCar = () => {
        const cursors = this.input.keyboard.createCursorKeys();
        cursors.left.on('down', () => {
            this.car.setVelocityX(-this.carMovementSpeed);
        });
        cursors.right.on('down', () => {
            this.car.setVelocityX(this.carMovementSpeed);
        });
        cursors.left.on('up', () => {
            this.car.setVelocityX(0);
        });
        cursors.right.on('up', () => {
            this.car.setVelocityX(0);
        });
        cursors.up.on('down',()=>{
            this.speed = this.speed + 10;
        })
        cursors.up.on('up',()=>{
            this.speed = this.speed - 10;
        })
    }
}

