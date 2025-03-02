import {Engine} from 'vecxy';


const engine = new Engine();

engine.start();

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