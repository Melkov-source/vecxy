export * from './decorators'

export * from './property.meta'

export * from './elements/ui-element'
export * from './elements/ui.group.element'

import { UIGroupElement } from './elements/ui.group.element';
import { POROPERTY_TYPE, PropertyMeta, VIEW_TYPE } from './property.meta';

export class HTMLUI {
    public static declare root: HTMLDivElement;

    private static readonly _contexts: Map<any, PropertyMeta[]> = new Map();

    private static readonly _groups: UIGroupElement[] = [];

    public static init(): void {
        this.root = document.createElement("div");
        this.root.id = "htmlui";

        document.body.appendChild(this.root);

        const style = document.createElement("style");

        style.innerHTML = `
            #htmlui {
                position: fixed;
                top: 0;
                left: 1;
                width: 400px;
                height: 100vh;
                background: rgba(0, 0, 0, 0);
                z-index: 999999;
            }

            #key-value {
                display: flex;
                align-items: center;
                padding: 2px;
                color: white;
                gap: 8px;
            }

            #key-value label {
                flex: 0 0 100px;
                text-align: right;
            }

            #key-value input {
                flex: 1;
                background: transparent;
                border: 1px solid #777;
                color: white;
                padding: 2px 4px;
                outline: none;
            }

            #slider {
                display: flex;
                align-items: center;
                padding: 2px;
                color: white;
                gap: 8px;
            }

            #slider label {
                flex: 0 0 100px;
                text-align: right;
            }
        `;

        document.head.appendChild(style);
    }

    public static update(): void {
        for (let index = 0, count = this._groups.length; index < count; ++index) {
            const group = this._groups[index];

            group.update();
        }
    }

    public static createGroup(name: string): UIGroupElement {
        const group = new UIGroupElement(name);

        this.root.appendChild(group.root);

        this._groups.push(group);

        return group;
    }

    public static registerProperty(context: any, property_key: string, type: POROPERTY_TYPE, view: VIEW_TYPE, min: number, max: number): void {
        const property: PropertyMeta = {
            ctx_prototype: context,
            name: property_key,
            type: type,
            view: view,
            min: min,
            max: max
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