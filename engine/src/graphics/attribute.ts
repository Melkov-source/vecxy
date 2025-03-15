export class Attribute {
    public readonly name: string;
    public readonly location: GLint;

    public constructor(info: WebGLActiveInfo, location: GLint) {
        this.name = info.name;
        this.location = location;
    }
}