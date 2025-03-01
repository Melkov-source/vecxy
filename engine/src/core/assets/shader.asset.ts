import { Asset } from "./asset";

export class ShaderAsset extends Asset {
    private readonly _text: string;

    public constructor(path: string, text: string) {
        super(path);

        this._text = text;
    }

    public read(): string {
        return this._text;
    }
}