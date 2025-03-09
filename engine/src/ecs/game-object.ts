import { IRenderTarget } from "../graphics/renderer/render-target.interface";
import { Component } from "./component";

export class GameObject {
    private _components: Component[] = [];

    public addComponent<TComponent extends Component>(ctor: { new(): TComponent }): TComponent {
        const component = new ctor();

        component.gameObject = this;

        this._components.push(component);

        return component;
    }

    public render(render_target: IRenderTarget) {
        for (let index = 0, count = this._components.length; index < count; ++index) {
            const component = this._components[index];

            component.render(render_target);
        }
    }
}