import { Engine, GameObject, IGame, Inject, Logger, SceneSystem, Service, Sprite, SpriteComponent, Vector2 } from 'vecxy';

class Game implements IGame {
    public start(): void {
        const game_object = new GameObject();

        const sprite = game_object.addComponent(SpriteComponent);

        const createDebugGui = (): void => {
            const gui = new (window as any).dat.GUI();
        
            const params = {
                x: 100,
                y: 100
            };
        
            gui.add(params, 'x', 1, 1000).name('X:').onChange((value: any) => {
                sprite.setSize(new Vector2(params.x, params.y));
            });

            gui.add(params, 'y', 1, 1000).name('Y:').onChange((value: any) => {
                sprite.setSize(new Vector2(params.x, params.y));
            });
        }

        createDebugGui();


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