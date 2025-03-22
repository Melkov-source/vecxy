import { Engine, IGame, Node, Scene } from "vecxy";
import { Bird } from "./bird";
import { HTMLUI } from "htmlui";

class Game implements IGame {
    private _bird: Bird | null = null;
    private _bird_2: Bird | null = null;

    public async start(): Promise<void> {
        HTMLUI.init();

        const canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;
        // Размеры птички
        const birdWidth = 128;
        const birdHeight = 128;

        // Паддинг
        const padding = 1;

        // Размеры канваса
        const canvasWidth = canvas.clientWidth;
        const canvasHeight = canvas.clientHeight;

        // Рассчитываем количество птичек по ширине и высоте с учетом паддинга
        const birdsInRow = Math.floor((canvasWidth - padding) / (birdWidth + padding));
        const birdsInColumn = Math.floor((canvasHeight - padding) / (birdHeight + padding));

        // Размещение птичек
        let birds: Bird[] = [];

        // Начинаем от верхнего левого угла экрана
        for (let row = 0; row < birdsInColumn; row++) {
            for (let col = 0; col < birdsInRow; col++) {
                const bird = Bird.create();
                // Размещение птичек с учетом паддинга
                bird.node.transform.position.x = col * (birdWidth + padding); // Без смещения по центру
                bird.node.transform.position.y = row * (birdHeight + padding); // Без смещения по центру

                birds.push(bird);
                // Можно добавить код отрисовки птички на канвасе
                // Например:
                // bird.draw(ctx);
            }
        }
    }

    public update(): void {
        HTMLUI.update();
    }
}

const game = new Game();

const engine = new Engine(game);

engine.run();