export class Asset {
    public readonly path: string;

    protected is_loaded: boolean = false;

    public constructor(path: string) {
        this.path = path;
    }

    public load(): void {

    }
}