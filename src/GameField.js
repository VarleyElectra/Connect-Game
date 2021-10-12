import * as PIXI from 'pixi.js';
import {Blob} from './Blob.js';
import Line from "./Line";
import {BLOB_COLORS_DIGITS} from "./constants"

export default class GameField extends PIXI.Container {
    constructor(spacing, blobDimensionCount) {
        super();
        this.spacing = spacing;
        this.blobDimensionCount = blobDimensionCount;

        this.blobWidth = new Blob('red').width;
        this.blobHeight = new Blob('red').height;

        this.currentBlob = null;
        this.blobChain = [];

        this.interactive = true;
        this.line =  new Line([0, 0, 0, 0], 10, BLOB_COLORS_DIGITS['red']);
        this.lines = []
        // this.addChild(this.line);

        this.blobByPosition = [];
        this.isDown = false;
        this.sortableChildren = true;
    }

    init() {
        this.drawField();
        this.on('pointermove', this.move.bind(this));
        this.on('pointerdown', this.pointerDown.bind(this));
        this.on('pointerup', this.pointerUp.bind(this));
        // // this.on('pointermove', (e) => console.log(`x:${e.data.global.x}, y:${e.data.global.y}`));
        // this.on('pointerup', () => console.log('pointerUp'));
    }

    pointerUp(e) {
        this.isDown = false
    }

    pointerDown(e) {
        if (e.target) {
            this.isDown = true;
            let line =  new Line([e.target.x, e.target.y, e.target.x, e.target.y],
                10, BLOB_COLORS_DIGITS[e.target.color]);
            line.zIndex = -1;
            this.addChild(line);
            this.lines.push(line);
            console.log(`Down: e.x${e.target.x}, e.y:${e.target.y}`)
            // this.currentBlob = e.target;
            // this.currentBlob.addChild(this.line);
            console.log(line)
            // this.currentBlob
            // console.log(e.target.x);
            // console.log(e.target.y);
        }
    }

    // pointerUp(e) {
    //     if (e.target) {
    //         this.line.updatePoints([null, null, e.target.x, e.target.y])
    //         console.log(`UP: e.x:${e.target.x}, e.y:${e.target.y}`);
    //         // this.currentBlob
    //         // console.log(e.target.x);
    //         // console.log(e.target.y);
    //     }
    // }

    move(e) {
        // let xSpace = 0;
        // let ySpace = 0;
        // if (e.target) {
        //     xSpace = e.target.x;
        //     ySpace = e.target.y
        // }
        // console.log(`x${this.currentBlob.x} y${this.currentBlob.y}`)
        if (this.isDown) {
            this.lines[this.lines.length - 1].updatePoints([null, null, e.data.global.x - game.level.gameField.x,
                e.data.global.y - game.level.gameField.y]);
        }

        // if (e.target) {
        //     this.line.lineColor = BLOB_COLORS_DIGITS[e.target.color]
        // }

        // console.log(e.data.global.y);
        // console.log(this.width);
        // const {x, y} = event.position;
        //
        // if (
        //     (Math.abs(x - this.currentBlub.x - this.spacing) < this.currentBlub.width) &&
        //     (Math.abs(y - this.currentBlub.y) < this.currentBlub.y)
        // ) {
        //     const blob = this.blobByPosition[Math.floor(x / this.spacing)][Math.floor(y / this.spacing)];
        //
        //     if (blob.color === this.currentBlub.color) {
        //         this.blobChain.push(this.currentBlub);
        //         this.currentBlub = blob;
        //     }
        // }
        //
        // this.line.clear();
        // this.line.moveTo.set(this.currentBlub.x, this.currentBlub.y);
        // this.line.lineTo(x,y);
    }

    drawField() {
        for (let i = 0; i < this.blobDimensionCount; i++) {
            const x = this.spacing * i;

            for (let j = 0; j < this.blobDimensionCount; j++) {
                let blob =  new Blob(game.dataStorage.blobColorsMatrix[i][j]);
                const y = this.spacing * j;

                blob.position.set(x, y);
                this.addChild(blob);
            }
        }
    }

    // initLevel() {
    //     for (let blobSettings of level) {
    //         const blob = new Blob(blobSettings.color);
    //         blob.position.set(blobSettings.x * this.spacing, blobSettings.y * this.spacing)
    //
    //         this.blobByPosition[x][y] = blob;
    //
    //         blob.on('pointerdown', this.selectBlob.bind(this, blob));
    //     }
    // }

    selectBlob(blob) {
        if (this.currentBlub && this.currentBlub.id !== blob.id) {
            this.blobChain.push(this.currentBlub);
            this.currentBlub = blob;
        }
    }
}