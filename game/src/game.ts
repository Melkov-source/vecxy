import { Engine, IGame, Node, Scene } from "vecxy";
import { Bird } from "./bird";

class Game implements IGame {
    private _bird: Bird | null = null;

    public async start(): Promise<void> {
        this._bird = Bird.create();
    }

    public update(): void {

    }
}

const game = new Game();

const engine = new Engine(game);

engine.run();