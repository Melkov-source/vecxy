import { Delegate } from "../common/delegate";
import { IDisposable } from "../common/disposable.interface";

export class Texture implements IDisposable {
    public readonly onDisposed: Delegate<[Texture]> = new Delegate();
    public readonly onBinded: Delegate<[Texture]> = new Delegate();

    private readonly _ctx: WebGL2RenderingContext;
    private readonly _image: HTMLImageElement;

    private readonly _texture: WebGLTexture;

    public constructor(ctx: WebGL2RenderingContext, image: HTMLImageElement) {
        this._ctx = ctx;
        this._image = image;

        this._texture = this._ctx.createTexture();
    }

    public initialize() {
        this.bind();

        this._ctx.texImage2D(
            this._ctx.TEXTURE_2D, 
            0, 
            this._ctx.RGBA,
            this._ctx.RGBA,
            this._ctx.UNSIGNED_BYTE,
            this._image
        );

        this._ctx.generateMipmap(this._ctx.TEXTURE_2D);
    }

    public dispose(): void {
        this._ctx.bindTexture(this._ctx.TEXTURE_2D, null);

        this._ctx.deleteTexture(this._texture);

        this.onDisposed.invoke(this);
    }

    private bind(): void {
        this._ctx.bindTexture(
            this._ctx.TEXTURE_2D, 
            this._texture
        );

        this.onBinded.invoke(this);
    }
}