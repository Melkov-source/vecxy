import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';  // Плагин для копирования файлов
import del from 'rollup-plugin-delete'; // Плагин для удаления файлов и папок
import resolve from '@rollup/plugin-node-resolve'; // Для поиска локальных модулей
import commonjs from '@rollup/plugin-commonjs'; // Для обработки CommonJS модулей
import sourcemaps from 'rollup-plugin-sourcemaps'; // Плагин для работы с source maps

export default {
    input: ['src/game.ts'],  // Точка входа для игрового проекта
    output: [
        {
            file: 'build/game.js',  // Скомпилированный файл игры
            format: 'umd',           // Универсальный формат для использования в браузере
            name: 'Game',  // <-- Добавь имя здесь
            sourcemap: true,
        },
    ],
    plugins: [
        // Удаляем папку build перед каждым билдом
        del({ targets: 'build/*' }),

        // Типизация
        typescript({
            tsconfig: './tsconfig.json',
        }),

        // Копирование файлов
        copy({
            targets: [
                // Копируем все ресурсы из папки assets
                { src: 'assets/**/*', dest: 'build/assets' },

                // Копируем внутренние ресурсы движка
                { src: 'node_modules/vecxy/internal/*', dest: 'build/internal' },

                // Копируем HTML и CSS
                { src: 'template/index.html', dest: 'build' },
                { src: 'template/favicon.ico', dest: 'build' },

                { src: 'template/styles/*', dest: 'build/styles' },
                { src: 'template/libs/*', dest: 'build/libs' },

                //Sources
                { src: 'src/*', dest: 'build/src' },
                { src: 'node_modules/vecxy/src/*', dest: 'build/engine/src' },

                { src: 'node_modules/htmlui/src/*', dest: 'build/htmlui/src' },
            ]
        }),

        resolve({
            preferBuiltins: true
        }),

        commonjs(),

        sourcemaps(),
    ],
    external: []
};
