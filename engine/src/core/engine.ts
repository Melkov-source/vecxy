import {WebGL} from "../graphics/webgl.js"

export class Engine {
    private declare _webgl: WebGL;

    public initialize(): void {
        this._webgl = new WebGL();

        this._webgl.initialize();
    }
}