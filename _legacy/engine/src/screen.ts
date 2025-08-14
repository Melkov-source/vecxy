export class Screen {
    private static _canvas: HTMLCanvasElement;

    public static get width(): number {
        return this._canvas.width;
    }

    public static get height(): number {
        return this._canvas.height;
    }

    public static setCanvas(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
    }
}