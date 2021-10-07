import * as PIXI from 'pixi.js';

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

const app = new Application({
    width: window.innerWidth,         
    height: window.innerHeight,        
    antialias: true,    
    transparent: false, 
    resolution: 1,       
    backgroundColor: 0xfef8eb,
}
);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.resizeTo = window;
document.body.appendChild(app.view);

