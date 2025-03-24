import { HTMLUI, POROPERTY_TYPE, PropertyMeta, VIEW_TYPE } from "../htmlui";
import { UIElement } from "./ui-element";
import { UIKeyValueElement } from "./ui.key-value.element";
import { UISliderElement } from "./ui.slider.element";

export class UIGroupElement extends UIElement {
    public readonly name: string;

    private _contexts: Map<object, PropertyMeta[]> = new Map();

    private readonly _elements: UIElement[] = [];

    public constructor(name: string) {
        const root = document.createElement('div');

        super(root);

        const title = document.createElement('label');

        title.textContent = name;
        title.style.color = "white";

        this.root.appendChild(title);

        this.name = name;
    }

    public update(): void {
        for (let index = 0, count = this._elements.length; index < count; ++index) {
            const element = this._elements[index];

            if (element.update) {
                element.update();
            }

        }
    }

    public bindProperties(context: any): void {
        const prototype = Object.getPrototypeOf(context);

        const properties_meta = HTMLUI.getProperties(prototype);

        for (const property_meta of properties_meta) {
            const metas: PropertyMeta[] = [];

            this._contexts.set(context, metas)

            switch (property_meta.type) {
                case POROPERTY_TYPE.NUMBER:
                    let element: UIElement;

                    switch (property_meta.view) {
                        case VIEW_TYPE.KEY_VALUE:
                            element = new UIKeyValueElement(context, property_meta);
                            break;

                        case VIEW_TYPE.SLIDER:
                            element = new UISliderElement(context, property_meta);
                            break;

                        default:
                            continue;
                    }

                    this.root.appendChild(element.root);

                    this._elements.push(element);

                    metas.push(property_meta);
                    break;
            }
        }
    }


}