import { IDrawable } from "./drawable.interface";

export interface IRenderTarget {
    ctx: WebGLRenderingContext | WebGL2RenderingContext;
    draw(drawable: IDrawable): void;
}