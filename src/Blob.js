import * as PIXI from 'pixi.js';
import DataStorage from "./DataStorage";
import {GAME_MATRIX_SIZE, GAME_MAX_STEPS} from "./constants";

const BLOB_COLORS = {
    BLUE: 'blue',
    RED: 'red',
    GREEN: 'green',
    ORANGE: 'orange',
    VIOLET: 'violet'
}

export const Utils = {
    getBlobTextureByColor(color) {
        let spriteSheet = PIXI.Loader.shared.resources["images/atlas.json"].textures;
        if (color === BLOB_COLORS.BLUE) {
            return spriteSheet['blue circle.png'];
        }
        if (color === BLOB_COLORS.GREEN) {
            return spriteSheet['green circle.png'];
        }
        if (color === BLOB_COLORS.ORANGE) {
            return spriteSheet['orange circle.png'];
        }
        if (color === BLOB_COLORS.RED) {
            return spriteSheet['red circle.png'];
        }
        if (color === BLOB_COLORS.VIOLET) {
            return spriteSheet['violet circle.png']
        }
    },

    getRandomNumber(min, max) {
       return Math.floor(min + Math.random() * (max + 1 - min));
    },

    getBlobColor(colorPosition) {
        return Object.values(BLOB_COLORS)[colorPosition];
    },

    createBlobColorsMatrix(matrixSize) {
        let blobColorsMatrix = [];
        for (let i = 0; i < matrixSize; i++) {
            let blobColorsSubMatrix = [];
            for (let j = 0; j < matrixSize; j++) {
                let rand = this.getRandomNumber(0, Object.values(BLOB_COLORS).length - 1);
                let color = this.getBlobColor(rand);
                blobColorsSubMatrix.push(color);
            }
            blobColorsMatrix.push(blobColorsSubMatrix);
        }
        return blobColorsMatrix;
    },

    updateCurrentValues() {
        const game = window.game;

        //Апдейт значения текущего хода
        if (game.dataStorage.currentStep === 0) {
            alert('Вы проиграли');
            game.dataStorage.clear();
            game.init();
        } else {
            game.level.stepsPanel.children[0].text = game.dataStorage.currentStep;
            game.level.stepsPanel.children[0].position.set(game.level.stepsPanel.width / 2 -
                game.level.stepsPanel.children[0].width / 2, 5);
        }

        //Апдейт текущих тасок
        if (game.dataStorage.currentTaskCount1 < game.dataStorage.maxCountTask1) {
            game.level.panel.children[0].text.text = `${game.dataStorage.currentTaskCount1}/${game.dataStorage.maxCountTask1}`
        } else {
            //Логика наклеивания иконки завершения таски
        }
        if (game.dataStorage.currentTaskCount2 < game.dataStorage.maxCountTask2) {
            game.level.panel.children[1].text.text = `${game.dataStorage.currentTaskCount2}/${game.dataStorage.maxCountTask2}`
        } else {
            //Логика наклеивания иконки завершения таски
        }

        //Апдейт уровня
        if (game.dataStorage.currentTaskCount1 >= game.dataStorage.maxCountTask1 &&
            game.dataStorage.currentTaskCount2 >= game.dataStorage.maxCountTask2) {
            alert('Вы прошли уровень');

            const newCurrentLevel = game.dataStorage.currentLevel + 1;
            const newMaxCountTask1 = game.dataStorage.maxCountTask1 + 1;
            const newMaxCountTask2 = game.dataStorage.maxCountTask2 + 1;

            let randomNum1 = Utils.getRandomNumber(0, Object.values(BLOB_COLORS).length - 1);
            let randomNum2 = randomNum1 === 0 ? 1 : randomNum1 - 1;
            let newBlobTask1Color = Utils.getBlobColor(randomNum1);
            let newBlobTask2Color = Utils.getBlobColor(randomNum2);

            game.dataStorage.clear();
            let newGameFieldMatrix = Utils.createBlobColorsMatrix(GAME_MATRIX_SIZE);
            let newDataStorage = new DataStorage(newCurrentLevel, 0, 0,
                newMaxCountTask1, newMaxCountTask2,
                GAME_MAX_STEPS, GAME_MAX_STEPS, newGameFieldMatrix, newBlobTask1Color, newBlobTask2Color);
            newDataStorage.init();
            game.level.init(newDataStorage);
        }
        game.level.levelPanel.children[0].text = game.dataStorage.currentLevel;

        //Апдейт игрового поля
        game.level.gameField.init();

        //Апдейт цветов тасок

    }
}

export class Blob extends PIXI.Sprite {
    constructor (color) {
        const texture = Utils.getBlobTextureByColor(color);
        super(texture);

        this.id = Symbol();
        this.interactive = true;
        this.buttonMode = true;
        this.color = color;
        this.anchor.set(0.5);
        this.on("pointerup", this.doPointerUp);
        this.on("pointerdown", this.doPointerDown);
    }

    doPointerUp() {
        this.scale.x = 1;
        this.scale.y = 1;
        window.game.dataStorage.currentStep -= 1;
        window.game.dataStorage.currentTaskCount1 = `${+window.game.dataStorage.currentTaskCount1 + 1}`;
        window.game.dataStorage.currentTaskCount2 = `${+window.game.dataStorage.currentTaskCount2 + 1}`;
        Utils.updateCurrentValues();
    }

    doPointerDown() {
        this.scale.x = 1.25;
        this.scale.y = 1.25;
    }
}
