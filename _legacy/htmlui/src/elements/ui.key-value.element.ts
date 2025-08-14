import { Delegate } from "../delegate";
import { POROPERTY_TYPE, PropertyMeta } from "../property.meta";
import { UIElement } from "./ui-element";

export class UIKeyValueElement extends UIElement {
    public readonly onChanged: Delegate<[string]> = new Delegate();

    private readonly _tittle: HTMLLabelElement;
    private readonly _input: HTMLInputElement;

    private readonly _context: any;
    private readonly _poperty_meta: PropertyMeta;
    private _isEditing: boolean = false;

    public constructor(context: any, property: PropertyMeta) {
        const root = document.createElement('div');
        root.id = "key-value"; // ID для стилизации через CSS
    
        super(root);
    
        this._context = context;
        this._poperty_meta = property;
    
        // Создание тайтла (label)
        this._tittle = document.createElement('label');
        this._tittle.textContent = property.name;
        
        // Создание input
        this._input = document.createElement('input');
        this._input.setAttribute('type', 'text');
    
        // Обработчики событий
        this._input.addEventListener('focus', this.onFocus.bind(this));
        this._input.addEventListener('blur', this.onBlur.bind(this));
        this._input.addEventListener('change', this.onChange.bind(this));
    
        // Добавление элементов в root
        root.appendChild(this._tittle);
        root.appendChild(this._input);
        this.setValue(this._context[this._poperty_meta.name].toString());
    }

    public update(): void {
        if (this._isEditing) {
            return;
        }

        const value = this._context[this._poperty_meta.name];
        this.setValue(value.toString());
    }

    public setValue(value: string): void {
        this._input.value = value;
    }

    private onChange(): void {
        const new_value = this._input.value;
        this.onChanged.invoke(new_value);

        if (this._poperty_meta.type === POROPERTY_TYPE.NUMBER) {
            this._context[this._poperty_meta.name] = Number(new_value);
            console.log("set new value");
        }
    }

    private onFocus(): void {
        this._isEditing = true
    }

    private onBlur(): void {
        this._isEditing = false
    }
}
