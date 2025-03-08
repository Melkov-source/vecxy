import { Renderer } from "../graphics/renderer/renderer";
import { WebGL } from "../graphics/renderer/webgl";

export class Engine {
    private readonly _renderer: Renderer;

    public constructor() {
        this._renderer = new Renderer();
    }

    public run(): void {
        window.onload = this.init.bind(this);
    }


    private init(): void {
        WebGL.init('game-canvas');

        this.loop();
    }

    private loop(): void {
        WebGL.resizeCanvas();

        this._renderer.render();

        requestAnimationFrame(this.loop.bind(this));
    }
}
