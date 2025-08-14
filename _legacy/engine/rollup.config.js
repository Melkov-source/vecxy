import typescript from "@rollup/plugin-typescript";
import del from 'rollup-plugin-delete'; // Добавьте этот импорт
import copy from 'rollup-plugin-copy';

export default {
    input: "src/vecxy.ts",          // Главный файл для сборки
    output: [
        {
            file: "dist/vecxy.mjs",      // Финальный выходной файл (для ESM)
            format: "es",                 // Формат модуля (ESM)
            sourcemap: true               // Генерация sourcemap для отладки
        },
        {
            file: "dist/vecxy.cjs",      // Финальный файл для CommonJS
            format: "cjs",                // Формат CommonJS (для Node.js)
            sourcemap: true               // Генерация sourcemap для отладки
        }
    ],
    plugins: [
        typescript({                    // Используем плагин TypeScript
            tsconfig: "./tsconfig.json"    // Указываем конфиг TypeScript
        }),

        del({ targets: 'dist/*' }),  // Удаляем старые файлы в папке dist

        copy({
            targets: [
                { src: 'internal/*', dest: 'dist/internal' },  // Копируем файлы
            ]
        }),
    ],
    external: [
        "reflect-metadata"
    ]
};
