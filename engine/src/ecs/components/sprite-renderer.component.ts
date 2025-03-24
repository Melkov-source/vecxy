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

    public update(dt: number): void { }

    public render(): void {
        if (this._is_loaded === false || this._sprite === null) {
            return;
        }

        this.calculateVertices();

        const t_matrix = this.createTransformationMatrix();
        const projectionMatrix = this.createProjectionMatrix();

        this._material.apply(projectionMatrix, t_matrix);

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

        const rotationInRadians = rotation * (Math.PI / 180);

        const cosR = Math.cos(rotationInRadians);
        const sinR = Math.sin(rotationInRadians);

        matrix[0] = cosR * scale.x;
        matrix[1] = sinR * scale.x;
        matrix[2] = 0

        matrix[3] = -sinR * scale.y;
        matrix[4] = cosR * scale.y;
        matrix[5] = 0

        matrix[6] = position.x;
        matrix[7] = position.y;
        matrix[8] = 1;

        return matrix;
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
        matrix[2] =  0 // Сдвиг по X
    
        matrix[3] = 0;               // Нет сдвига по Y
        matrix[4] = -2.0 * bt;       // Масштаб по Y
        matrix[5] = 0  // Сдвиг по Y
    
        matrix[6] = (left + right) * lr;             // Не используется
        matrix[7] = (top + bottom) * bt;               // Не используется
        matrix[8] = 1;               // Гомогенная координата
    
        // Возвращаем полученную матрицу проекции
        return matrix;
    }


    private calculateVertices(): void {
        if (this._sprite === null) {
            return;
        }

        const width = this._sprite.texture.width;
        const height = this._sprite.texture.height;

        // Преобразуем размеры текстуры в диапазон от -1 до 1 для правильного отображения на экране
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        // Создаем вершины для двух треугольников
        this._vertices = new Float32Array([
            // Треугольник 1
            -halfWidth, halfHeight, 0.0, 1.0,   // Верхний левый
            halfWidth, halfHeight, 1.0, 1.0,   // Верхний правый
            halfWidth, -halfHeight, 1.0, 0.0,   // Нижний правый

            // Треугольник 2
            -halfWidth, -halfHeight, 0.0, 0.0,   // Нижний левый
            -halfWidth, halfHeight, 0.0, 1.0,   // Верхний левый
            halfWidth, -halfHeight, 1.0, 0.0,   // Нижний правый
        ]);

        // Обновляем буфер с вершинами
        GL.ctx.bindBuffer(GL.ctx.ARRAY_BUFFER, this._vertex_buffer);
        GL.ctx.bufferData(GL.ctx.ARRAY_BUFFER, this._vertices, GL.ctx.STATIC_DRAW);
    }
}
