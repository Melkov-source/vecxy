import { Vector2 } from "../math/vector2";
import { Color } from "./color";
import { Material } from "./material";
import { IDrawable } from "./renderer/drawable.interface";
import { IRenderTarget } from "./renderer/render-target.interface";
import { ShaderWebGL } from "./webgl/shader.webgl";

export class Sprite implements IDrawable {
    private declare _shader: ShaderWebGL;
    private declare _color: Color;
    private declare _ctx: WebGLRenderingContext | WebGL2RenderingContext;

    private _position: Vector2;
    public size: Vector2;

    public constructor() {
        this._position = new Vector2(0, 0);
        this.size = new Vector2(100, 100);
        this._color = Color.white();

        
    }

    public draw(render_target: IRenderTarget): void {
        this._ctx = render_target.ctx;

        this._shader = new ShaderWebGL(
            `#version 300 es

            precision mediump float;

            uniform vec2 u_resolution;

            in vec2 a_position;
            in vec4 a_color;

            out vec4 v_color;

            void main() 
            {
                v_color = a_color;

                vec2 zero_to_one = a_position / u_resolution;

                vec2 zero_to_two = zero_to_one * 2.0;

                vec2 clip_space = (zero_to_two - 1.0) * vec2(1, -1);

                gl_Position = vec4(clip_space, 0.0, 1.0);
            }
            
            `,

            `#version 300 es

            precision mediump float;

            in vec4 v_color;

            out vec4 fragColor ;
            
            void main() 
            {
                fragColor = vec4
                (
                    float(v_color[0]) / 255.0,
                    float(v_color[1]) / 255.0,
                    float(v_color[2]) / 255.0,
                    float(v_color[3]) / 255.0
                );
            }

            `,
            this._ctx
        )

        this._shader.use();

        const a_position = this._shader.getAttribute('a_position');
        const a_color = this._shader.getAttribute('a_color');
        
        const u_resolution = this._shader.getUniform('u_resolution');
        
        const position_buffer = this._ctx.createBuffer();
        const color_buffer = this._ctx.createBuffer();

        const vertices = new Float32Array([
            this._position.x, this._position.y,
            this._position.x + this.size.x, this._position.y,
            this._position.x, this._position.y + this.size.y,

            this._position.x + this.size.x, this._position.y,
            this._position.x + this.size.x, this._position.y + this.size.y,
            this._position.x, this._position.y + this.size.y,
        ]);

        this._ctx.enableVertexAttribArray(a_position.location);
        this._ctx.enableVertexAttribArray(a_color.location);

        this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, position_buffer);
        this._ctx.bufferData(this._ctx.ARRAY_BUFFER, vertices, this._ctx.STATIC_DRAW);
        this._ctx.vertexAttribPointer(a_position.location, 2, this._ctx.FLOAT, false, 2 * 4, 0);

        this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, color_buffer);
        this._ctx.bufferData(this._ctx.ARRAY_BUFFER, this._color.toUint8Array(), this._ctx.STATIC_DRAW);
        this._ctx.vertexAttribPointer(a_color.location, 4, this._ctx.UNSIGNED_BYTE, false, 4 * 1, 0);

        this._ctx.uniform2f(u_resolution.location, this._ctx.canvas.width, this._ctx.canvas.height);
    }
}