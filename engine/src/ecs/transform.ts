import { Vector2 } from "../math/vector2";
import { HTMLUI, POROPERTY_TYPE, VIEW_TYPE, _decorator } from "htmlui";

const { property } = _decorator;

export class Transform {
    public position: Vector2;
    public scale: Vector2;
    
    @property(POROPERTY_TYPE.NUMBER, VIEW_TYPE.KEY_VALUE, 0, 100) public rotation: number;

    public constructor() {
        this.position = Vector2.zero();
        this.scale = Vector2.one();
        this.rotation = 0;
    }

    public getWorldMatrix(): Float32Array {
        const position: Vector2 = this.position;
        const scale: Vector2 = this.scale;
        const rotation: number = this.rotation;

        const matrix = new Float32Array(9);

        const rotationInRadians = rotation * (Math.PI / 180);

        const cosR = Math.cos(rotationInRadians);
        const sinR = Math.sin(rotationInRadians);

        matrix[0] = cosR * scale.x;
        matrix[1] = sinR * scale.x;
        matrix[2] = 0

        matrix[3] = -sinR * scale.y;
        matrix[4] = cosR * scale.y;
        matrix[5] = 0

        matrix[6] = position.x;
        matrix[7] = position.y;
        matrix[8] = 1;

        return matrix;
    }
}