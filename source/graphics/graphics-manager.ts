import {Canvas} from "./canvas";
import {WebGL} from "./webgl";

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