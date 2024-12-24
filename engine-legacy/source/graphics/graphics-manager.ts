import {Canvas} from "./canvas.js";

export class GraphicsManager {
    private readonly _canvas: Canvas;
    private readonly _gl: WebGLRenderingContext;

    public constructor() {
        this._canvas = new Canvas("game-canvas", {
            height: window.innerHeight,
            width: window.innerWidth
        });

        this._gl = this._canvas.getWebGL();
    }

    public initialize(): void {
        this._gl.viewport(
            0,
            0,
            this._canvas.getWidth(),
            this._canvas.getHeight()
        );

        this._gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
    }
}