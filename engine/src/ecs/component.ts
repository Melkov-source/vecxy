import { Node } from "./node";

export abstract class Component {
    public readonly node: Node;

    public constructor(node: Node) {
        this.node = node;
    }

    public start?(): void;
    public update?(dt: number): void;
    public onDisable?(): void;
    public onDestory?(): void;
    public render?(): void;
}