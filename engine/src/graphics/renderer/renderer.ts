import { AssetsManager } from "../../core/assets/assets.manager";
import { Shader } from "../core/shader";
import { WebGL } from "../webgl";

export class Renderer {
    public render(): void {
        const webgl = WebGL.ctx;

        let vertices = new Float32Array([
            0, 0,
            400, 0,
            400, 400,
            0, 400,
            0, 0,
            400, 400
        ]);

        vertices = vertices.map(v => v + 50);

        const colors = new Float32Array([
            1, 1, 1,
            1, 1, 1,
            1, 1, 1,
            1, 1, 1,
            1, 1, 1,
            1, 1, 1
        ]);

        const positions_buffer = webgl.createBuffer();
        webgl.bindBuffer(webgl.ARRAY_BUFFER, positions_buffer);
        webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

        const colors_buffer = webgl.createBuffer();
        webgl.bindBuffer(webgl.ARRAY_BUFFER, colors_buffer);
        webgl.bufferData(webgl.ARRAY_BUFFER, colors, webgl.STATIC_DRAW);

        const shader = new Shader(
            `
                precision mediump float;

                attribute vec2 a_position;
                attribute vec3 a_color;

                uniform vec2 u_resolution;

                varying vec3 v_color;

                void main() {
                    v_color = a_color;

                    vec2 zero_to_one = a_position / u_resolution;

                    vec2 zero_to_two = zero_to_one * 2.0;

                    vec2 clip_space = (zero_to_two - 1.0) * vec2(1, -1);

                    gl_Position = vec4(clip_space, 0, 1);
                }
            `,
            `
                precision mediump float;

                varying vec3 v_color;

                void main() {
                    gl_FragColor = vec4(v_color, 1.0);
                }
            `
        );

        shader.use();


        const a_position = shader.getAttribute('a_position');
        webgl.enableVertexAttribArray(a_position);
        webgl.bindBuffer(webgl.ARRAY_BUFFER, positions_buffer);
        webgl.vertexAttribPointer(a_position, 2, webgl.FLOAT, false, 0, 0);

        const a_color = shader.getAttribute('a_color');
        webgl.enableVertexAttribArray(a_color);
        webgl.bindBuffer(webgl.ARRAY_BUFFER, colors_buffer);
        webgl.vertexAttribPointer(a_color, 3, webgl.FLOAT, false, 0, 0);

        var resolution_uniform_location = shader.getUniformLocation('u_resolution');

        webgl.uniform2f(resolution_uniform_location, webgl.canvas.width, webgl.canvas.height);


        webgl.clearColor(0.0, 0.0, 0.0, 1.0);
        webgl.clear(webgl.COLOR_BUFFER_BIT);
        webgl.drawArrays(webgl.TRIANGLES, 0, 6);
    }
}