import * as PIXI from 'pixi.js';
import {Blob, Utils} from './Blob.js'

export default class GameField extends PIXI.Container {
    constructor(spacing, blobDimensionCount) {
        super();
        this.spacing = spacing;
        this.blobDimensionCount = blobDimensionCount;

        this.currentBlub = null;
        this.blobChain = [];

        this.interactive = true;

        // const line = new PIXI.Graphics();
        // line.lineStyle({width: 4, color: 0xFFFFFF, alpha: 1});
        // line.position.set(0,0);
        // this.addChild(line);
        // this.line = line;

        this.blobByPosition = [];
    }

    init() {
        this.drawField();
        // this.on('pointermove', this.pointermove.bind(this));
        // this.on('pointerup', () => console.log('pointerUp'));
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

    // selectBlob(blob) {
    //     if (this.currentBlub && this.currentBlub.id !== blob.id) {
    //         this.blobChain.push(this.currentBlub);
    //         this.currentBlub = blob;
    //     }
    // }

    // pointermove (event) {
    //     const {x, y} = event.position;
    //
    //     if (
    //         (Math.abs(x - this.currentBlub.x - this.spacing) < this.currentBlub.width) &&
    //         (Math.abs(y - this.currentBlub.y) < this.currentBlub.y)
    //     ) {
    //         const blob = this.blobByPosition[Math.floor(x / this.spacing)][Math.floor(y / this.spacing)];
    //
    //         if (blob.color === this.currentBlub.color) {
    //             this.blobChain.push(this.currentBlub);
    //             this.currentBlub = blob;
    //         }
    //     }
    //
    //     this.line.clear();
    //     this.line.moveTo.set(this.currentBlub.x, this.currentBlub.y);
    //     this.line.lineTo(x,y);
    // }
}