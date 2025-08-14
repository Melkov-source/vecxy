import { Sprite } from "../graphics/sprite";
import { HTTP } from "../network/http";

export class AssetManager {
    private static _assets: Map<string, any> = new Map();

    public static async loadSpriteAsync(url: string): Promise<Sprite> {
        if(this._assets.has(url)) {
            return this._assets.get(url)!;
        }

        const blob = await HTTP.blobAsync(url);

        const image = new Image();

        image.src = URL.createObjectURL(blob);

        const promise = new Promise<Sprite>((resolve, reject) => {
            image.onload = () =>{ 
                const sprite = Sprite.fromImage(image);

                resolve(sprite);
            }

            image.onerror = reject;
        });

        const result = await promise;

        this._assets.set(url, result);

        return result;
    }

    public static async loadShaderAsync(url: string): Promise<string> {
        try {
            if(this._assets.has(url)) {
                return this._assets.get(url)!;
            }

            const result = await HTTP.getAsync<string>(url, {}, 'text');

            this._assets.set(url, result);

            return result;
        } catch (error) {
            console.error(`Ошибка загрузки шейдера с URL: ${url}`, );
            throw new Error(`Ошибка загрузки шейдера с URL: ${url}`);
        }
    }
}