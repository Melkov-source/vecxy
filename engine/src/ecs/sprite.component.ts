import { IRenderTarget } from "../graphics/renderer/render-target.interface";
import { Sprite, Vector2 } from "../vecxy";
import { Component } from "./component";

export class SpriteComponent extends Component {
    private declare _sprite: Sprite;

    public constructor() {
        super();

        this._sprite = new Sprite();
    }

    public render(render_target: IRenderTarget): void {
        render_target.draw(this._sprite);
    }

    public setSize(size: Vector2) {
        this._sprite.size = size;
    }

}