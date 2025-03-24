import { Engine, IGame, Node, Scene } from "vecxy";
import { Bird } from "./bird";
import { HTMLUI } from "htmlui";
import { Backround } from "./background";

class Game implements IGame {
    private _background: Backround | null = null;
    private _bird: Bird | null = null;

    public async start(): Promise<void> {
        HTMLUI.init();

        this._background = Backround.create();
        this._bird = Bird.create();
    }

    public update(): void {
        HTMLUI.update();
    }
}

const game = new Game();

const engine = new Engine(game);

engine.run();