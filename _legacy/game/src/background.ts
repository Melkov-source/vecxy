import { AssetManager, AsyncUtils, Component, Node, Scene, SpriteRenderer, Vector2 } from "vecxy";

export class Backround extends Component {
    private declare _sprite_renderer: SpriteRenderer;

    public static create(): Backround {
        const node = new Node({
            parent: Scene.current,
            components: [
                SpriteRenderer,
                Backround
            ]
        });

        return node.getComponent(Backround)!;
    }

    public async start(): Promise<void> {
        await AsyncUtils.wait(0.1);

        this._sprite_renderer = this.node.getComponent(SpriteRenderer)!;

        const sprite = await AssetManager.loadSpriteAsync("./assets/sprites/background-day.png");

        this._sprite_renderer.setSprite(sprite);

        this.node.transform.scale = new Vector2(2, 2);
    }
}