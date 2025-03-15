import { Node } from "./node";

export class Scene extends Node {
    public static current: Scene | null;

    public readonly name: string;
    public readonly children: Node[];

    public constructor(name: string) {
        super()
        
        this.name = name;
        this.children = [];
    }

    public addNode(node: Node): void {
        this.children.push(node);
    }

    public update(dt: number): void {
        for (let index = 0, count = this.children.length; index < count; ++index) {
            const child = this.children[index];
            
            child.update(dt);
        }
    }
}