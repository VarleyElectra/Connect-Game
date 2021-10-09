import * as PIXI from 'pixi.js';
import Game from "./Game";
import {Utils} from "./Blob";

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}

const Application = PIXI.Application,
    Container = PIXI.Container,
    ParticleContainer = PIXI.ParticleContainer,
    loader = PIXI.Loader.shared,
    resources = PIXI.Loader.shared.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Graphics = PIXI.Graphics,
    TextStyle = PIXI.TextStyle,
    Text = PIXI.Text,
    Rectangle = PIXI.Rectangle;

// const app = new Application({
//         width: window.innerWidth,
//         height: window.innerHeight,
//         antialias: true,
//         transparent: false,
//         resolution: 1,
//         backgroundColor: 0xfef8eb,
//         position: "absolute",
//         display: "block",
//     }
// );

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
window.Utils = Utils;

loader
    .add("images/atlas.json")
    .load(game.init.bind(game))


