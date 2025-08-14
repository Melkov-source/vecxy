export class Matrix2 {
    private readonly _elements: number[];

    public constructor() {
        this._elements = [
            1, 0,
            0, 1
        ];
    }

    public equals(matrix: Matrix2): boolean {
        const a11 = this._elements[0];
        const a12 = this._elements[1];
        const a21 = this._elements[2];
        const a22 = this._elements[3];

        const b11 = matrix._elements[0];
        const b12 = matrix._elements[1];
        const b21 = matrix._elements[2];
        const b22 = matrix._elements[3];

        return (
            a11 === b11 && a12 === b12 &&
            a21 === b21 && a22 === b22
        );
    }
}