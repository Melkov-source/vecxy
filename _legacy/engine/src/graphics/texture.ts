import { Delegate } from "../common/delegate";
import { IDisposable } from "../common/disposable.interface";
import { GL as GL } from "./gl";

export class Texture implements IDisposable {
    public get width(): number { return this._image.width; }
    public get height(): number { return this._image.height; }

    public readonly onDisposed: Delegate<[Texture]> = new Delegate();
    public readonly onBinded: Delegate<[Texture]> = new Delegate();

    private readonly _image: HTMLImageElement;

    private readonly _texture: WebGLTexture;

    public constructor(image: HTMLImageElement) {
        this._image = image;

        this._texture = GL.ctx.createTexture();
        GL.ctx.pixelStorei(GL.ctx.UNPACK_FLIP_Y_WEBGL, true);
    }

    public initialize() {
        this.bind();

        GL.ctx.texImage2D(
            GL.ctx.TEXTURE_2D,
            0,
            GL.ctx.RGBA,
            GL.ctx.RGBA,
            GL.ctx.UNSIGNED_BYTE,
            this._image
        );

        // Настройка фильтрации текстуры
        GL.ctx.texParameteri(GL.ctx.TEXTURE_2D, GL.ctx.TEXTURE_MIN_FILTER, GL.ctx.LINEAR_MIPMAP_NEAREST);
        GL.ctx.texParameteri(GL.ctx.TEXTURE_2D, GL.ctx.TEXTURE_MAG_FILTER, GL.ctx.LINEAR);

        // Настройка обтравки текстуры
        GL.ctx.texParameteri(GL.ctx.TEXTURE_2D, GL.ctx.TEXTURE_WRAP_S, GL.ctx.CLAMP_TO_EDGE);
        GL.ctx.texParameteri(GL.ctx.TEXTURE_2D, GL.ctx.TEXTURE_WRAP_T, GL.ctx.CLAMP_TO_EDGE);

        GL.ctx.generateMipmap(GL.ctx.TEXTURE_2D);
    }

    public dispose(): void {
        GL.ctx.bindTexture(GL.ctx.TEXTURE_2D, null);

        GL.ctx.deleteTexture(this._texture);

        this.onDisposed.invoke(this);
    }

    public activate(): void {
        GL.ctx.activeTexture(GL.ctx.TEXTURE0);

        this.bind();
    }

    private bind(): void {
        GL.ctx.bindTexture(
            GL.ctx.TEXTURE_2D,
            this._texture
        );

        this.onBinded.invoke(this);
    }
}