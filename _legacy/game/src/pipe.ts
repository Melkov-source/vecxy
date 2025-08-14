import { AssetManager, AsyncUtils, Component, Node, Scene, SpriteRenderer } from "vecxy";

export class Pipe extends Component {
    private declare _sprite_renderer: SpriteRenderer;

    public is_loaded: boolean = false;

    public static create(): Pipe {
        const node = new Node({
            parent: Scene.current,
            components: [
                SpriteRenderer,
                Pipe
            ]
        });

        return node.getComponent(Pipe)!;
    }

    public async start(): Promise<void> {
        this._sprite_renderer = this.node.getComponent(SpriteRenderer)!;

        await AsyncUtils.wait(0.1);
        
        const sprite = await AssetManager.loadSpriteAsync("./assets/sprites/pipe-green.png");

        this._sprite_renderer.setSprite(sprite);

        this.is_loaded = true;
    }
}