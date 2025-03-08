import { IDisposable } from "../../common/disposable.interface";
import { AttributeWebGL } from "./attribute.webgl";
import { UniformWebGL } from "./uniform.webgl";
import { WebGL } from "./webgl";
import { WEBGL_SHADER, WebGLUtils } from "./webgl.utils";

export class ShaderWebGL implements IDisposable {
    private declare _program: WebGLProgram;
    private declare _shader_vert: WebGLShader;
    private declare _shader_frag: WebGLShader;

    private readonly _attibutes: Map<string, AttributeWebGL> = new Map();
    private readonly _uniforms: Map<string, UniformWebGL> = new Map();

    public constructor(vert_s: string, frag_s: string) {
        this.createProgram(vert_s, frag_s);

        this.detectAttributes();
        this.detectUniforms();
    }

    public dispose(): void {
        const webgl = WebGL.ctx;

        webgl.deleteShader(this._shader_vert);
        webgl.deleteShader(this._shader_frag);

        webgl.deleteProgram(this._program);

        this._attibutes.clear();
        this._uniforms.clear();
    }

    public use(): void {
        WebGL.ctx.useProgram(this._program);
    }

    public getAttribute(name: string): AttributeWebGL {
        if(!this._attibutes.has(name)) {
            throw new Error(`Not found atribute: ${name} by shader program!`)
        }

        return this._attibutes.get(name)!;
    }

    public getUniform(name: string): UniformWebGL {
        if(!this._uniforms.has(name)) {
            throw new Error(`Not found uniform: ${name} by shader program!`)
        }

        return this._uniforms.get(name)!;
    }

    private createProgram(vert_s: string, frag_s: string): void {
        const shader_vert = this.createShader(WEBGL_SHADER.VERTEX_SHADER, vert_s);
        const shader_frag = this.createShader(WEBGL_SHADER.FRAGMENT_SHADER, frag_s);

        if(!shader_vert || !shader_frag) {
            throw new Error("Shaders not created for shader program!");
        }

        this._shader_vert = shader_vert;
        this._shader_frag = shader_frag;

        const webgl = WebGL.ctx;

        const program = webgl.createProgram();

        if (!program) {
            console.error(`Shader program not created!`);
            return;
        }

        webgl.attachShader(program, shader_vert);
        webgl.attachShader(program, shader_frag);

        webgl.linkProgram(program);

        const success = webgl.getProgramParameter(program, webgl.LINK_STATUS);

        if (!success) {
            console.error('Error linking program:', webgl.getProgramInfoLog(program));

            webgl.deleteProgram(program);
            return;
        }

        this._program = program;
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

    private detectAttributes(): void {
        const webgl = WebGL.ctx;

        const count = webgl.getProgramParameter(this._program, webgl.ACTIVE_ATTRIBUTES);

        for (let index = 0; index < count; ++index) {
            const info = webgl.getActiveAttrib(this._program, index);

            if (!info) {
                break;
            }

            const location = webgl.getAttribLocation(this._program, info.name);

            const attirbute = new AttributeWebGL(info, location);

            this._attibutes.set(info.name, attirbute);
        }
    }

    private detectUniforms(): void {
        const webgl = WebGL.ctx;

        const count = webgl.getProgramParameter(this._program, webgl.ACTIVE_UNIFORMS);

        for (let index = 0; index < count; ++index) {
            const info = webgl.getActiveUniform(this._program, index);

            if (!info) {
                break;
            }

            const location = webgl.getUniformLocation(this._program, info.name)!;

            const uniform = new UniformWebGL(info, location);

            this._uniforms.set(info.name, uniform);
        }
    }
}