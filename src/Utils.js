import {BLOB_COLORS, GAME_MATRIX_SIZE, GAME_MAX_STEPS} from "./constants";
import DataStorage from "./DataStorage";

export const Utils = {
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

    updateView() {
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
        if (game.dataStorage.currentTaskCount1 <= game.dataStorage.maxCountTask1) {
            game.level.panel.children[0].text.text = `${game.dataStorage.currentTaskCount1}/${game.dataStorage.maxCountTask1}`
        }
        if (game.dataStorage.currentTaskCount1 === game.dataStorage.maxCountTask1) {
            game.level.panel.children[0].children[0].children[0].visible = true;
        }

        if (game.dataStorage.currentTaskCount2 <= game.dataStorage.maxCountTask2) {
            game.level.panel.children[1].text.text = `${game.dataStorage.currentTaskCount2}/${game.dataStorage.maxCountTask2}`
        }
        if (game.dataStorage.currentTaskCount2 === game.dataStorage.maxCountTask2) {
            game.level.panel.children[1].children[0].children[0].visible = true;
        }

        //Апдейт уровня
        setTimeout(() => {
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

                localStorage.clear();
                let newGameFieldMatrix = Utils.createBlobColorsMatrix(GAME_MATRIX_SIZE);
                let newDataStorage = new DataStorage(newCurrentLevel, 0, 0,
                    newMaxCountTask1, newMaxCountTask2,
                    GAME_MAX_STEPS, GAME_MAX_STEPS, newGameFieldMatrix, newBlobTask1Color, newBlobTask2Color);
                newDataStorage.init();
                game.level.init(newDataStorage);
                location.reload();
            }
            game.level.levelPanel.children[0].text = game.dataStorage.currentLevel;
        }, 50);
    }
}