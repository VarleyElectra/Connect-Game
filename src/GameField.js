import * as PIXI from 'pixi.js';
import {Blob} from './Blob.js';
import StraightLine from "./StraightLine";
import {BLOB_COLORS_DIGITS, GAME_MATRIX_SIZE, BLOB_COLORS} from "./constants";
import {Utils} from "./Utils";

export default class GameField extends PIXI.Container {
    constructor(spacing, blobDimensionCount) {
        super();
        this.spacing = spacing;
        this.blobDimensionCount = blobDimensionCount;
        this.width = 600;
        this.height = 600;

        this.chainStartBlob = null;
        this.blobChain = [];

        this.interactive = true;
        this.lines = []

        this.isDown = false;
        this.sortableChildren = true;

        this.task1Color = game.dataStorage.task1Color;
        this.task2Color = game.dataStorage.task2Color;
    }

    init() {
        this.drawField();
        this.on('pointermove', this.move.bind(this));
        this.on('pointerdown', this.pointerDown.bind(this));
        this.on('pointerup', this.pointerUp.bind(this));
    }

    pointerUp() {
        this.isDown = false;
        this.lines.forEach(line => line.destroy());
        this.lines = [];
        const deletedBlobsByColumn = [];
        for (let i = 0; i < GAME_MATRIX_SIZE; i++) {
            deletedBlobsByColumn.push([]);
        }
        const blobsForMove = [];

        if (this.blobChain.length >= 2) {
            let blobColor = this.blobChain[0].color;

            this.blobChain.forEach(blob => {
                let curBlobXNum = this.getBlobGameFieldPosition(blob.x);

                deletedBlobsByColumn[curBlobXNum].push(blob);

                if (blobColor === this.task1Color) {
                    game.dataStorage.currentTaskCount1 += 1;
                }
                if (blobColor === this.task2Color) {
                    game.dataStorage.currentTaskCount2 += 1;
                }

            });

            deletedBlobsByColumn.forEach(column => {
                let yLowest = GAME_MATRIX_SIZE - 1;
                let curBlobXNum;
                column.forEach(blob => {
                    if (blob) {
                        let curBlobYNum = this.getBlobGameFieldPosition(blob.y);
                        if (curBlobYNum < yLowest) {
                            yLowest = curBlobYNum;
                        }
                    }
                })

                if (column.length) {
                    curBlobXNum = this.getBlobGameFieldPosition(column[0].x)

                    for (let i = 0; i < yLowest; i++) {
                        blobsForMove.push(game.level.gameField.children[curBlobXNum].children[i]);
                    }
                }
            })

            this.blobChain.forEach(blob => {
                blob.visible = false;
            })

            Promise.all(blobsForMove.map(blob => {
                const curBlobXNum = this.getBlobGameFieldPosition(blob.x);
                let from = {x: blob.x, y: blob.y};
                const to = {x: blob.x, y: blob.y + deletedBlobsByColumn[curBlobXNum].length * this.spacing};
                return this.moveBlobs(blob, from, to);
            })).then(() => {
                deletedBlobsByColumn.forEach(column => {
                    if (column.length) {
                        let xGameFieldPosition = this.getBlobGameFieldPosition(column[0].x);
                        for (let i = 0; i < column.length; i++) {
                            let randomNum = Utils.getRandomNumber(0, Object.values(BLOB_COLORS).length - 1);
                            let newBlobColor = Utils.getBlobColor(randomNum);
                            let newBlob = new Blob(newBlobColor);
                            newBlob.position.set(column[0].x, 20 + i * this.spacing);
                            game.level.gameField.children[xGameFieldPosition].addChildAt(newBlob, i);
                        }
                    }
                })

                this.blobChain.forEach(blob => {
                    blob.destroy();
                })
                this.blobChain = [];

            }).catch(() => {
                console.log("err")
            })
            game.dataStorage.currentStep -= 1;
        }
        this.chainStartBlob = null;
    }

    pointerDown(e) {
        if (e.target instanceof Blob) {
            this.isDown = true;
            let line =  new StraightLine([e.target.x, e.target.y, e.target.x, e.target.y],
                10, BLOB_COLORS_DIGITS[e.target.color]);
            line.zIndex = -1;
            this.addChild(line);
            this.lines.push(line);
            this.chainStartBlob = e.target;
            this.blobChain = [this.chainStartBlob];
        }
    }

    get movingLine() {
        return this.lines[this.lines.length - 1];
    }

    getBlobGameFieldPosition(coordinate) {
        return (coordinate - 20) / this.spacing;
    }

    move(e) {
        if (!this.isDown) {
            return;
        }
        this.movingLine.updatePoints([null, null, e.data.global.x - game.level.gameField.x,
            e.data.global.y - game.level.gameField.y]);

        if (e.target && e.target instanceof Blob && this.canAddBlob(e.target)
            && this.lines.length !== 0) {
                this.blobChain.push(e.target);
                this.movingLine.updatePoints([null, null, e.target.x,
                    e.target.y]);
                let line =  new StraightLine([e.target.x, e.target.y, e.target.x, e.target.y],
                    10, BLOB_COLORS_DIGITS[e.target.color]);
                line.zIndex = -1;
                this.addChild(line);
                this.lines.push(line);
        }

    }

    canAddBlob(blob) {
        const lastBlob = this.blobChain[this.blobChain.length - 1];
        for (let i = 0; i < this.blobChain.length - 1; i++) {
            if (this.blobChain[i].id === blob.id) {
                return false;
            }
        }

        return blob.color === this.chainStartBlob.color && lastBlob.id !== blob.id && (
            blob.x === lastBlob.x && Math.abs(blob.y - lastBlob.y) === this.spacing ||
            blob.y === lastBlob.y && Math.abs(blob.x - lastBlob.x) === this.spacing);
    }

    async moveBlobs(target, from, to) {
        return new Promise (resolve => {
            const dx  = (to.x - from.x) / 20;
            const dy  = (to.y - from.y) / 20;

            let i = 0;
            const intervalId = setInterval(() => {
                if (i === 21) {
                    clearInterval(intervalId);
                    resolve();
                    return;
                }
                target.position.set(from.x + dx * i, from.y + dy * i);
                i++;
            }, 25);
        })
    }

    drawField() {
        for (let i = 0; i < this.blobDimensionCount; i++) {
            const x = this.spacing * i + 20;
            const column = new PIXI.Container();
            for (let j = 0; j < this.blobDimensionCount; j++) {
                let blob =  new Blob(game.dataStorage.blobColorsMatrix[i][j]);
                const y = this.spacing * j + 20;

                blob.position.set(x, y);
                column.addChild(blob);
            }
            this.addChild(column);
        }
    }
}