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

    public apply(matrix: Float32Array): void {
        this._shader.use();

        // Получение и привязка атрибутов
        const a_position = this._shader.getAttribute('a_position');
        GL.ctx.vertexAttribPointer(a_position.location, 2, GL.ctx.FLOAT, false, 4 * 4, 0);
        GL.ctx.enableVertexAttribArray(a_position.location);

        const a_texture_coords = this._shader.getAttribute('a_texture_coords');
        GL.ctx.vertexAttribPointer(a_texture_coords.location, 2, GL.ctx.FLOAT, false, 4 * 4, 2 * 4);  // Сдвиг на 2 элемента
        GL.ctx.enableVertexAttribArray(a_texture_coords.location);

        // Активируем текстуру и передаем в шейдер
        this._texture?.activate();  // Передаем текстуру в активный канал
        const u_texture = this._shader.getUniform('u_texture');
        GL.ctx.uniform1i(u_texture.location, 0);  // Текстура 0

        // Передача цвета в шейдер
        const u_color = this._shader.getUniform('u_color');
        GL.ctx.uniform4fv(u_color.location, this._color.toUint8Array());

        // Передача матрицы трансформации
        const u_transform_matrix = this._shader.getUniform('u_transform_matrix');
        GL.ctx.uniformMatrix3fv(u_transform_matrix.location, false, matrix);
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
