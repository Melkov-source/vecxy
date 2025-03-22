import { HTMLUI, POROPERTY_TYPE, PropertyMeta } from "../htmlui";
import { UIElement } from "./ui-element";
import { UIKeyValueElement } from "./ui.key-value.element";

export class UIGroupElement extends UIElement {
    public readonly name: string;

    private _contexts: Map<object, PropertyMeta[]> = new Map();

    public constructor(name: string) {
        const root = document.createElement('div');

        super(root);

        this.name = name;
    }

    public bindProperties(context: any): void {
        const prototype = Object.getPrototypeOf(context);

        const properties_meta = HTMLUI.getProperties(prototype);

        for (const property_meta of properties_meta) {
            const metas: PropertyMeta[] = [];

            this._contexts.set(context, metas)

            switch (property_meta.type) {
                case POROPERTY_TYPE.NUMBER:
                    const key_value_element = new UIKeyValueElement();

                    key_value_element.setValue(context[property_meta.name]);

                    key_value_element.onChanged.add((v) => {
                        console.log(`p: ${property_meta.name}, v: ${v}`);

                        context[property_meta.name] = Number(v);
                    }, this);

                    this.root.appendChild(key_value_element.root);

                    metas.push(property_meta);
                    break;
            }
        }
    }


}