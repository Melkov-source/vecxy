import { Vector2 } from "../math/vector2";

export class Transform {
    public position: Vector2;
    public scale: Vector2;
    public rotation: number;

    public constructor() {
        this.position = Vector2.zero();
        this.scale = Vector2.one();
        this.rotation = 0;
    }
}