import { SceneSystem } from "../ecs/scene-system";
import { IGame } from "../game.interface";
import { Renderer } from "../graphics/renderer/renderer";

export class Engine {
    private declare _renderer: Renderer;

    private readonly _game: IGame;

    public constructor(game: IGame) {
        this._renderer = new Renderer();

        this._game = game;
    }

    public run(): void {
        window.onload = this.init.bind(this);
    }

    private init(): void {
        SceneSystem.initialize();

        this._game.start();

        this.loop();
    }

    private loop(): void {
        this.events();
        this.update();
        this.render();

        requestAnimationFrame(this.loop.bind(this));
    }

    private update(): void {
        this._game.update();
    }

    private render(): void {
        this._renderer.render();

        this._game.render();
    }

    private events(): void {
    }
}
