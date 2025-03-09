import { IRenderTarget } from "../graphics/renderer/render-target.interface";
import { GameObject } from "./game-object";

export abstract class Component {
    public declare gameObject: GameObject;

    public abstract render(render_target: IRenderTarget): void;
}