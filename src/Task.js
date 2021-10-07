import * as PIXI from 'pixi.js';

export default class Task extends PIXI.Sprite {
    constructor(texture, currentTaskCount, MaxTaskCount, textStyle) {
        super(texture);
        this._currentTaskCount = currentTaskCount;
        this.MaxTaskCount = MaxTaskCount;
        this.textStyle = textStyle;
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