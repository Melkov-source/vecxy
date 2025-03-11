import { Vector2 } from "../math/vector2";
import { Color } from "./color";
import { Material } from "./material";
import { IDrawable } from "./renderer/drawable.interface";
import { IRenderTarget } from "./renderer/render-target.interface";
import { ShaderWebGL } from "./webgl/shader.webgl";
import { WEBGL_PRIMITIVE, WebGLUtils } from "./webgl/webgl.utils";

export class Sprite implements IDrawable {
    public static _shader: ShaderWebGL;
    private declare _color: Color;
    private declare _ctx: WebGLRenderingContext | WebGL2RenderingContext;

    public position: Vector2;
    public size: Vector2;

    public constructor() {
        this.position = new Vector2(1920/2, 0);
        this.size = new Vector2(100, 100);
        this._color = Color.green();


    }

    public draw(render_target: IRenderTarget): void {
        this._ctx = render_target.ctx;

        if (!Sprite._shader) {
            Sprite._shader = new ShaderWebGL(
                `#version 300 es
    
                precision mediump float;
    
                uniform vec2 u_resolution;
    
                in vec2 a_position;
    
                out vec4 v_color;
    
                void main() 
                {
                    vec2 zero_to_one = a_position / u_resolution;
    
                    vec2 zero_to_two = zero_to_one * 2.0;

                    vec2 clip_space = zero_to_two - 1.0;

                    // Сдвигаем координаты так, чтобы центр был (0,0)
                    clip_space.y *= 1.0; // Инвертируем ось Y

                    gl_Position = vec4(clip_space, 0.0, 1.0);
                }
                
                `,

                `#version 300 es
    
                precision mediump float;
    
                uniform vec4 u_color;
    
                out vec4 fragColor ;
                
                void main() 
                {
                    fragColor = vec4
                    (
                        u_color[0],
                        u_color[1],
                        u_color[2],
                        u_color[3]
                    );
                }
    
                `,
                this._ctx
            )

            Sprite._shader.use();
        };



        const a_position = Sprite._shader.getAttribute('a_position');

        const u_resolution = Sprite._shader.getUniform('u_resolution');
        const u_color = Sprite._shader.getUniform('u_color');

        const position_buffer = this._ctx.createBuffer();

        const centerX = this._ctx.canvas.width / 2;
        const centerY = this._ctx.canvas.height / 2;

        // Смещаем спрайт так, чтобы его центр был в центре экрана
        const vertices = new Float32Array([
            // Верхний левый угол
            centerX - this.size.x / 2 + this.position.x, centerY - this.size.y / 2 + this.position.y,
            // Верхний правый угол
            centerX + this.size.x / 2 + this.position.x, centerY - this.size.y / 2 + this.position.y,
            // Нижний левый угол
            centerX - this.size.x / 2 + this.position.x, centerY + this.size.y / 2 + this.position.y,

            // Верхний правый угол
            centerX + this.size.x / 2 + this.position.x, centerY - this.size.y / 2 + this.position.y,
            // Нижний правый угол
            centerX + this.size.x / 2 + this.position.x, centerY + this.size.y / 2 + this.position.y,
            // Нижний левый угол
            centerX - this.size.x / 2 + this.position.x, centerY + this.size.y / 2 + this.position.y,
        ]);

        this._ctx.enableVertexAttribArray(a_position.location);

        this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, position_buffer);
        this._ctx.bufferData(this._ctx.ARRAY_BUFFER, vertices, this._ctx.STATIC_DRAW);
        this._ctx.vertexAttribPointer(a_position.location, 2, this._ctx.FLOAT, false, 2 * 4, 0);

        this._ctx.uniform2f(u_resolution.location, this._ctx.canvas.width, this._ctx.canvas.height);
        this._ctx.uniform4f(u_color.location, this._color.r01(), this._color.g01(), this._color.b01(), this._color.a01());

        const primitive = WebGLUtils.toPrimitiveEnum(this._ctx, WEBGL_PRIMITIVE.TRIANGLES);

        this._ctx.drawArrays(primitive, 0, 6);
    }
}