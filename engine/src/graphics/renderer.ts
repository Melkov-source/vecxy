import { AssetsManager } from "../core/assets/assets.manager";
import { Shader } from "./shading/shader";
import { WebGL } from "./webgl";

export class Renderer {
    public async render(): Promise<void> {
        const webgl = WebGL.ctx;

        const vertices = new Float32Array([
            0.0, 0.5, 0.0,
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0
        ]);

        const colors = new Float32Array([
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ]);

        const positions_buffer = webgl.createBuffer();
        webgl.bindBuffer(webgl.ARRAY_BUFFER, positions_buffer);
        webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

        const colors_buffer = webgl.createBuffer();
        webgl.bindBuffer(webgl.ARRAY_BUFFER, colors_buffer);
        webgl.bufferData(webgl.ARRAY_BUFFER, colors, webgl.STATIC_DRAW);

        const shader_vertext_asset = await AssetsManager.loadShaderAsync('./internal/shaders/triange.vert.glsl');
        const shader_fragment_asset = await AssetsManager.loadShaderAsync('./internal/shaders/triange.frag.glsl');

        if(!shader_vertext_asset || !shader_fragment_asset) {
            return;
        }

        const shader = new Shader(
            shader_vertext_asset.read(), 
            shader_fragment_asset.read()
        );

        shader.use();

        
        const a_position = shader.getAttribute('a_position');
        webgl.enableVertexAttribArray(a_position);
        webgl.bindBuffer(webgl.ARRAY_BUFFER, positions_buffer);
        webgl.vertexAttribPointer(a_position, 3, webgl.FLOAT, false, 0, 0);
       
        const a_color = shader.getAttribute('a_color');
        webgl.enableVertexAttribArray(a_color);
        webgl.bindBuffer(webgl.ARRAY_BUFFER, colors_buffer);
        webgl.vertexAttribPointer(a_color, 3, webgl.FLOAT, false, 0, 0);
       

        webgl.clearColor(0.0, 0.0, 0.0, 1.0);
        webgl.clear(webgl.COLOR_BUFFER_BIT);
        webgl.drawArrays(webgl.TRIANGLES, 0, 3);
    }
}