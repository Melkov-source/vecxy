const WEBGL_CONTEXT: string = 'webgl';
const WEBGL2_CONTEXT: string = 'webgl2';

export class WebGL {
    public static declare canvas: HTMLCanvasElement;
    public static declare ctx: WebGL2RenderingContext;

    public static init(element_id: string): void {
        const element = document.getElementById(element_id);

        if (!element) {
            throw new Error(`[WebGL] Not foun element in doom!`);
        }

        this.canvas = element as HTMLCanvasElement;

        const rendering_context = this.canvas.getContext(WEBGL2_CONTEXT) as WebGL2RenderingContext;

        if (!rendering_context) {
            // Если WebGL 2.0 не доступен, пробуем WebGL 1.0
            console.warn('[WebGL] WebGL 2.0 not supported, falling back to WebGL 1.0');
            //this.ctx = this.canvas.getContext(WEBGL_CONTEXT) as WebGLRenderingContext;
            if (!this.ctx) {
                throw new Error(`[WebGL] WebGL 1.0 is not supported by your browser!`);
            }
        } else {
            // Если WebGL 2.0 доступен, используем его
            this.ctx = rendering_context;
        }

        this.ctx = rendering_context ;

        (document as any).webgl = this.ctx;

        this.resizeCanvas();
    }

    public static resizeCanvas(): void {
        const rect = this.canvas.getBoundingClientRect();

        const MAX_DPR = 2;

        const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

        const display_width = Math.round(rect.width * dpr);
        const display_height = Math.round(rect.height * dpr);

        const need_resize = this.canvas.width !== display_width || this.canvas.height !== display_height;

        if (!need_resize) {
            return
        }

        this.canvas.width = display_width;
        this.canvas.height = display_height;

        this.ctx.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
}