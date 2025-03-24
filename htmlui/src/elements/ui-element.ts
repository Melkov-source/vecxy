export class UIElement {
    public readonly root: HTMLElement;

    public constructor(root: HTMLElement) {
        this.root = root;
    }

    public update?(): void;
}