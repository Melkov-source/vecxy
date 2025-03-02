import { Renderer } from "../graphics/renderer";
import { WebGL } from "../graphics/webgl";

export class Engine {
    private readonly _renderer: Renderer;

    public constructor() {
        WebGL.init('game-canvas');

        this._renderer = new Renderer();
    }

    public async start(): Promise<void> {
        await this._renderer.render();
    }
}
