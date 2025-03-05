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

        this.resizeCanvas();
    }

    public static resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();

        const MAX_DPR = 2;

        const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

        const display_width = Math.round(rect.width * dpr);
        const display_height = Math.round(rect.height * dpr);

        const need_resize = this.canvas.width !== display_width || this.canvas.height !== display_height;

        if (need_resize) {
            this.canvas.width = display_width;
            this.canvas.height = display_height;
        }

        this.ctx.viewport(0, 0, this.canvas.width, this.canvas.height);
        return need_resize;
    }
}