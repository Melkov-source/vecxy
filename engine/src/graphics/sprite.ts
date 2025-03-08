import { Vector2 } from "../math/vector2";
import { Color } from "./color";

export class Sprite {
    public position: Vector2;
    public scale: Vector2;
    public rotation: number;
    
    public color: Color;

    public constructor() {
        this.position = new Vector2(0, 0)
        this.scale = new Vector2(1, 1);
        this.rotation = 0;
        this.color = Color.white();
    }
}