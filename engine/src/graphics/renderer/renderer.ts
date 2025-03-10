import { SceneSystem } from "../../ecs/scene-system";
import { IGame } from "../../game.interface";
import { RenderCanvas } from "./render-canvas";

export class Renderer {
    private readonly _render_canvas: RenderCanvas;

    public constructor() {
        this._render_canvas = new RenderCanvas('game-canvas');
    }

    public render(): void {
        this._render_canvas.resize();
        this._render_canvas.clear();
        SceneSystem.render(this._render_canvas);
        this._render_canvas.render();
        this._render_canvas.display();
    }
}