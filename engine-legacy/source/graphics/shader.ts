import {Application} from "@app";

export class Shader {
    private readonly _gl: WebGLRenderingContext;

    public constructor(gl: WebGLRenderingContext) {
        this._gl = gl;
    }

    private compile(source: string, type: GLenum):  WebGLShader | undefined {
        const shader = this._gl.createShader(type);

        if (!shader) {
            console.error("Не удалось создать шейдер.");
            return undefined;
        }

        this._gl.shaderSource(shader, source);
        this._gl.compileShader(shader);

        if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
            console.log("Ошибка компиляции шейдера: ", this._gl.getShaderInfoLog(shader));
            return undefined;
        }

        return shader;
    }
}