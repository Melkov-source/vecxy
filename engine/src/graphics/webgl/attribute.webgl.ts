export class AttributeWebGL {
    public readonly name: string;
    public readonly location: GLint;

    //TODO: Type
    //TODO: Size

    public constructor(info: WebGLActiveInfo, location: GLint) {
        this.name = info.name;
        this.location = location;
    }
}