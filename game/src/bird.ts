import { AssetManager, Color, Component, Scene, SpriteRenderer, Node, Sprite, Vector2, Logger, AsyncUtils } from "vecxy";

export class Bird extends Component {
    private readonly _logger: Logger = new Logger(Bird.name);;

    private declare _sprite_renderer: SpriteRenderer;
    private declare _red_bird_sprite: Sprite;

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
        await AsyncUtils.wait(2);
        this._logger.trace("start!");

        this._sprite_renderer = this.node.getComponent(SpriteRenderer)!;

        this._red_bird_sprite = await AssetManager.loadSpriteAsync("./assets/sprites/favicon.ico");

        this._sprite_renderer.setSprite(this._red_bird_sprite);

        this.node.transform.scale = new Vector2(0.005, 0.005);

        this.node.transform.rotation = -30;
    }

    public update(): void {

    }
}