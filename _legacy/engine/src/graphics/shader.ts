import { IDisposable } from "../common/disposable.interface";
import { Attribute } from "./attribute";
import { GL } from "./gl";
import { Uniform } from "./uniform";
import { WEBGL_SHADER, WebGLUtils } from "./webgl.utils";

export class Shader implements IDisposable {
    private declare _program: WebGLProgram;
    private declare _shader_vert: WebGLShader;
    private declare _shader_frag: WebGLShader;

    private readonly _attibutes: Map<string, Attribute> = new Map();
    private readonly _uniforms: Map<string, Uniform> = new Map();

    public constructor(vert_s: string, frag_s: string) {
        this.createProgram(vert_s, frag_s);

        this.detectAttributes();
        this.detectUniforms();
    }

    public dispose(): void {
        GL.ctx.deleteShader(this._shader_vert);
        GL.ctx.deleteShader(this._shader_frag);

        GL.ctx.deleteProgram(this._program);

        this._attibutes.clear();
        this._uniforms.clear();
    }

    public use(): void {
        GL.ctx.useProgram(this._program);
    }

    public getAttribute(name: string): Attribute {
        if (!this._attibutes.has(name)) {
            throw new Error(`Not found atribute: ${name} by shader program!`)
        }

        return this._attibutes.get(name)!;
    }

    public getUniform(name: string): Uniform {
        if (!this._uniforms.has(name)) {
            throw new Error(`Not found uniform: ${name} by shader program!`)
        }

        return this._uniforms.get(name)!;
    }

    private createProgram(vert_s: string, frag_s: string): void {
        const shader_vert = this.createShader(WEBGL_SHADER.VERTEX_SHADER, vert_s);
        const shader_frag = this.createShader(WEBGL_SHADER.FRAGMENT_SHADER, frag_s);

        if (!shader_vert || !shader_frag) {
            throw new Error("Shaders not created for shader program!");
        }

        this._shader_vert = shader_vert;
        this._shader_frag = shader_frag;

        const program = GL.ctx.createProgram();

        if (!program) {
            console.error(`Shader program not created!`);
            return;
        }

        GL.ctx.attachShader(program, shader_vert);
        GL.ctx.attachShader(program, shader_frag);

        GL.ctx.linkProgram(program);

        const success = GL.ctx.getProgramParameter(program, GL.ctx.LINK_STATUS);

        if (!success) {
            console.error('Error linking program:', GL.ctx.getProgramInfoLog(program));

            GL.ctx.deleteProgram(program);
            return;
        }

        this._program = program;
    }

    private createShader(type: WEBGL_SHADER, source: string): WebGLShader | null {
        let shader: WebGLShader | null = null;

        const gl_enum = WebGLUtils.toShaderEnum(GL.ctx, type);

        shader = GL.ctx.createShader(gl_enum);

        if (!shader) {
            console.error(`Not created shader type: ${type}`)
            return null;
        }

        GL.ctx.shaderSource(shader, source);
        GL.ctx.compileShader(shader);

        const success = GL.ctx.getShaderParameter(shader, GL.ctx.COMPILE_STATUS);

        if (!success) {
            console.error(`Shader error compilation: ${GL.ctx.getShaderInfoLog(shader)}`);

            GL.ctx.deleteShader(shader);

            return null;
        }

        return shader;
    }

    private detectAttributes(): void {
        const count = GL.ctx.getProgramParameter(this._program, GL.ctx.ACTIVE_ATTRIBUTES);

        for (let index = 0; index < count; ++index) {
            const info = GL.ctx.getActiveAttrib(this._program, index);

            if (!info) {
                break;
            }

            const location = GL.ctx.getAttribLocation(this._program, info.name);

            const attirbute = new Attribute(info, location);

            this._attibutes.set(info.name, attirbute);
        }
    }

    private detectUniforms(): void {
        const count = GL.ctx.getProgramParameter(this._program, GL.ctx.ACTIVE_UNIFORMS);

        for (let index = 0; index < count; ++index) {
            const info = GL.ctx.getActiveUniform(this._program, index);

            if (!info) {
                break;
            }

            const location = GL.ctx.getUniformLocation(this._program, info.name)!;

            const uniform = new Uniform(info, location);

            this._uniforms.set(info.name, uniform);
        }
    }
}