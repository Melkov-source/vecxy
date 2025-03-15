import { Sprite } from "../graphics/sprite";
import { HTTP } from "../network/http";

export class AssetManager {
    public static async loadSpriteAsync(url: string): Promise<Sprite> {
        const blob = await HTTP.blobAsync(url);

        const image = new Image();

        image.src = URL.createObjectURL(blob);

        return new Promise((resolve, reject) => {
            image.onload = () =>{ 
                const sprite = Sprite.fromImage(image);

                resolve(sprite);
            }

            image.onerror = reject;
        });
    }
}