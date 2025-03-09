import { IRenderTarget } from "../graphics/renderer/render-target.interface";
import { GameObject } from "./game-object";

export class Scene {
    private _GLOBAL_ID: number = 0;

    public readonly id: number;

    private _game_objects: GameObject[] = [];

    public constructor() {
        this.id = ++this._GLOBAL_ID;
    }

    public AddGameObject(gameObject: GameObject): void {
        this._game_objects.push(gameObject);
    }

    public render(render_target: IRenderTarget) {
        for (let index = 0, count = this._game_objects.length; index < count; ++index) {
            const game_object = this._game_objects[index];
            
            game_object.render(render_target);
        }
    }
}