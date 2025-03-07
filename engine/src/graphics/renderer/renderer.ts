import { Color } from "../color";
import { ShaderWebGL } from "./shader.webgl";
import { WebGL } from "./webgl";

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

        vertices = Float32Array.from(vertices, v => v + 50);

        const color = Color.fromHex('#66CDAA');

        const colors_array = color.toArray();

        const colors = new Uint8Array([
            ...colors_array,
            ...colors_array,
            ...colors_array,
            ...colors_array,
            ...colors_array,
            ...colors_array,
        ])

        const positions_buffer = webgl.createBuffer();
        webgl.bindBuffer(webgl.ARRAY_BUFFER, positions_buffer);
        webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

        const colors_buffer = webgl.createBuffer();
        webgl.bindBuffer(webgl.ARRAY_BUFFER, colors_buffer);
        webgl.bufferData(webgl.ARRAY_BUFFER, colors, webgl.STATIC_DRAW);

        const shader = new ShaderWebGL(
            `#version 300 es

                precision mediump float;

                in vec2 a_position;
                in vec4 a_color;

                uniform vec2 u_resolution;

                out vec4 v_color;

                void main() {
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

                out vec4 fragColor;

                void main() {
                    fragColor = vec4
                    (
                        float(v_color[0]) / 255.0,
                        float(v_color[1]) / 255.0,
                        float(v_color[2]) / 255.0,
                        float(v_color[3]) / 255.0
                    );
                }
            `
        );

        shader.use();


        const a_position = shader.getAttribute('a_position');
        webgl.enableVertexAttribArray(a_position.location);
        webgl.bindBuffer(webgl.ARRAY_BUFFER, positions_buffer);
        webgl.vertexAttribPointer(a_position.location, 2, webgl.FLOAT, false, 2 * 4, 0);

        const a_color = shader.getAttribute('a_color');
        webgl.enableVertexAttribArray(a_color.location);
        webgl.bindBuffer(webgl.ARRAY_BUFFER, colors_buffer);
        webgl.vertexAttribPointer(a_color.location, 4, webgl.UNSIGNED_BYTE, false, 4 * 1, 0);

        var u_resolution = shader.getUniform('u_resolution');

        webgl.uniform2f(u_resolution.location, webgl.canvas.width, webgl.canvas.height);

        webgl.clearColor(0.0, 0.0, 0.0, 1.0);
        webgl.clear(webgl.COLOR_BUFFER_BIT);
        webgl.drawArrays(webgl.TRIANGLES, 0, 6);
    }
}