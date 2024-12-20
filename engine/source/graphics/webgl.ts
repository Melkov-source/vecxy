export class WebGL {
    private _rendering_context: WebGLRenderingContext;

    public constructor(rendering_context: WebGLRenderingContext) {
        this._rendering_context = rendering_context;
    }
}