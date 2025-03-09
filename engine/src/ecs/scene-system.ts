import { IRenderTarget } from "../graphics/renderer/render-target.interface";
import { Scene } from "./scene";

export class SceneSystem {
    public static get scene(): Scene {
        return SceneSystem._scene;
    }

    private static _scene: Scene;

    public static initialize() {
        this._scene = new Scene();
    }

    public static render(render_target: IRenderTarget) {
        this._scene.render(render_target);
    }
}