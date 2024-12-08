export class Application {
    public run(): void {
        const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;

        const webgl = canvas.getContext("webgl");

        if (!webgl) {
            console.error("WebGL не поддерживается");
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const vertices = new Float32Array([
            0.0, 0.5,  // Вершина 1
            -0.5, -0.5,  // Вершина 2
            0.5, -0.5   // Вершина 3
        ]);

        const vertexShaderSource = `
            attribute vec2 position;
            
            void main(void) {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        const fragmentShaderSource = `
            void main(void) {
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            }
        `;

        // Явное указание типов для source и type
        const compileShader = (source: string, type: GLenum): WebGLShader | undefined => {
            const shader = webgl.createShader(type);

            if (!shader) {
                console.error("Не удалось создать шейдер.");
                return undefined;
            }

            webgl.shaderSource(shader, source);
            webgl.compileShader(shader);

            if (!webgl.getShaderParameter(shader, webgl.COMPILE_STATUS)) {
                console.log("Ошибка компиляции шейдера: ", webgl.getShaderInfoLog(shader));
                return undefined;
            }

            return shader;
        }

        const vertexShader = compileShader(vertexShaderSource, webgl.VERTEX_SHADER)!;
        const fragmentShader = compileShader(fragmentShaderSource, webgl.FRAGMENT_SHADER)!;

        const shaderProgram = webgl.createProgram();

        if (!shaderProgram) {
            console.error("Не удалось создать программу шейдеров.");
            return;
        }

        webgl.attachShader(shaderProgram, vertexShader);
        webgl.attachShader(shaderProgram, fragmentShader);
        webgl.linkProgram(shaderProgram);

        if (!webgl.getProgramParameter(shaderProgram, webgl.LINK_STATUS)) {
            console.log("Ошибка при связывании программы шейдеров: ", webgl.getProgramInfoLog(shaderProgram));
        }

        webgl.useProgram(shaderProgram);

        // Создание буфера для вершин
        const buffer = webgl.createBuffer();
        webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
        webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

        // Привязка атрибута позиции
        const positionAttributeLocation = webgl.getAttribLocation(shaderProgram, "position");
        webgl.vertexAttribPointer(positionAttributeLocation, 2, webgl.FLOAT, false, 0, 0);
        webgl.enableVertexAttribArray(positionAttributeLocation);

        // Очистка экрана и рендеринг
        webgl.clearColor(0.0, 0.0, 0.0, 1.0); // Черный фон
        webgl.clear(webgl.COLOR_BUFFER_BIT);

        webgl.viewport(0, 0, canvas.width, canvas.height);
        webgl.drawArrays(webgl.TRIANGLES, 0, 3);  // Рисуем треугольник
    }
}
