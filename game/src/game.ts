import { Engine, GameObject, IGame, Inject, Logger, SceneSystem, Service, Sprite, SpriteComponent, Vector2 } from 'vecxy';

class Game implements IGame {
    public start(): void {
        
        const createDebugGui = (): void => {
            const gui = new (window as any).dat.GUI();

            let controller = {
                createSprite: function() {
                    const game_object = new GameObject();
                    const sprite = game_object.addComponent(SpriteComponent);

                    const params = {
                        position_x: 0,
                        position_y: 0,
                        size_x: 100,
                        size_y: 100,
                    }

                    gui.add(params, 'position_x', 0, 1920).name('X позиция').onChange((value: any) => {
                        sprite.setPosition(new Vector2(params.position_x, params.position_y));
                    });

                    gui.add(params, 'position_y', 0, 1080).name('Y позиция').onChange((value: any) => {
                        sprite.setPosition(new Vector2(params.position_x, params.position_y));
                    });

                    gui.add(params, 'size_x', 0, 1080).name('Y позиция').onChange((value: any) => {
                        sprite.setSize(new Vector2(params.size_x, params.size_y));
                    });
                    gui.add(params, 'size_y', 0, 1080).name('Y позиция').onChange((value: any) => {
                        sprite.setSize(new Vector2(params.size_x, params.size_y));
                    });

                    SceneSystem.scene.AddGameObject(game_object);
                }
            };

            gui.add(controller, 'createSprite').name('CreateSprite');
        }

        createDebugGui();
    }

    public update(): void {

    }

    public render(): void {
    }
}

const game = new Game();

const engine = new Engine(game);

engine.run();