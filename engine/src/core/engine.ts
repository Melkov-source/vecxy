export class Engine {
    public start(): void {
        // Получаем элемент canvas
        const canvas = document.getElementById('#game-canvas') as HTMLCanvasElement;
        
        // Инициализация контекста WebGL
        const gl = canvas.getContext('webgl');
        
        if (!gl) {
            console.log('WebGL не поддерживается');
            return;
        }

        // Вершины треугольника
        const vertices = new Float32Array([
            0.0,  0.5, 0.0,  // Верхняя вершина
           -0.5, -0.5, 0.0,  // Левая вершина
            0.5, -0.5, 0.0   // Правая вершина
        ]);

        // Шейдеры
        const vertexShaderSource = `
            attribute vec3 a_position;
            void main() {
                gl_Position = vec4(a_position, 1.0);
            }
        `;
        
        const fragmentShaderSource = `
            void main() {
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Красный цвет
            }
        `;
        
        // Функция для создания шейдеров
        const createShader = (type: number, source: string): WebGLShader => {
            const shader = gl.createShader(type);
            if (!shader) {
                throw new Error('Не удалось создать шейдер');
            }
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Ошибка компиляции шейдера:', gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                throw new Error('Ошибка компиляции шейдера');
            }
            
            return shader;
        }
        
        // Создаем шейдеры
        const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
        
        // Создаем программу шейдеров
        const shaderProgram = gl.createProgram();
        if (!shaderProgram) {
            throw new Error('Не удалось создать программу шейдеров');
        }
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.error('Ошибка линковки программы:', gl.getProgramInfoLog(shaderProgram));
            throw new Error('Ошибка линковки программы');
        }

        // Активируем программу шейдеров
        gl.useProgram(shaderProgram);

        // Создаем буфер для вершин
        const vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
            throw new Error('Не удалось создать буфер для вершин');
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        // Привязываем атрибуты шейдера
        const positionAttribLocation = gl.getAttribLocation(shaderProgram, 'a_position');
        gl.vertexAttribPointer(positionAttribLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionAttribLocation);

        // Очищаем экран и рисуем треугольник
        gl.clearColor(0.0, 0.0, 0.0, 1.0); // Черный фон
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3); // Рисуем треугольник
    }
}
