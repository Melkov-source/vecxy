import { Vector2 } from "../vecxy";

export class Vertex {
    public readonly position: Vector2;
    public readonly uv: Vector2;

    public constructor(position: Vector2, uv: Vector2) {
        this.position = position;
        this.uv = uv;
    }

    public toArray(): number[] {
        return [
            ...this.position.toArray(),
            ...this.uv.toArray()
        ];
    }

    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }
}