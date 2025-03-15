import { WEBGL_BUFFER, WEBGL_DATA, WEBGL_PRIMITIVE, WebGLUtils } from "./webgl.utils";

export class Buffer {
    private readonly _ctx: WebGL2RenderingContext;

    private readonly _data_type: GLenum;
    private readonly _buffer_type: GLenum;
    private readonly _primitive_type: GLenum;

    private readonly _buffer: WebGLBuffer;

    public constructor(data: WEBGL_DATA, buffer: WEBGL_BUFFER, primitive: WEBGL_PRIMITIVE, ctx: WebGL2RenderingContext) {
        this._ctx = ctx;
        this._buffer = ctx.createBuffer();

        this._data_type = WebGLUtils.toDataEnum(ctx, data);
        this._buffer_type = WebGLUtils.toBufferEnum(ctx, buffer);
        this._primitive_type = WebGLUtils.toPrimitiveEnum(ctx, primitive);

        this._buffer = ctx.createBuffer();
    }

    public bind(): void {
        this._ctx.bindBuffer(this._buffer_type, this._buffer);
    }

    public dispose(): void {
        this._ctx.deleteBuffer(this._buffer);
    }
}