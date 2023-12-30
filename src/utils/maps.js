export class Map{
    constructor({gassStation, road, name, details, color}){
        this.gassStation=gassStation;
        this.road=road;
        this.name=name;
        this.details=details;
        this.color=color;
    }
}

let dessert = new Map({
    gassStation:'Desert_gas_station (128 x 304).png',
    road:'Desert_road (64 x 64).png',
    name:'dessert',
    details:'Desert_details (16 x 16).png',
    color:'#EFB681'
});

let highway = new Map({
    gassStation:'Highway_gas_station (176 x 352).png',
    road:'Highway_road (96 x 64).png',
    details:'Highway_water_animation (16 x 16).png',
    color:'#00FFFF',
    name:'highway'
})

let summer = new Map({
    gassStation:'Summer_gas_station (128 x 304).png',
    road:'Summer_road (64 x 64).png',
    details:'Summer_details (16 x 16).png',
    name:'summer',
    color:'#42AD37'
})

let winter = new Map({
    gassStation:'Winter_gas_station (128 x 304).png',
    road:'Winter_road (64 x 64).png',
    details:'Winter_details (16 x 16).png',
    name:'winter',
    color:'#F0EEEC'
})

const maps = [dessert, summer, winter];

export default maps;



