import { Color } from "../../graphics/color";
import { GL } from "../../graphics/gl";
import { Material } from "../../graphics/material";
import { BuiltinShader, ShaderManager } from "../../graphics/shader.manager";
import { Sprite } from "../../graphics/sprite";
import { Vector2 } from "../../math/vector2";
import { Component } from "../component";
import { Node } from "../node";

export class SpriteRenderer extends Component {
    private declare _material: Material;
    private _sprite: Sprite | null = null;
    private _is_loaded: boolean = false;

    private _vertices: Float32Array = new Float32Array(0);
    private _vertex_buffer: WebGLBuffer | null = null;

    public constructor(node: Node) {
        super(node);
    }

    public async start(): Promise<void> {
        this._vertex_buffer = GL.ctx.createBuffer();

        var shader = await ShaderManager.instance.createBuiltinAsync(BuiltinShader.SPRITE_2D);

        this._material = new Material(shader);

        this._is_loaded = true;
    }

    public update(dt: number): void {}

    public render(): void {
        if (this._is_loaded === false || this._sprite === null) {
            return;
        }

        this.calculateVertices();

        const t_matrix = this.createTransformationMatrix();

        this._material.apply(t_matrix);

        GL.ctx.drawArrays(GL.ctx.TRIANGLES, 0, 6); // Отрисовка 6 вершин (2 треугольника)
    }

    public setSprite(sprite: Sprite): void {
        this._sprite = sprite;
        this._material.setTexture(sprite.texture);
    }

    public setColor(color: Color): void {
        this._material.setColor(color);
    }

    private createTransformationMatrix(): Float32Array {
        const position: Vector2 = this.node.transform.position;
        const scale: Vector2 = this.node.transform.scale;
        const rotation: number = this.node.transform.rotation;
    
        const matrix = new Float32Array(9);
    
        // Применяем поворот
        const cosR = Math.cos(rotation);
        const sinR = Math.sin(rotation);
    
        // Преобразование в матрицу для фиксированных пиксельных координат
        // Не нормализуем масштаб относительно экрана, а оставляем его как есть.
        
        matrix[0] = cosR * scale.x;  // Масштаб X * cos(поворот)
        matrix[1] = sinR * scale.x;  // Масштаб X * sin(поворот)
        matrix[2] = position.x;      // Позиция X (в пикселях)
    
        matrix[3] = -sinR * scale.y; // Масштаб Y * -sin(поворот)
        matrix[4] = cosR * scale.y;  // Масштаб Y * cos(поворот)
        matrix[5] = position.y;      // Позиция Y (в пикселях)
    
        matrix[6] = 0;  // Не используем
        matrix[7] = 0;  // Не используем
        matrix[8] = 1;  // Гомогенная координата
    
        return matrix;
    }

    private calculateVertices(): void {
        if (this._sprite === null) {
            return;
        }

        const width = this._sprite.texture.width;
        const height = this._sprite.texture.height;

        // Создаем вершины для двух треугольников
        this._vertices = new Float32Array([
            // Треугольник 1 (верхний левый и правый угол)
            -0.5 * width,  0.5 * height,  0.0, 1.0,  // Верхний левый
             0.5 * width,  0.5 * height,  1.0, 1.0,  // Верхний правый
             0.5 * width, -0.5 * height,  1.0, 0.0,  // Нижний правый

            // Треугольник 2 (нижний левый и правый угол)
            -0.5 * width,  -0.5 * height,  0.0, 0.0, // Нижний левый
            -0.5 * width,   0.5 * height,  0.0, 1.0,  // Верхний левый
             0.5 * width, -0.5 * height,  1.0, 0.0,  // Нижний правый
        ]);

        // Обновляем буфер с вершинами
        GL.ctx.bindBuffer(GL.ctx.ARRAY_BUFFER, this._vertex_buffer);
        GL.ctx.bufferData(GL.ctx.ARRAY_BUFFER, this._vertices, GL.ctx.STATIC_DRAW);
    }
}
