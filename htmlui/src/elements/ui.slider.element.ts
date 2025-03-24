import { Delegate } from "../delegate";
import { POROPERTY_TYPE, PropertyMeta } from "../property.meta";
import { UIElement } from "./ui-element";

export class UISliderElement extends UIElement {
    public readonly onChanged: Delegate<[number]> = new Delegate();

    private readonly _title: HTMLLabelElement;
    private readonly _value: HTMLLabelElement;
    private readonly _slider: HTMLInputElement;
    
    private readonly _context: any;
    private readonly _property_meta: PropertyMeta;

    public constructor(context: any, property: PropertyMeta) {
        const root = document.createElement('div');
        root.id = "slider";

        super(root);

        this._context = context;
        this._property_meta = property;

        this._title = document.createElement('label');
        this._title.textContent = property.name;

        this._slider = document.createElement('input');
        this._slider.setAttribute('type', 'range');

        this._value = document.createElement('label');

        this._slider.min = property.min.toString();
        this._slider.max = property.max.toString();
        this._slider.step = 0.1.toString();

        this._slider.addEventListener('input', this.onSliderChange.bind(this));

        root.appendChild(this._title);
        root.appendChild(this._slider);
        root.appendChild(this._value);

        this.update();
    }

    public update(): void {
        const value = this._context[this._property_meta.name];
        this._slider.value = value;

        this._value.textContent = value;
    }

    private onSliderChange(): void {
        const newValue = Number(this._slider.value);
        this.onChanged.invoke(newValue);
        
        if (this._property_meta.type === POROPERTY_TYPE.NUMBER) {
            this._context[this._property_meta.name] = newValue;
            this._value.textContent = this._slider.value;
        }
    }
}