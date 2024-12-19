import {WebGL} from "./webgl";

const CANVAS_NODE_TYPE: string = "CANVAS";
const WEBGL_CONTEXT: string = "webgl";

export interface ICanvasOptions {
    width: number,
    height: number
}

export class Canvas {
    private readonly _htmlCanvasElement: HTMLCanvasElement;

    public constructor(id: string, options: ICanvasOptions) {
        const element: HTMLElement = document.getElementById(id);

        if (!element) {
            throw new Error(`Not found canvas in DOM by id: ${id}`)
        }

        if (element.nodeName !== CANVAS_NODE_TYPE) {
            throw new Error(`Element canvas by id: ${id} no equals canvas type`)
        }

        this._htmlCanvasElement = element as HTMLCanvasElement;

        this.setWidth(options.width);
        this.setHeight(options.height);
    }

    public createWebGL(): WebGL {
        const webgl_rendering_context: WebGLRenderingContext | null = this.getWebGL__RenderingContext();

        if (!webgl_rendering_context) {
            throw new Error("WebGL not supported in current browser!");
        }

        const webgl: WebGL = new WebGL(webgl_rendering_context);

        return webgl;
    }

    public setWidth(width: number): void {
        this._htmlCanvasElement.width = width;
    }

    public getWidth(): number {
        return this._htmlCanvasElement.width;
    }

    public setHeight(height: number): void {
        this._htmlCanvasElement.height = height;
    }

    public getHeight(): number {
        return this._htmlCanvasElement.height;
    }

    private getWebGL__RenderingContext(): WebGLRenderingContext | null {
        return this._htmlCanvasElement.getContext(WEBGL_CONTEXT) as WebGLRenderingContext | null;
    }
}