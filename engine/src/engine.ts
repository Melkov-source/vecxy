import { Scene } from "./ecs/scene";
import { IGame } from "./game.interface";
import { GL } from "./graphics/gl";
import { ShaderManager } from "./graphics/shader.manager";
import { TextureManager } from "./graphics/texture.manager";

export class Engine {
    private readonly _gl: GL;
    private readonly _game: IGame;

    public constructor(game: IGame) {
        this._gl = new GL("game-canvas");
        this._game = game;

        new ShaderManager();
        new TextureManager();
    }

    public run(): void {
        const scene = new Scene("internal");
        Scene.current = scene;

        this._game.start();

        this.loop();
    }

    private loop(): void {
        this.events();
        this.update();
        this.render();

        requestAnimationFrame(this.loop.bind(this));
    }

    private events(): void {
    }

    private update(): void {
        Scene.current?.update(0);
        
        this._game.update();
    }

    private render(): void {
        this._gl.render();
    }
}
