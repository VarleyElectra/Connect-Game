import * as PIXI from 'pixi.js';

export default class Task extends PIXI.Container {
    constructor(blob, currentTaskCount, maxTaskCount, textStyle) {
        super();
        this.blob = blob;
        this.blob.interactive = false;
        this.addChild(blob);

        this.currentTaskCount = currentTaskCount;
        this.maxTaskCount = maxTaskCount;
        this.textStyle = textStyle;
        this.text = new PIXI.Text(`${this.currentTaskCount}/${this.maxTaskCount}`, this.textStyle);
        this.text.anchor.set(0.5, 0);
        this.addChild(this.text);
        this.text.position.set(0, this.blob.height / 2);
    }
}