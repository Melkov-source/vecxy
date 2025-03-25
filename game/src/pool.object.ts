export class PoolObject<TObject> {
    private readonly _objects: TObject[] = [];

    private readonly _create: () => TObject;
    private readonly _get: (object: TObject) => void;
    private readonly _release: (object: TObject) => void;

    public constructor(parameters: {
        create: () => TObject,
        get: (object: TObject) => void,
        realease: (object: TObject) => void,
        // destroy: (object: TObject) => void - На данный момент не возможно удалить объект
    }
    ) {
        this._create = parameters.create;
        this._get = parameters.get;
        this._release = parameters.realease;
    }

    public get(): TObject {
        let object: TObject;

        if (this._objects.length === 0) {
            object = this._create();
        } else {
            object = this._objects.shift()!;
        }

        this._get(object);

        return object;
    }

    public release(object: TObject): void {
        this._release(object);

        this._objects.push(object);
    }
}