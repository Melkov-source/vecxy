import { Delegate } from "../delegate";
import { UIElement } from "./ui-element";

export class UIKeyValueElement extends UIElement {
    public readonly onChanged: Delegate<[string]> = new Delegate();

    private readonly _input: HTMLInputElement;

    public constructor() {
        const root = document.createElement('div');

        super(root);

        this._input = document.createElement('input');

        this._input.setAttribute('type', 'text');

        this._input.addEventListener('change', this.onChangeValue.bind(this));

        root.appendChild(this._input);
    }

    public setValue(value: string): void {
        this._input.value = value;
    }

    private onChangeValue(): void {
        const new_value = this._input.value;

        this.onChanged.invoke(new_value);
    }
}