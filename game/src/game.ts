import { Engine, IGame, Node, Scene } from "vecxy";
import { Bird } from "./bird";
import { Backround } from "./background";
import { Ground } from "./ground";

import { HTMLUI, POROPERTY_TYPE, VIEW_TYPE, _decorator } from "htmlui";


const { property } = _decorator;

class Game implements IGame {
    private _background: Backround | null = null;
    private _bird: Bird | null = null;
    private _grounds: Ground[] = [];

    @property(POROPERTY_TYPE.NUMBER, VIEW_TYPE.SLIDER, -10, 0) private groundSpeed = -2; // Скорость движения земли
    
    private groundWidth = 336 * 1.72; // Ширина одного блока земли
    private numGrounds = 2; // Количество блоков земли

    public async start(): Promise<void> {
        HTMLUI.init();

        HTMLUI
            .createGroup("Game")
            .bindProperties(this);

        this._background = Backround.create();

        // Создаём три блока земли
        for (let i = 0; i < this.numGrounds; i++) {
            const ground = Ground.create();
            ground.node.transform.position.x = i * this.groundWidth; // Размещаем их в ряд
            this._grounds.push(ground);
        }


        this._bird = Bird.create();
    }

    public update(): void {
        HTMLUI.update();
    
        // Двигаем землю влево
        for (let ground of this._grounds) {
            ground.node.transform.position.x += this.groundSpeed;
    
            // Округляем координату X, чтобы избежать микросдвигов
            ground.node.transform.position.x = Math.round(ground.node.transform.position.x);
    
            // Если земля ушла за левый край экрана с небольшим запасом, переносим её вправо
            if (ground.node.transform.position.x <= -this.groundWidth) {
                const maxX = Math.max(...this._grounds.map(g => g.node.transform.position.x));
                ground.node.transform.position.x = maxX + this.groundWidth - 3; // Убираем 1px зазора
            }
        }
    }
}

const game = new Game();

const engine = new Engine(game);

engine.run();