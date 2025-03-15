import { IGame } from "./game.interface";
import { Renderer } from "./graphics/renderer";
import { Scene } from "./vecxy";

export class Engine {
    private readonly _renderer: Renderer;
    private readonly _game: IGame;

    public constructor(game: IGame) {
        this._renderer = new Renderer("game-canvas");
        this._game = game;
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
        this._renderer.render();
    }
}
