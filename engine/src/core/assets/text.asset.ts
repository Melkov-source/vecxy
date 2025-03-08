import { Asset } from "./asset";

export class TextAsset extends Asset {
    private declare _text: string;

    public constructor(path: string) {
        super(path);
    }

    public read(): string {
        return this._text;
    }
}