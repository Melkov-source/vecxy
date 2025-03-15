import { Texture } from "./texture";

export class TextureManager {
    public static get instance(): TextureManager {
        return this._instance;
    }

    private static _instance: TextureManager;

    private readonly _ctx: WebGL2RenderingContext;
    private readonly _texture: Texture[];

    private _current_texture: Texture | null = null;

    public constructor(ctx: WebGL2RenderingContext) {
        this._ctx = ctx;
        this._texture = [];

        TextureManager._instance = this;

        (window as any).texture_manager = this;
    }

    public create(image: HTMLImageElement): Texture {
        const texture = new Texture(this._ctx, image);

        texture.onDisposed.add(this.onDisposedTexture, this);
        texture.onBinded.add(this.onBindedTexture, this);

        texture.initialize();

        this._texture.push(texture);

        return texture;
    }

    private onBindedTexture(texture: Texture): void {
        this._current_texture = texture;
    }

    private onDisposedTexture(texture: Texture): void {
        const index = this._texture.indexOf(texture);

        if(index === -1) {
            return;
        }

        this._texture.splice(index, 1);

        if(this._current_texture === texture) {
            this._current_texture = null;
        }
    }
}