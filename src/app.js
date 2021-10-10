import * as PIXI from 'pixi.js';
import Game from "./Game";
//Нужно для отладки, потом удалить!!!
import {Utils} from "./Blob";

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}

const loader = PIXI.Loader.shared;

const game = new Game({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    transparent: false,
    resolution: 1,
    backgroundColor: 0xfef8eb,
    position: "absolute",
    display: "block",
});
game.renderer.autoDensity = true;
game.resizeTo = window;
document.body.appendChild(game.view);
window.game = game;

//Нужно для отладки, потом удалить!!!
window.Utils = Utils;

loader
    .add("images/atlas.json")
    .load(game.init.bind(game))


