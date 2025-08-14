import { AssetManager } from "../assets/asset.manager";
import { Shader } from "./shader";

export enum BuiltinShader {
    SPRITE_2D = "./internal/shaders/2d.vert&./internal/shaders/2d.frag"
}

export class ShaderManager {
    public static get instance(): ShaderManager {
        return this._instance;
    }

    private static _instance: ShaderManager;

    private readonly _shaders: Shader[];
    private readonly _shaders_builtin: Map<BuiltinShader, Shader>;

    public constructor() {
        this._shaders = [];
        this._shaders_builtin = new Map();

        ShaderManager._instance = this;

        (window as any).shader_manager = this;
    }

    public async createBuiltinAsync(builtin: BuiltinShader): Promise<Shader> {
        if(this._shaders_builtin.has(builtin)) {
            return this._shaders_builtin.get(builtin)!;
        }

        var urls = builtin.split('&');

        const vert_url = urls[0];
        const frag_url = urls[1];

        const vert = await AssetManager.loadShaderAsync(vert_url);
        const frag = await AssetManager.loadShaderAsync(frag_url);

        const shader = new Shader(vert, frag);

        this._shaders_builtin.set(builtin, shader);

        return shader;
    }
}