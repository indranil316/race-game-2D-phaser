export default class GameState{
    constructor(){
        this.opponentSpeedRange = [150,200];
        this.opponentSpeed=Phaser.Math.Between(...this.opponentSpeedRange),
        this.score=0, 
        this.levelTime=15;
        this.timerElapsed=this.levelTime;
        this.level=null
        this.color=null;
        this.name=null;
        this.map=null;
    }
    static setMap=(map)=>{
        localStorage.setItem('map',map);
    }
    static getMap = () => {
        return JSON.parse(localStorage.getItem('map'))
    }
    static resetMap = () => {
        localStorage.setItem('map', null);
    }    
    static getState=()=>{
        return JSON.parse(localStorage.getItem('gameState'));
    }
    setState=({opponentSpeed,score,timerElapsed,level,color,name, map})=>{
        this.opponentSpeed=opponentSpeed
        this.score=score;
        this.timerElapsed=timerElapsed;
        this.level = level;
        this.color=color;
        this.name=name;
        this.map=map;
        let state = {
            opponentSpeed: this.opponentSpeed,
            score: this.score,
            timerElapsed: this.timerElapsed,
            level: this.level,
            color: this.color,
            name: this.name,
            map:this.map
        };
        localStorage.setItem('gameState',JSON.stringify(state));
    }
    getState=()=>{
        return JSON.parse(localStorage.getItem('gameState'));
    }
    resetState = () => {
        localStorage.setItem('gameState',null);
    }
    setMap=(map)=>{
        localStorage.setItem('map',JSON.stringify(map));
    }
    getMap = () => {
        return JSON.parse(localStorage.getItem('map'))
    }
    resetMap = () => {
        localStorage.setItem('map', null);
    }
}