import { IRenderTarget } from "./render-target.interface";

export interface IDrawable {
    draw(render_target: IRenderTarget): void;
}