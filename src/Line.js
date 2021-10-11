import * as PIXI from 'pixi.js';

export default class Line extends PIXI.Graphics {
    constructor(points, lineSize, lineColor) {
        super();

        let s = (this.lineWidth = lineSize || 5);
        let c = (this.lineColor = lineColor || "0x000000");

        this.points = points;

        this.lineStyle(s, c);

        this.moveTo(points[0], points[1]);
        this.lineTo(points[2], points[3]);
    }

    updatePoints(p) {
        let points = (this.points = p.map(
            (val, index) => val || this.points[index]
        ));
        console.log(p);
        let s = this.lineWidth,
            c = this.lineColor;

        this.clear();
        this.lineStyle(s, c);
        this.moveTo(points[0], points[1]);
        this.lineTo(points[2], points[3]);
    }
}