import { AssetManager, Color, Component, Scene, SpriteRenderer, Node } from "vecxy";

export class Bird extends Component {
    private declare _sprite_renderer: SpriteRenderer;

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
        this._sprite_renderer = this.node.addComponent(SpriteRenderer);

        const sprite = await AssetManager.loadSpriteAsync("./assets/sprites/redbird-midflap.png");

        this._sprite_renderer.sprite = sprite;
        this._sprite_renderer.color = Color.green();
    }
}