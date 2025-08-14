import { HTMLUI } from "htmlui";
import { AssetManager, Component, Node, Scene, SpriteRenderer, Screen, AsyncUtils, Vector2 } from "vecxy";

export class Ground extends Component {
    private declare _sprite_renderer: SpriteRenderer;

    public static create(): Ground {
        const node = new Node({
            parent: Scene.current,
            components: [
                SpriteRenderer,
                Ground
            ]
        });

        return node.getComponent(Ground)!;
    }

    public async start(): Promise<void> {
        await AsyncUtils.wait(0.1);
        
        this._sprite_renderer = this.node.getComponent(SpriteRenderer)!;

        const sprite = await AssetManager.loadSpriteAsync("./assets/sprites/base.png");

        this._sprite_renderer.setSprite(sprite);

        const height_half = Screen.height / 2;

        const height_sprite_half = (sprite.texture.height * 1.72) / 2;

        console.log(sprite.texture.height);

        const y_pos = height_half - height_sprite_half;

        this.node.transform.position.y = -y_pos;

        this.node.transform.scale = new Vector2(1.72, 1.72);

        const t = HTMLUI.createGroup("test");

        t.bindProperties(this.node.transform.scale);
    }
}