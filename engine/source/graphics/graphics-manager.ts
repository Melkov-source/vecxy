import {Canvas} from "./canvas.js";
import {WebGL} from "./webgl.js";

export class GraphicsManager {
    private readonly _canvas: Canvas;
    private readonly _webgl: WebGL;

    public constructor() {
        this._canvas = new Canvas("game-canvas", {
            height: window.innerHeight,
            width: window.innerWidth
        });

        this._webgl = this._canvas.createWebGL();
    }
}