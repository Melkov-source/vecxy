import { Color } from "./color";
import { GL } from "./gl";
import { Shader } from "./shader";
import { Texture } from "./texture";

export class Material {
    private declare _color: Color;
    private declare _shader: Shader;
    private declare _texture: Texture | null;

    public constructor(shader: Shader) {
        this._shader = shader;
        this._color = Color.white();
    }

    public apply(): void {
        this._shader.use();

        this._texture?.activate();

        const u_texture = this._shader.getUniform('u_texture');
        GL.ctx.uniform1i(u_texture.location, 0);

        const u_color = this._shader.getUniform('u_color');
        GL.ctx.uniform4fv(u_color.location, this._color.toFloat32Array());
    }

    public getShader(): Shader {
        return this._shader;
    }

    public setTexture(texture: Texture): void {
        this._texture = texture;
    }

    public setColor(color: Color): void {
        this._color = color;
    }
}
