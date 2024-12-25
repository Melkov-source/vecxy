const CANVAS_NODE_TYPE: string = "CANVAS";
const WEBGL_CONTEXT: string = "webgl";

export class WebGL {
    private declare _context: WebGLRenderingContext;

    public initialize(): void {
        const id: string = "game-canvas";

        const element: HTMLElement | null = document.getElementById(id);

        if(!element) {
            throw new Error("not found  element in DOM");
        }

        if (element.nodeName !== CANVAS_NODE_TYPE) {
            throw new Error(`element canvas by id: ${id} no equals canvas type`)
        }

        if(element.nodeName !== "CANVAS") {
            throw new Error("")
        }

        const canvas: HTMLCanvasElement = <HTMLCanvasElement>element;

        this._context = canvas.getContext(WEBGL_CONTEXT) as WebGLRenderingContext;

        if(!this._context) {
            throw new Error("webgl rendering context no support your browser");
        }

        console.log("webgl rendering context initialize success!")
    }
}