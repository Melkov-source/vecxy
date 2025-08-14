export class Uniform {
    public readonly name: string;
    public readonly location: WebGLUniformLocation;
    
    public constructor(info: WebGLActiveInfo, location: WebGLUniformLocation) {
        this.name = info.name;
        this.location = location;
    }
}