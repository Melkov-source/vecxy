import { WebGL } from "./webgl";

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
    public static toShaderEnum(type: WEBGL_SHADER): GLenum {
        const webgl = WebGL.ctx;

        switch (type) {
            case WEBGL_SHADER.VERTEX_SHADER: return webgl.VERTEX_SHADER;
            case WEBGL_SHADER.FRAGMENT_SHADER: return webgl.FRAGMENT_SHADER
        }

        throw new Error(`Unrecognized 'shader' type: ${type}`);
    }

    public static toDataEnum(type: WEBGL_DATA): GLenum {
        const webgl = WebGL.ctx;

        switch (type) {
            case WEBGL_DATA.FLOAT: return webgl.FLOAT;
            case WEBGL_DATA.INT: return webgl.INT;
            case WEBGL_DATA.UNSIGNED_INT: return webgl.UNSIGNED_INT;

            case WEBGL_DATA.SHORT: return webgl.SHORT;
            case WEBGL_DATA.UNSIGNED_SHORT: return webgl.UNSIGNED_SHORT;

            case WEBGL_DATA.BYTE: return webgl.BYTE;
            case WEBGL_DATA.UNSIGNED_BYTE: return webgl.UNSIGNED_BYTE;
        }

        throw new Error(`Unrecognized 'data' type: ${type}`);
    }

    public static toBufferEnum(type: WEBGL_BUFFER): GLenum {
        const webgl = WebGL.ctx;

        switch (type) {
            case WEBGL_BUFFER.STATIC_DRAW: return webgl.STATIC_DRAW;
            case WEBGL_BUFFER.STREAM_DRAW: return webgl.STREAM_DRAW;
            case WEBGL_BUFFER.DYNAMIC_DRAW: return webgl.DYNAMIC_DRAW;
            case WEBGL_BUFFER.ARRAY_BUFFER: return webgl.ARRAY_BUFFER;
            case WEBGL_BUFFER.ELEMENT_ARRAY_BUFFER: return webgl.ELEMENT_ARRAY_BUFFER;
            case WEBGL_BUFFER.BUFFER_SIZE: return webgl.BUFFER_SIZE;
            case WEBGL_BUFFER.BUFFER_USAGE: return webgl.BUFFER_USAGE;
        }

        throw new Error(`Unrecognized 'buffer' type: ${type}`);
    }

    public static toPrimitiveEnum(type: WEBGL_PRIMITIVE): GLenum {
        const webgl = WebGL.ctx;

        switch (type) {
            case WEBGL_PRIMITIVE.POINTS: return webgl.POINTS;
            case WEBGL_PRIMITIVE.LINES: return webgl.LINES;
            case WEBGL_PRIMITIVE.LINE_LOOP: return webgl.LINE_LOOP;
            case WEBGL_PRIMITIVE.LINE_STRIP: return webgl.LINE_STRIP;
            case WEBGL_PRIMITIVE.TRIANGLES: return webgl.TRIANGLES;
            case WEBGL_PRIMITIVE.TRIANGLE_STRIP: return webgl.TRIANGLE_STRIP;
            case WEBGL_PRIMITIVE.TRIANGLE_FAN: return webgl.TRIANGLE_FAN;
        }

        throw new Error(`Unrecognized 'primitive' type: ${type}`);
    }
}