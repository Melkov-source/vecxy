import { Texture } from "./texture";
import { TextureManager } from "./texture.manager";

export class Sprite {
    public readonly texture: Texture;

    private constructor(texture: Texture) {
       this.texture = texture;
    }

    public static fromImage(image: HTMLImageElement): Sprite {
        const texture = TextureManager.instance.create(image);
        const sprite = new Sprite(texture);

        return sprite;
    }
}