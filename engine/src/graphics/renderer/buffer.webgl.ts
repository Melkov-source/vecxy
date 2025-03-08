import { IDisposable } from "../../common/disposable.interface";
import { WebGL } from "./webgl";
import { WEBGL_BUFFER, WEBGL_DATA, WEBGL_PRIMITIVE, WebGLUtils } from "./webgl.utils";

export class BufferWebGL implements IDisposable {
    private readonly _data_type: GLenum;
    private readonly _buffer_type: GLenum;
    private readonly _primitive_type: GLenum;

    private readonly _buffer: WebGLBuffer;

    public constructor(data: WEBGL_DATA, buffer: WEBGL_BUFFER, primitive: WEBGL_PRIMITIVE) {
        this._buffer = WebGL.ctx.createBuffer();

        this._data_type = WebGLUtils.toDataEnum(data);
        this._buffer_type = WebGLUtils.toBufferEnum(buffer);
        this._primitive_type = WebGLUtils.toPrimitiveEnum(primitive);

        this._buffer = WebGL.ctx.createBuffer();
    }

    public bind(): void {
        WebGL.ctx.bindBuffer(this._buffer_type, this._buffer);
    }

    public dispose(): void {
        WebGL.ctx.deleteBuffer(this._buffer);
    }
}