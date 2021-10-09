import * as PIXI from 'pixi.js';

export default class Task extends PIXI.Container {
    constructor(blob, currentTaskCount, maxTaskCount, textStyle) {
        super();
        this.blob = blob;
        this.blob.interactive = false;
        this.addChild(blob);

        this._currentTaskCount = currentTaskCount;
        this.MaxTaskCount = maxTaskCount;
        this.textStyle = textStyle;
        this.text = new PIXI.Text(`${currentTaskCount}/${maxTaskCount}`, this.textStyle);
        this.text.anchor.set(0.5, 0);
        // this.text.position.set(
        //     this.blob.x,
        //     this.blob.height - this.text.height
        // );
        this.addChild(this.text);
        this.text.position.set(0, this.blob.height / 2);
        // currentTask1Message.position.set(panel.width / 2 - currentTask1Message.width / 2 - 35,
        //     panel.height - currentTask1Message.height - 10);
    }

    get currentTaskCount() {
        return this._currentTaskCount;
    }

    set currentTaskCount(newVal) {
        if ((this._currentTaskCount + newVal) > this.MaxTaskCount) {
            return ;
        }
        this._currentTaskCount = newVal;
    }
}