import * as PIXI from 'pixi.js';

export default class StraightLine extends PIXI.Graphics {
    constructor(points, lineSize, lineColor) {
        super();

        this.lineWidth = lineSize || 5;
        this.lineColor = lineColor || "0x000000";

        this.points = points;

        this.lineStyle(this.lineWidth, this.lineColor);

        this.moveTo(points[0], points[1]);
        this.lineTo(points[2], points[3]);
    }

    updatePoints(p) {
        let points = (this.points = p.map(
            (val, index) => val || this.points[index]
        ));

        this.clear();
        this.lineStyle(this.lineWidth, this.lineColor);
        this.moveTo(points[0], points[1]);
        this.lineTo(points[2], points[3]);
    }
}