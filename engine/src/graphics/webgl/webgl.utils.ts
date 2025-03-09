export enum WEBGL_SHADER {
    NONE = "NONE",
    VERTEX_SHADER = 'VERTEX_SHADER',
    FRAGMENT_SHADER = 'FRAGMENT_SHADER'
}

export enum WEBGL_DATA {
    NONE = "NONE",
    FLOAT = "FLOAT",
    INT = "INT",
    UNSIGNED_INT = "UNSIGNED_INT",
    SHORT = "SHORT",
    UNSIGNED_SHORT = "UNSIGNED_SHORT",
    BYTE = "BYTE",
    UNSIGNED_BYTE = "UNSIGNED_BYTE"
}

export enum WEBGL_BUFFER {
    NONE = "NONE",
    STATIC_DRAW = "STATIC_DRAW",
    STREAM_DRAW = "STREAM_DRAW",
    DYNAMIC_DRAW = "DYNAMIC_DRAW",
    ARRAY_BUFFER = "ARRAY_BUFFER",
    ELEMENT_ARRAY_BUFFER = "ELEMENT_ARRAY_BUFFER",
    BUFFER_SIZE = "BUFFER_SIZE",
    BUFFER_USAGE = "BUFFER_USAGE",
}

export enum WEBGL_PRIMITIVE {
    NONE = "NONE",
    POINTS = "POINTS",
    LINES = "LINES",
    LINE_LOOP = "LINE_LOOP",
    LINE_STRIP = "LINE_STRIP",
    TRIANGLES = "TRIANGLES",
    TRIANGLE_STRIP = "TRIANGLE_STRIP",
    TRIANGLE_FAN = "TRIANGLE_FAN",
}

export class WebGLUtils {
    public static toShaderEnum(ctx: WebGL2RenderingContext | WebGLRenderingContext, type: WEBGL_SHADER): GLenum {
        switch (type) {
            case WEBGL_SHADER.VERTEX_SHADER: return ctx.VERTEX_SHADER;
            case WEBGL_SHADER.FRAGMENT_SHADER: return ctx.FRAGMENT_SHADER
        }

        throw new Error(`Unrecognized 'shader' type: ${type}`);
    }

    public static toDataEnum(ctx: WebGL2RenderingContext | WebGLRenderingContext, type: WEBGL_DATA): GLenum {
        switch (type) {
            case WEBGL_DATA.FLOAT: return ctx.FLOAT;
            case WEBGL_DATA.INT: return ctx.INT;
            case WEBGL_DATA.UNSIGNED_INT: return ctx.UNSIGNED_INT;

            case WEBGL_DATA.SHORT: return ctx.SHORT;
            case WEBGL_DATA.UNSIGNED_SHORT: return ctx.UNSIGNED_SHORT;

            case WEBGL_DATA.BYTE: return ctx.BYTE;
            case WEBGL_DATA.UNSIGNED_BYTE: return ctx.UNSIGNED_BYTE;
        }

        throw new Error(`Unrecognized 'data' type: ${type}`);
    }

    public static toBufferEnum(ctx: WebGL2RenderingContext | WebGLRenderingContext, type: WEBGL_BUFFER): GLenum {
        switch (type) {
            case WEBGL_BUFFER.STATIC_DRAW: return ctx.STATIC_DRAW;
            case WEBGL_BUFFER.STREAM_DRAW: return ctx.STREAM_DRAW;
            case WEBGL_BUFFER.DYNAMIC_DRAW: return ctx.DYNAMIC_DRAW;
            case WEBGL_BUFFER.ARRAY_BUFFER: return ctx.ARRAY_BUFFER;
            case WEBGL_BUFFER.ELEMENT_ARRAY_BUFFER: return ctx.ELEMENT_ARRAY_BUFFER;
            case WEBGL_BUFFER.BUFFER_SIZE: return ctx.BUFFER_SIZE;
            case WEBGL_BUFFER.BUFFER_USAGE: return ctx.BUFFER_USAGE;
        }

        throw new Error(`Unrecognized 'buffer' type: ${type}`);
    }

    public static toPrimitiveEnum(ctx: WebGL2RenderingContext | WebGLRenderingContext, type: WEBGL_PRIMITIVE): GLenum {
        switch (type) {
            case WEBGL_PRIMITIVE.POINTS: return ctx.POINTS;
            case WEBGL_PRIMITIVE.LINES: return ctx.LINES;
            case WEBGL_PRIMITIVE.LINE_LOOP: return ctx.LINE_LOOP;
            case WEBGL_PRIMITIVE.LINE_STRIP: return ctx.LINE_STRIP;
            case WEBGL_PRIMITIVE.TRIANGLES: return ctx.TRIANGLES;
            case WEBGL_PRIMITIVE.TRIANGLE_STRIP: return ctx.TRIANGLE_STRIP;
            case WEBGL_PRIMITIVE.TRIANGLE_FAN: return ctx.TRIANGLE_FAN;
        }

        throw new Error(`Unrecognized 'primitive' type: ${type}`);
    }
}