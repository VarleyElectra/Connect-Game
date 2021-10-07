import * as PIXI from 'pixi.js';

const BLOB_COLORS = {
    BLUE: 'blue',
    RED: 'red',
    GREEN: 'green',
    ORANGE: 'orange',
    VIOLET: 'violet'
}

const Utils = {
    getBlobTextureByColor (color) {
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
    }
}

export default class Blob extends PIXI.Sprite {
    constructor (color) {
        const texture = Utils.getBlobTextureByColor(color);
        super(texture);

        this.id = Symbol();
        this.interavtive = true;
        this.buttonMode = true;
        this.color = color;
        this.on("pointerup", this.doPointerUp);
        this.on("pointerdown", this.doPointerDown);
    }

    doPointerUp() {
        this.scale.x /= 2;
        this.scale.y /= 2;
    }

    doPointerDown() {
        this.scale.x *= 2;
        this.scale.y *= 2;
    }
}
