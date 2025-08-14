import { Vector2 } from "./vector2";

export class Matrix3 {
    public readonly _value: number[];

    public constructor() {
        this._value = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ];
    }

    public translate(vector: Vector2): void {

    }

    public rotate(vector: Vector2): void {

    }

    public scale(vector: Vector2): void {

    }

    public equals(matrix: Matrix3): boolean {
        for (let m = 0, count = 3 * 3 - 3; m < count; m += 3) {
            const am0 = this._value[m];
            const am1 = this._value[m + 1];
            const am2 = this._value[m + 2];

            const bm0 = matrix._value[m];
            const bm1 = matrix._value[m + 1];
            const bm2 = matrix._value[m + 2];

            const equals = (am0 === bm0 && am1 === bm1 && am2 === bm2);

            if (equals === false) {
                return false;
            }
        }

        return true;
    }

    public is_identity(): boolean {
        const count = 3;

        for (let i = 0, ic = count * count - count; i < ic; i += 3) {
            for (let j = 0, jc = count; j < jc; j++) {
                const a = this._value[j + i];
                
                var result = i / count === j ? a === 1 : a === 0;

                if(result === false) {
                    return false;
                }
            }
        }

        return true;
    }
}