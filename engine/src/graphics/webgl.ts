const WEBGL_CONTEXT: string = 'webgl';

export class WebGL {
    public static declare canvas: HTMLCanvasElement;
    public static declare ctx: WebGLRenderingContext;

    public static init(element_id: string) {
        const element = document.getElementById(element_id);

        if (!element) {
            throw new Error(`[WebGL] Not foun element in doom!`);
        }

        this.canvas = element as HTMLCanvasElement;

        const rendering_context = this.canvas.getContext(WEBGL_CONTEXT);

        if (!rendering_context) {
            throw new Error(`[WebGL] Not supported by your browser!`);
        }

        this.ctx = rendering_context as WebGLRenderingContext;

        (document as any).webgl = this.ctx;
    }
}