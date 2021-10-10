import * as PIXI from 'pixi.js';
import Level from "./Level";
import DataStorage from "./DataStorage";
import {Utils} from "./Blob.js";
import {GAME_MATRIX_SIZE, GAME_START_LEVEL, GAME_MAX_STEPS, GAME_MAX_COUNT_TASK1,
    GAME_MAX_COUNT_TASK2, GAME_TASK1_COLOR, GAME_TASK2_COLOR} from "./constants";

export default class Game extends PIXI.Application {
    constructor(config) {
        super(config);
        this.config = config;
    }

    init() {
        this.level = new Level(this.config.width, this.config.height);
        let blobColorsMatrix = Utils.createBlobColorsMatrix(GAME_MATRIX_SIZE);
        console.log(blobColorsMatrix)
        this.dataStorage = new DataStorage(GAME_START_LEVEL, 0, 0,
            GAME_MAX_COUNT_TASK1, GAME_MAX_COUNT_TASK2,
            GAME_MAX_STEPS, GAME_MAX_STEPS, blobColorsMatrix,
            GAME_TASK1_COLOR, GAME_TASK2_COLOR);
        this.dataStorage.init();
        this.level.init(this.dataStorage);
        this.stage.addChild(this.level);
    }
}