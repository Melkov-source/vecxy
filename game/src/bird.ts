import { HTMLUI, POROPERTY_TYPE, VIEW_TYPE, _decorator } from "htmlui";
import { AssetManager, Component, Scene, SpriteRenderer, Node, Sprite, Vector2, Logger, AsyncUtils } from "vecxy";

const { property } = _decorator;

export class Bird extends Component {
    private readonly _logger: Logger = new Logger(Bird.name);;

    private declare _sprite_renderer: SpriteRenderer;

    private _sprites: Sprite[] = [];

    // Controller
    @property(POROPERTY_TYPE.NUMBER, VIEW_TYPE.KEY_VALUE, 0, 100) private _gravity: number = 0.2;
    @property(POROPERTY_TYPE.NUMBER, VIEW_TYPE.KEY_VALUE, 0, 100) private _jumpForce: number = 7;
    @property(POROPERTY_TYPE.NUMBER, VIEW_TYPE.KEY_VALUE, 0, 100) private _maxRotation: number = 45;

    @property(POROPERTY_TYPE.NUMBER, VIEW_TYPE.KEY_VALUE, 0, 100) private _velocityY: number = 0;
    private _firstSpace: boolean = false;

    // Animation
    @property(POROPERTY_TYPE.NUMBER, VIEW_TYPE.SLIDER, 0, 10) private _speedAnimation = 7.5;

    private _currentIndex = 0;
    private _frameCount = 0;


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

    private setupGUI(): void {
        const g_bird = HTMLUI.createGroup(`Bird: ${this.node.id}`);
        const g_transform = HTMLUI.createGroup(`Transform`);
        const g_position = HTMLUI.createGroup(`Position`);
        const g_scale = HTMLUI.createGroup(`Scale`);

        g_bird.bindProperties(this);
        g_transform.bindProperties(this.node.transform);
        g_position.bindProperties(this.node.transform.position);
        g_scale.bindProperties(this.node.transform.scale);
    }

    public update(): void {
        if (this._sprites.length === 0) {
            return;
        }

        this._frameCount++;

        if (this._frameCount >= this._speedAnimation) {
            this._frameCount = 0;
            this._currentIndex = (this._currentIndex + 1) % this._sprites.length;
            this._sprite_renderer.setSprite(this._sprites[this._currentIndex]);
        }

        if (this._firstSpace === false) {
            return;
        }

        var current_position = this.node.transform.position;

        this._velocityY -= this._gravity;

        var new_y = current_position.y + this._velocityY;
        this.node.transform.position.set(current_position.x, new_y);

        let rotation = (this._velocityY / this._jumpForce) * this._maxRotation;
        rotation = Math.max(-this._maxRotation, Math.min(this._maxRotation, rotation));

        this.node.transform.rotation = rotation;
    }

    public onKeyDown(event: KeyboardEvent): void {
        if (event.code === "Space") {
            this._velocityY = this._jumpForce;

            this._firstSpace = true;
        }
    }
}