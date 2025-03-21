import { AssetManager, Color, Component, Scene, SpriteRenderer, Node, Sprite, Vector2, Logger, AsyncUtils } from "vecxy";

export class Bird extends Component {
    private readonly _logger: Logger = new Logger(Bird.name);;

    private declare _sprite_renderer: SpriteRenderer;
    private  _sprites: Sprite[] = [];

    public static create(): Bird {
        const node = new Node({
            parent: Scene.current,
            components: [
                SpriteRenderer,
                Bird
            ]
        });

        return node.getComponent(Bird)!;
    }

    public async start(): Promise<void> {
        await AsyncUtils.wait(0.1);
        this._logger.trace("start!");

        this._sprite_renderer = this.node.getComponent(SpriteRenderer)!;

        const sprites_load = Promise.all([
            AssetManager.loadSpriteAsync("./assets/sprites/redbird-midflap.png"),
            AssetManager.loadSpriteAsync("./assets/sprites/redbird-downflap.png"),
            AssetManager.loadSpriteAsync("./assets/sprites/redbird-upflap.png"),
        ]);

        this._sprites = await sprites_load;

        this._sprite_renderer.setSprite(this._sprites[0]);

        this.node.transform.scale = new Vector2(1, 1);

        this.node.transform.rotation = 0;

        window.addEventListener("keydown", (event) => this.onKeyDown(event));

        this.setupGUI();
    }

    private _scaleX: number = 1;
    private _scaleY: number = 1;
    private _positionY: number = 0;
    private _positionX: number = 0;
    private _rotation: number = 0;

    private setupGUI(): void {
        const gui = new (window as any).dat.GUI();

        // Панель для трансформации
        const transformFolder = gui.addFolder(`Transform: ${this.node.id}`);

        // Настройка масштаба
        transformFolder.add(this, '_scaleX', -5, 5).name('Scale X').onChange((value: number) => {
            this.node.transform.scale.x = value;
        });

        transformFolder.add(this, '_scaleY', -5, 5).name('Scale Y').onChange((value: number) => {
            this.node.transform.scale.y = value;
        });

        transformFolder.add(this, '_positionY', -1000, 1000).name('Position Y').onChange((value: number) => {
            this.node.transform.position.y = value;
        });

        transformFolder.add(this, '_positionX', -1000, 1000).name('Position X').onChange((value: number) => {
            this.node.transform.position.x = value;
        });

        // Настройка поворота
        transformFolder.add(this, '_rotation', -360, 360).name('Rotation').onChange((value: number) => {
            this.node.transform.rotation = value;
        });

        transformFolder.add(this, '_gravity', -500, 500).name('_gravity').onChange((value: number) => {
            this._gravity = value;
        });

        transformFolder.add(this, '_jumpForce', -500, 500).name('_jumpForce').onChange((value: number) => {
            this._jumpForce = value;
        });

        transformFolder.add(this, '_maxRotation', -360, 360).name('_maxRotation').onChange((value: number) => {
            this._maxRotation = value;
        });

        transformFolder.add(this, '_speed', 0, 360).name('_speed').onChange((value: number) => {
            this._speed = value;
        });

        // Разворачиваем панель трансформации
        transformFolder.open();
    }

    private _gravity: number = 0.2;
    private _velocityY: number = 0; 
    private _jumpForce: number = 7;
    private _maxRotation: number = 45; // Максимальный угол наклона (в градусах)
    private _firstSpace: boolean = false;

    private _speed = 7.5; // Скорость переключения спрайтов (в кадрах)
    private _currentIndex = 0;
    private _frameCount = 0;
    
    public update(): void {
        if(this._sprites.length === 0) {
            return;
        }

        this._frameCount++;

        if (this._frameCount >= this._speed) {
            this._frameCount = 0;
            this._currentIndex = (this._currentIndex + 1) % this._sprites.length;
            this._sprite_renderer.setSprite(this._sprites[this._currentIndex]);
        }

        if(this._firstSpace === false) {
            return;
        }

        var current_position = this.node.transform.position;
    
        // Применяем гравитацию к скорости
        this._velocityY -= this._gravity;
    
        // Обновляем позицию
        var new_y = current_position.y + this._velocityY;
        this.node.transform.position.set(current_position.x, new_y);
    
        // Рассчитываем угол поворота (наклон птицы)
        let rotation = (this._velocityY / this._jumpForce) * this._maxRotation;
        rotation = Math.max(-this._maxRotation, Math.min(this._maxRotation, rotation)); // Ограничиваем наклон

        console.log(JSON.stringify(this.node.transform))
    
        // Применяем поворот
        this.node.transform.rotation = rotation;
    }
    
    public onKeyDown(event: KeyboardEvent): void {
        if (event.code === "Space") {
            this._velocityY = this._jumpForce; // Применяем импульс вверх

            this._firstSpace = true;
        }
    }
}