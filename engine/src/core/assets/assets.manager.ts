import { Asset } from "./asset";
import { ShaderAsset } from "./shader.asset";

export class AssetsManager {
    public static async loadShaderAsync(asset_path: string) : Promise<ShaderAsset | null> {
        try {
            const response = await fetch(asset_path);

            if (!response.ok) {
                throw new Error(`Ошибка при загрузке файла: ${response.statusText}`);
            }

            const text = await response.text();

            const shader_asset = new ShaderAsset(asset_path, text);

            return shader_asset;
        } catch (error) {
            console.error('[AssetsManager] [loadShaderAsync]', error);
            return null; 
        }
    }
}