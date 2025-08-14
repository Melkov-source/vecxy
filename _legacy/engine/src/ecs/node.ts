import { Component } from "./component";
import { Scene } from "./scene";
import { Transform } from "./transform";

export class Node {
    private static __GLOBAK_ID: number = 0;

    public readonly id: number;

    public readonly transform: Transform;
    public readonly children: Node[];
    public readonly components: Component[];

    public get is_active(): boolean { return this._is_active; }
    public get parent(): Node | null { return this._parent; }

    private _is_active: boolean = false;
    private _parent: Node | null = null;

    public constructor(options?: {
        parent?: Node | null,
        components?: { new(node: Node): Component }[]
    }) {
        this._is_active = false;
        
        this.id = Node.__GLOBAK_ID++;

        this.transform = new Transform();

        this.children = [];
        this.components = [];

        if (options === undefined) {
            if(this instanceof Scene) {
                return;
            }
            
            this.setParent(Scene.current as Node);
            this.setAtive(true);
            return;
        }

        if (options.components) {
            for (let index = 0, count = options.components.length; index < count; ++index) {
                const component = options.components[index];

                this.addComponent(component);
            }
        }

        if (options.parent) {
            this.setParent(options.parent);
        } else {
            this.setParent(Scene.current as Node);
        }

        this.setAtive(true);
    }

    public update(dt: number): void {
        if (this._is_active === false) {
            return;
        }

        this.invokeInternal(this.update.name, this, dt);
    }

    public render(): void {
        if (this._is_active === false) {
            return;
        }

        this.invokeInternal(this.render.name, this);
    }

    public setAtive(active: boolean): void {
        this._is_active = active;

        //TODO: Create logic for active
    }

    public setParent(parent: Node): void {
        if (this._parent !== null) {
            this._parent.removeChildInternal(this);
        }

        this._parent = parent;

        this._parent.addChildInternal(this);
    }

    public addComponent<TComponent extends Component>(ctor: { new(node: Node): TComponent }): TComponent {
        const component = new ctor(this);

        this.components.push(component);

        if (component.start) {
            component.start();
        }

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

    private invokeInternal(func_name: string, node: Node, ...args: any[]): void {
        for (let index = 0, count = node.components.length; index < count; ++index) {
            const component = node.components[index] as any;
    
            const func = component[func_name] as Function;
    
            if (func) {
                func.apply(component, args);
            }
        }
    
        for (let index = 0, count = node.children.length; index < count; ++index) {
            const child = node.children[index] as any;
    
            if (child.is_active === false) {
                continue;
            }
    
            this.invokeInternal(func_name, child, ...args);
        }
    }

    private addChildInternal(child: Node): void {
        this.children.push(child);
    }

    private removeChildInternal(child: Node): void {
        const index = this.children.indexOf(child);

        if (index === -1) {
            return;
        }

        this.children.splice(index, 1);
    }
}