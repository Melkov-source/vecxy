async function loadShader(url: string): Promise<string> {
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`Не удалось загрузить шейдер: ${url}`);
    }

    return await response.text();
}

export class Application {
    public async runAsync(): Promise<void> {
        window.onresize = async (event) => {
            await this.runAsync();
        }

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

        const vertex_shader_source = await loadShader("./assets/shaders/vertex_shader.glsl");
        const fragment_shader_source = await loadShader("./assets/shaders/fragment_shader.glsl");

        const vertexShader = compileShader(vertex_shader_source, webgl.VERTEX_SHADER)!;
        const fragmentShader = compileShader(fragment_shader_source, webgl.FRAGMENT_SHADER)!;

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
