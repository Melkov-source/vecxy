import { Engine, Vector2, Logger } from 'vecxy';


const engine = new Engine();

engine.run();

const logger = new Logger("game");


const vector_1 = new Vector2(1, 2);
const vector_2 = new Vector2();
const vector_3 = new Vector2(vector_1);

logger.trace('Tracking vector values:', vector_1, vector_2, vector_3);
logger.debug('Debugging vector values:', vector_1, vector_2, vector_3);
logger.info('Information about vectors:', vector_1, vector_2, vector_3);
logger.warn('Warning: Potential issue with vectors:', vector_1, vector_2, vector_3);
logger.error('Error encountered while processing vectors:', vector_1, vector_2, vector_3);
logger.fatal('Fatal error, vectors cannot be processed:', vector_1, vector_2, vector_3);
logger.success('Success! Vectors processed correctly:', vector_1, vector_2, vector_3);
logger.failed('Failed to process vectors:', vector_1, vector_2, vector_3);

throw new Error("test");



function createDebugGui(): void {
    const gui = new (window as any).dat.GUI();

    const params = {
        color: [1.0, 0.0, 0.0], // Изначальный красный цвет
        speed: 1.0
    };

    // Настроим элементы управления
    gui.addColor(params, 'color').name('Triangle Color').onChange((value: any) => {
        console.log(value)
    });

    gui.add(params, 'speed', 0.1, 10).name('Rotation Speed').onChange((value: any) => {
        console.log(value)
    });;
}