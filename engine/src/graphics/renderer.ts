const WEBGL_CONTEXT: string = 'webgl';
const WEBGL2_CONTEXT: string = 'webgl2';

export class Renderer {
    public readonly ctx: WebGL2RenderingContext;
    public readonly canvas: HTMLCanvasElement;

    public constructor(element_id: string) {
        const element = document.getElementById(element_id);

        if (!element) {
            throw new Error(`[WebGL] Not foun element in doom!`);
        }

        this.canvas = element as HTMLCanvasElement;

        this.ctx = this.canvas.getContext(WEBGL2_CONTEXT) as WebGL2RenderingContext;

        if (!this.ctx) {
            console.warn('[WebGL] WebGL 2.0 not supported, falling back to WebGL 1.0');

            if (!this.ctx) {
                throw new Error(`[WebGL] WebGL 1.0 is not supported by your browser!`);
            }
        }

        (document as any).renderer = this;

        this.resize();
    }

    public render(): void {
        this.resize();

        this.ctx.clearColor(0.0, 0.0, 0.0, 1.0);
        this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);

        //Render
    }

    public resize() {
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