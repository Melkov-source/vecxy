import { Engine, GameObject, IGame, Inject, Logger, SceneSystem, Service, Sprite, SpriteComponent, Vector2 } from 'vecxy';

class Game implements IGame {
    public start(): void {
        // Assets.load<Sprite>("assets/textures/splash.jpeg", (texture: Sprite) => {

        // });

        // const sprite: Sprite = Assets.loadAsync<Sprite>("assets/textures/splash.jpeg");

        // const game_object = new GameObject();

        // var sprite_renderer = game_object.addComponent(SpriteRenderer);

        // sprite_renderer.setSprite(sprite);

        const game_object = new GameObject();
        const sprite = game_object.addComponent(SpriteComponent);

        SceneSystem.scene.AddGameObject(game_object);
    }

    public update(): void {

    }

    public render(): void {

    }
}

const game = new Game();

const engine = new Engine(game);

engine.run();