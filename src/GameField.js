import * as PIXI from 'pixi.js';
import {Blob} from './Blob.js';
import StraightLine from "./StraightLine";
import {BLOB_COLORS_DIGITS} from "./constants"

export default class GameField extends PIXI.Container {
    constructor(spacing, blobDimensionCount) {
        super();
        this.spacing = spacing;
        this.blobDimensionCount = blobDimensionCount;
        this.width = 600;
        this.height = 600;

        this.currentBlob = null;
        this.blobChain = [];

        this.interactive = true;
        this.lines = []

        this.isDown = false;
        this.sortableChildren = true;
    }

    init() {
        this.drawField();
        this.on('pointermove', this.move.bind(this));
        this.on('pointerdown', this.pointerDown.bind(this));
        this.on('pointerup', this.pointerUp.bind(this));
    }

    pointerUp(e) {
        this.isDown = false;
        this.lines.forEach(line => line.destroy());
        this.lines = [];
        if (this.blobChain.length >= 2) {
            this.blobChain.forEach(blob => blob.destroy());
        }
        this.blobChain = [];
        this.currentBlob = null;
    }

    pointerDown(e) {
        if (e.target instanceof Blob) {
            this.isDown = true;
            let line =  new StraightLine([e.target.x, e.target.y, e.target.x, e.target.y],
                10, BLOB_COLORS_DIGITS[e.target.color]);
            line.zIndex = -1;
            this.addChild(line);
            this.lines.push(line);
            this.currentBlob = e.target;
            this.blobChain = [this.currentBlob];
        }
    }

    get movingLine() {
        return this.lines[this.lines.length - 1];
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
        return blob.color === this.currentBlob.color && lastBlob.id !== blob.id && (
            blob.x === lastBlob.x && Math.abs(blob.y - lastBlob.y) === this.spacing || blob.y === lastBlob.y
        && Math.abs(blob.x - lastBlob.x) === this.spacing
        );
    }

    drawField() {
        for (let i = 0; i < this.blobDimensionCount; i++) {
            const x = this.spacing * i + 20;

            for (let j = 0; j < this.blobDimensionCount; j++) {
                let blob =  new Blob(game.dataStorage.blobColorsMatrix[i][j]);
                const y = this.spacing * j + 20;

                blob.position.set(x, y);
                this.addChild(blob);
            }
        }
    }
}