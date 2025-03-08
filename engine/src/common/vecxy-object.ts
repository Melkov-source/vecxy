export class VecxyObject {
    private static _GLOBAL_ID: number = 0;

    private _id: number;

    public constructor() {
        this._id = VecxyObject._GLOBAL_ID++;
    }

    public getId(): number {
        return this._id;
    }
}