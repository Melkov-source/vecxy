import { Scene } from "../ecs/scene";
import { Screen } from "../screen";

const WEBGL_CONTEXT: string = 'webgl';
const WEBGL2_CONTEXT: string = 'webgl2';

export class GL {
    public static ctx: WebGL2RenderingContext;
    public readonly canvas: HTMLCanvasElement;

    public constructor(element_id: string) {
        const element = document.getElementById(element_id);

        if (!element) {
            throw new Error(`[WebGL] Not foun element in doom!`);
        }

        this.canvas = element as HTMLCanvasElement;

        GL.ctx = this.canvas.getContext(WEBGL2_CONTEXT) as WebGL2RenderingContext;

        if (!GL.ctx) {
            console.warn('[WebGL] WebGL 2.0 not supported, falling back to WebGL 1.0');

            if (!GL.ctx) {
                throw new Error(`[WebGL] WebGL 1.0 is not supported by your browser!`);
            }
        }

        Screen.setCanvas(this.canvas);

        GL.ctx.enable(GL.ctx.BLEND);
        GL.ctx.blendFunc(GL.ctx.SRC_ALPHA, GL.ctx.ONE_MINUS_SRC_ALPHA);

        (document as any).renderer = this;

        this.resize();
    }

    public render(): void {
        this.resize();

        GL.ctx.clearColor(0.0, 0.0, 0.0, 1.0);
        GL.ctx.clear(GL.ctx.COLOR_BUFFER_BIT);

        Scene.current?.render();
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

        GL.ctx.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
}