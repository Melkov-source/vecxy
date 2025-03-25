import { Engine, IGame, Screen } from "vecxy";
import { Bird } from "./bird";
import { Backround } from "./background";
import { Ground } from "./ground";
import { HTMLUI, POROPERTY_TYPE, VIEW_TYPE, _decorator } from "htmlui";
import { PoolObject } from "./pool.object";
import { Pipe } from "./pipe";

const { property } = _decorator;

class Game implements IGame {
    private _background: Backround | null = null;
    private _bird: Bird | null = null;
    private _grounds: Ground[] = [];
    
    @property(POROPERTY_TYPE.NUMBER, VIEW_TYPE.SLIDER, -10, 0) 
    private _ground_speed = -2;

    private _ground_width = 336 * 1.72;
    private numGrounds = 2;
    
    private declare _pipes_pool: PoolObject<Pipe>;

    private _pipes: Pipe[] = [];
    private _pipe_spawn_timer = 0;
    private _pipe_spawn_interval = 120; // Интервал в кадрах

    public async start(): Promise<void> {
        HTMLUI.init();
        HTMLUI.createGroup("Game").bindProperties(this);

        this._background = Backround.create();
        this._bird = Bird.create();

        for (let i = 0; i < this.numGrounds; i++) {
            const ground = Ground.create();
            ground.node.transform.position.x = i * this._ground_width;
            this._grounds.push(ground);
        }

        this._pipes_pool = new PoolObject({
            create: () => Pipe.create(),
            get: (pipe: Pipe) => pipe.node.setAtive(true),
            realease: (pipe: Pipe) => pipe.node.setAtive(false)
        });
    }

    public update(): void {
        HTMLUI.update();
        this._updateGround();
        this._updatePipes();
    }

    private _updateGround(): void {
        for (let ground of this._grounds) {
            ground.node.transform.position.x += this._ground_speed;
            ground.node.transform.position.x = Math.round(ground.node.transform.position.x);

            if (ground.node.transform.position.x <= -this._ground_width) {
                const maxX = Math.max(...this._grounds.map(g => g.node.transform.position.x));
                ground.node.transform.position.x = maxX + this._ground_width - 3;
            }
        }
    }

    private _updatePipes(): void {
        this._pipe_spawn_timer++;
        if (this._pipe_spawn_timer >= this._pipe_spawn_interval) {
            this._spawnPipes();
            this._pipe_spawn_timer = 0;
        }

        const remove_pipes: Pipe[] = [];
        for (const pipe of this._pipes) {
            pipe.node.transform.position.x += this._ground_speed;
            pipe.node.transform.position.x = Math.round(pipe.node.transform.position.x);

            if (pipe.node.transform.position.x <= -this._ground_width) {
                remove_pipes.push(pipe);
            }
        }

        for (const pipe of remove_pipes) {
            this._pipes_pool.release(pipe);
            this._pipes.splice(this._pipes.indexOf(pipe), 1);
        }
    }

    private _spawnPipes(): void {
        const screen_height = Screen.height;
        const ground_height = 112 * 1.72;  // Высота земли
        const pipe_height = 320;  // Высота трубы
        const gap = this.getRandom(180, 250);  // Зазор между трубами
    
        // Сместим трубы относительно экрана с учетом зазора
    
        // Нижняя труба - она прижата к земле
        const pipe_down = this._pipes_pool.get();
        pipe_down.node.transform.position.x = Screen.width + 100;  // Начало появления справа
        pipe_down.node.transform.position.y = ground_height + pipe_height / 2;  // Нижняя труба прижата к земле
    
        // Верхняя труба - она прижата к верхней части экрана с учетом зазора
        const pipe_up = this._pipes_pool.get();
        pipe_up.node.transform.position.x = pipe_down.node.transform.position.x;  // Та же X координата
        pipe_up.node.transform.position.y = screen_height - (pipe_height / 2);  // Верхняя труба прижата к верхней границе экрана
    
        // Позиционируем верхнюю трубу с учетом зазора
        const pipe_up_y = pipe_down.node.transform.position.y - gap - pipe_height;
    
        // Устанавливаем зазор между трубами, чтобы верхняя труба располагалась правильно
        pipe_up.node.transform.position.y = pipe_up_y;
    
        // Поворот верхней трубы
        pipe_up.node.transform.rotation = 0;  // Поворот верхней трубы, чтобы она была "перевернута"
        pipe_down.node.transform.rotation = 180;  // Поворот верхней трубы, чтобы она была "перевернута"
    
        // Добавляем трубы в список
        this._pipes.push(pipe_down, pipe_up);
    }

    private getRandom(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}

const game = new Game();
const engine = new Engine(game);
engine.run();