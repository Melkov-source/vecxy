import { WebGL } from "./webgl";
import { WEBGL_SHADER, WebGLUtils } from "./webgl.utils";

export class Shader {
    private _vertex_gls: string;
    private _fragment_gls: string;

    private _vertext_shader: WebGLShader | null = null;
    private _fragment_shader: WebGLShader | null = null;

    private _program: WebGLProgram | null = null;

    public constructor(vertex_glsl: string, fragment_gls: string) {
        this._vertex_gls = vertex_glsl;
        this._fragment_gls = fragment_gls;

        this._vertext_shader = this.createShader(WEBGL_SHADER.VERTEX_SHADER, vertex_glsl);
        this._fragment_shader = this.createShader(WEBGL_SHADER.FRAGMENT_SHADER, fragment_gls);

        if (!this._vertext_shader || !this._fragment_shader) {
            console.error(`No created Shader!`);
            return;
        }

        this._program = this.createProgram();
    }

    public use(): void {
        if (!this._program) {
            return;
        }

        WebGL.ctx.useProgram(this._program);
    }

    public getAttribute(name: string): GLint {
        if (!this._program) {
            return -1;
        }

        return WebGL.ctx.getAttribLocation(this._program, name);
    }

    public getUniformLocation(name: string): WebGLUniformLocation | null {
        if (!this._program) {
            return null;
        }

        return WebGL.ctx.getUniformLocation(this._program, name);
    }

    private createProgram(): WebGLProgram | null {
        if(!this._vertext_shader || !this._fragment_shader) {
            return null;
        }

        const webgl = WebGL.ctx;

        const program = webgl.createProgram();

        if (!program) {
            console.error(`Shader program not created!`);
            return null;
        }

        webgl.attachShader(program, this._vertext_shader!);
        webgl.attachShader(program, this._fragment_shader!);

        webgl.linkProgram(program);

        const success = webgl.getProgramParameter(program, webgl.LINK_STATUS);

        if (!success) {
            console.error('Error linking program:', webgl.getProgramInfoLog(program));

            webgl.deleteProgram(program);
            return null;
        }

        return program;
    }

    private createShader(type: WEBGL_SHADER, source: string): WebGLShader | null {
        const webgl = WebGL.ctx;

        let shader: WebGLShader | null = null;

        const gl_enum = WebGLUtils.toShaderEnum(type);

        shader = webgl.createShader(gl_enum);

        if (!shader) {
            console.error(`Not created shader type: ${type}`)
            return null;
        }

        webgl.shaderSource(shader, source);
        webgl.compileShader(shader);

        const success = webgl.getShaderParameter(shader, webgl.COMPILE_STATUS);

        if (!success) {
            console.error(`Shader error compilation: ${webgl.getShaderInfoLog(shader)}`);

            webgl.deleteShader(shader);
    
            return null;
        }

        
        return shader;
    }
}