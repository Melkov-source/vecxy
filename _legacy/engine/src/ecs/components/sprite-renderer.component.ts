import { Color } from "../../graphics/color";
import { GL } from "../../graphics/gl";
import { Material } from "../../graphics/material";
import { Shader } from "../../graphics/shader";
import { BuiltinShader, ShaderManager } from "../../graphics/shader.manager";
import { Sprite } from "../../graphics/sprite";
import { Vertex } from "../../graphics/vertex";
import { Vector2 } from "../../math/vector2";
import { Component } from "../component";
import { Node } from "../node";

export class SpriteRenderer extends Component {
    private declare _shader: Shader;
    private declare _material: Material;
    private _sprite: Sprite | null = null;
    private _is_loaded: boolean = false;

    private _t_matrix: Float32Array = new Float32Array(0);
    private _p_matrix: Float32Array = new Float32Array(0);
    private _vertices: Vertex[] = [];

    private _vertex_buffer: WebGLBuffer | null = null;

    public constructor(node: Node) {
        super(node);
    }

    public async start(): Promise<void> {
        this._vertex_buffer = GL.ctx.createBuffer();

        this._shader = await ShaderManager.instance.createBuiltinAsync(BuiltinShader.SPRITE_2D);

        this._material = new Material(this._shader);

        this._is_loaded = true;
    }

    public update(dt: number): void {
        this._t_matrix = this.node.transform.getWorldMatrix();
        this._p_matrix = this.createProjectionMatrix();
    }

    public render(): void {
        if (this._is_loaded === false || this._sprite === null) {
            return;
        }

        this._material.apply();

        GL.ctx.bindBuffer(GL.ctx.ARRAY_BUFFER, this._vertex_buffer);

        const a_position = this._shader.getAttribute('a_position');
        GL.ctx.vertexAttribPointer(a_position.location, 2, GL.ctx.FLOAT, false, 4 * 4, 0);
        GL.ctx.enableVertexAttribArray(a_position.location);

        const a_texture_coords = this._shader.getAttribute('a_texture_coords');
        GL.ctx.vertexAttribPointer(a_texture_coords.location, 2, GL.ctx.FLOAT, false, 4 * 4, 2 * 4);
        GL.ctx.enableVertexAttribArray(a_texture_coords.location);

        const u_transform_matrix = this._shader.getUniform('u_transform_matrix');
        GL.ctx.uniformMatrix3fv(u_transform_matrix.location, false, this._t_matrix);

        const u_projection_matrix = this._shader.getUniform('u_projection_matrix');
        GL.ctx.uniformMatrix3fv(u_projection_matrix.location, false, this._p_matrix);

        GL.ctx.drawArrays(GL.ctx.TRIANGLES, 0, 6);
    }

    public setSprite(sprite: Sprite): void {
        this._sprite = sprite;
        this._material.setTexture(sprite.texture);

        this.calculateVertexes();
    }

    public setColor(color: Color): void {
        this._material.setColor(color);
    }

    private createProjectionMatrix(): Float32Array {
        const width = GL.ctx.canvas.width;
        const height = GL.ctx.canvas.height;

        // Параметры для ортографической проекции
        const left = -width / 2;
        const right = width / 2;
        const bottom = -height / 2;
        const top = height / 2;

        const near_clip = -1;
        const far_clip = 1;

        // Создаем матрицу проекции 3x3 (ортографическая)
        const matrix = new Float32Array(9);

        const lr = 1.0 / (left - right);
        const bt = 1.0 / (bottom - top);
        const nf = 1.0 / (near_clip - far_clip);

        // Заполняем матрицу проекции
        matrix[0] = -2.0 * lr;       // Масштаб по X
        matrix[1] = 0;               // Нет сдвига по X
        matrix[2] = 0 // Сдвиг по X

        matrix[3] = 0;               // Нет сдвига по Y
        matrix[4] = -2.0 * bt;       // Масштаб по Y
        matrix[5] = 0  // Сдвиг по Y

        matrix[6] = (left + right) * lr;             // Не используется
        matrix[7] = (top + bottom) * bt;               // Не используется
        matrix[8] = 1;               // Гомогенная координата

        // Возвращаем полученную матрицу проекции
        return matrix;
    }


    private calculateVertexes(): void {
        if (this._sprite === null) {
            return;
        }

        const width = this._sprite.texture.width;
        const height = this._sprite.texture.height;

        // Преобразуем размеры текстуры в диапазон от -1 до 1 для правильного отображения на экране
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        this._vertices = [
            // Треугольник 1
            new Vertex(new Vector2(-halfWidth, halfHeight), new Vector2(0, 1)),  // Верхний левый, 
            new Vertex(new Vector2(halfWidth, halfHeight), new Vector2(1, 1)),   // Верхний правый, 
            new Vertex(new Vector2(halfWidth, -halfHeight), new Vector2(1, 0)),  // Нижний правый,

            // Треугольник 2
            new Vertex(new Vector2(-halfWidth, -halfHeight), new Vector2(0, 0)), // Нижний левый, 
            new Vertex(new Vector2(-halfWidth, halfHeight), new Vector2(0, 1)),  // Верхний левый, 
            new Vertex(new Vector2(halfWidth, -halfHeight), new Vector2(1, 0))   // Нижний правый
        ];

        const vertex_array: number[] = [];

        this._vertices.forEach(v => vertex_array.push(...v.toArray()));

        const float_32_array = new Float32Array(vertex_array)

        GL.ctx.bindBuffer(GL.ctx.ARRAY_BUFFER, this._vertex_buffer);
        GL.ctx.bufferData(GL.ctx.ARRAY_BUFFER, float_32_array, GL.ctx.DYNAMIC_DRAW);
    }
}
