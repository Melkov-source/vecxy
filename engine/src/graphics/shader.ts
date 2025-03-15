import { IDisposable } from "../common/disposable.interface";
import { Attribute } from "./attribute";
import { Uniform } from "./uniform";
import { WEBGL_SHADER, WebGLUtils } from "./webgl.utils";

export class Shader implements IDisposable {
    private readonly _ctx: WebGL2RenderingContext;

    private declare _program: WebGLProgram;
    private declare _shader_vert: WebGLShader;
    private declare _shader_frag: WebGLShader;

    private readonly _attibutes: Map<string, Attribute> = new Map();
    private readonly _uniforms: Map<string, Uniform> = new Map();

    public constructor(vert_s: string, frag_s: string, ctx: WebGL2RenderingContext) {
        this._ctx = ctx;
        this.createProgram(vert_s, frag_s);

        this.detectAttributes();
        this.detectUniforms();
    }

    public dispose(): void {
        this._ctx.deleteShader(this._shader_vert);
        this._ctx.deleteShader(this._shader_frag);

        this._ctx.deleteProgram(this._program);

        this._attibutes.clear();
        this._uniforms.clear();
    }

    public use(): void {
        this._ctx.useProgram(this._program);
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

        const program = this._ctx.createProgram();

        if (!program) {
            console.error(`Shader program not created!`);
            return;
        }

        this._ctx.attachShader(program, shader_vert);
        this._ctx.attachShader(program, shader_frag);

        this._ctx.linkProgram(program);

        const success = this._ctx.getProgramParameter(program, this._ctx.LINK_STATUS);

        if (!success) {
            console.error('Error linking program:', this._ctx.getProgramInfoLog(program));

            this._ctx.deleteProgram(program);
            return;
        }

        this._program = program;
    }

    private createShader(type: WEBGL_SHADER, source: string): WebGLShader | null {
        let shader: WebGLShader | null = null;

        const gl_enum = WebGLUtils.toShaderEnum(this._ctx, type);

        shader = this._ctx.createShader(gl_enum);

        if (!shader) {
            console.error(`Not created shader type: ${type}`)
            return null;
        }

        this._ctx.shaderSource(shader, source);
        this._ctx.compileShader(shader);

        const success = this._ctx.getShaderParameter(shader, this._ctx.COMPILE_STATUS);

        if (!success) {
            console.error(`Shader error compilation: ${this._ctx.getShaderInfoLog(shader)}`);

            this._ctx.deleteShader(shader);

            return null;
        }

        return shader;
    }

    private detectAttributes(): void {
        const count = this._ctx.getProgramParameter(this._program, this._ctx.ACTIVE_ATTRIBUTES);

        for (let index = 0; index < count; ++index) {
            const info = this._ctx.getActiveAttrib(this._program, index);

            if (!info) {
                break;
            }

            const location = this._ctx.getAttribLocation(this._program, info.name);

            const attirbute = new Attribute(info, location);

            this._attibutes.set(info.name, attirbute);
        }
    }

    private detectUniforms(): void {
        const count = this._ctx.getProgramParameter(this._program, this._ctx.ACTIVE_UNIFORMS);

        for (let index = 0; index < count; ++index) {
            const info = this._ctx.getActiveUniform(this._program, index);

            if (!info) {
                break;
            }

            const location = this._ctx.getUniformLocation(this._program, info.name)!;

            const uniform = new Uniform(info, location);

            this._uniforms.set(info.name, uniform);
        }
    }
}