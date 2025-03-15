import { Component } from "./component";
import { Scene } from "./scene";
import { Transform } from "./transform";

export class Node {
    public readonly transform: Transform;
    public readonly children: Node[];
    public readonly components: Component[];

    public get is_active(): boolean { return this._is_active; }

    private _is_active: boolean = false;

    public constructor(options?: {
        parent?: Node | null, 
        components?: { new(node: Node): Component }[]
    }) {
        this.transform = new Transform();

        this.children = [];
        this.components = [];

        if(options === undefined) {
            //TODO: Set parent to current scene
            return;
        }

        if(options.components) {
            for (let index = 0, count = options.components.length; index < count; ++index) {
                const component = options.components[index];
    
                this.addComponent(component);
            }
        }
    
        //TODO: Use options parent
    }

    public update(dt: number): void {
        for (let index = 0, count = this.components.length; index < count; ++index) {
            const component = this.components[index];

            if (component.update) {
                component.update(dt);
            }
        }

        for (let index = 0, count = this.children.length; index < count; ++index) {
            const child = this.children[index];

            if(child.is_active === false) {
                continue;
            }

            child.update(dt);
        }
    }

    public setAtive(active: boolean): void {
        this._is_active = active;

        //TODO: Create logic for active
    }

    public addComponent<TComponent extends Component>(ctor: { new(node: Node): TComponent }): TComponent {
        const component = new ctor(this);

        this.components.push(component);

        return component;
    }

    public getComponent<TComponent extends Component>(ctor: { new(node: Node): TComponent }): TComponent | null {
        for (let index = 0, count = this.components.length; index < count; ++index) {
            const component = this.components[index];

            if (component instanceof ctor) {
                return component as TComponent;
            }
        }

        return null;
    }

    public destroy(): void {
        for (let index = 0, count = this.components.length; index < count; ++index) {
            const component = this.components[index];

            if (component.onDestory) {
                component.onDestory();
            }
        }
    }
}