import * as PIXI from 'pixi.js';
import Level from "./Level";
import DataStorage from "./DataStorage";

export default class Game extends PIXI.Application {
    constructor(config) {
        super(config);
        this.config = config;
    }

    init() {
        this.level = new Level(this.config.width, this.config.height);
        this.dataStorage = new DataStorage(1, 0, 0,
            20, 20,
            50, 50);
        this.dataStorage.init();
        this.level.init(this.dataStorage);
        this.stage.addChild(this.level);
    }
}