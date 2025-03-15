import { Color } from "../../graphics/color";
import { Sprite } from "../../graphics/sprite";
import { Component } from "../component";
import { Node } from "../node";

export class SpriteRenderer extends Component {
    public sprite: Sprite | null = null;
    public declare color: Color;

    public constructor(node: Node) {
        super(node);

        this.color = Color.white();
    }
}