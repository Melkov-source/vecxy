export * from './decorators'

export * from './property.meta'

export * from './elements/ui-element'
export * from './elements/ui.group.element'

import { UIGroupElement } from './elements/ui.group.element';
import { POROPERTY_TYPE, PropertyMeta } from './property.meta';

export class HTMLUI {
    public static declare root: HTMLDivElement;

    private static readonly _contexts: Map<any, PropertyMeta[]> = new Map();

    public static init(): void {
        this.root = document.createElement("div");
        this.root.id = "htmlui";

        document.body.appendChild(this.root);

        const style = document.createElement("style");

        style.innerHTML = `
            #htmlui {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0);
                z-index: 999999;
            }
        `;

        document.head.appendChild(style);
    }

    public static update(): void {
        for (const context of this._contexts) {

        }
    }

    public static createGroup(name: string): UIGroupElement {
        const group = new UIGroupElement(name);

        this.root.appendChild(group.root);

        return group;
    }

    public static registerProperty(context: any, property_key: string, type: POROPERTY_TYPE): void {
        const property: PropertyMeta = {
            ctx_prototype: context,
            name: property_key,
            type: type
        };

        if (this._contexts.has(context) === false) {
            console.log(`Registered: ${property_key} in context: ${context.constructor.name}`);

            this._contexts.set(context, [property]);
            return;
        }

        const properties = this._contexts.get(context)!;

        const is_already_added = properties.findIndex(p => p.ctx_prototype === context && p.name === property_key);

        if (is_already_added !== -1) {
            console.warn(`[registerProperty] Already registered property: ${property_key} in context: ${context.constructor.name}`);
            return;
        }

        properties.push(property);

        console.log(`Registered: ${property_key} in context: ${context.constructor.name}`);
    }

    public static getProperties(context: any): PropertyMeta[] {
        const properties = this._contexts.get(context);

        if (!properties) {
            return []
        }

        return properties;
    }
}