import { HTMLUI, POROPERTY_TYPE, VIEW_TYPE, _decorator } from "htmlui";

const { property } = _decorator;

export class Vector2 {
    public static one(): Vector2 { return new Vector2(1, 1); }
    public static zero(): Vector2 { return new Vector2(0, 0); }

    @property(POROPERTY_TYPE.NUMBER, VIEW_TYPE.KEY_VALUE, 0, 100) public declare x: number;
    @property(POROPERTY_TYPE.NUMBER, VIEW_TYPE.KEY_VALUE, 0, 100) public declare y: number;

    public constructor();
    public constructor(vector: Vector2)
    public constructor(x: number, y: number)

    public constructor(...paramters: any[]) {
        const count = paramters.length;

        switch (count) {
            case 0:
                this.x = 0;
                this.y = 0;
                break;

            case 1:
                const vector: Vector2 = paramters[0];

                this.x = vector.x;
                this.y = vector.y;
                break;

            case 2:
                this.x = paramters[0];
                this.y = paramters[1];
                break;

        }
    }

    public set(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }


    public getLength(): number {
        const length = Math.sqrt(this.x ** 2 + this.y ** 2);

        return length;
    }

    public toArray(): number[] {
        return [this.x, this.y];
    }

    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }
}