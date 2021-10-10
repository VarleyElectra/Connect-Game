import * as PIXI from 'pixi.js';
import {BLOB_COLORS} from "./constants";


export const BlobUtils = {
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
}

export class Blob extends PIXI.Sprite {
    constructor (color) {
        const texture = BlobUtils.getBlobTextureByColor(color);
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
