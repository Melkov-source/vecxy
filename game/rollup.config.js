import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';  // Плагин для копирования файлов
import del from 'rollup-plugin-delete'; // Плагин для удаления файлов и папок
import resolve from '@rollup/plugin-node-resolve'; // Для поиска локальных модулей
import commonjs from '@rollup/plugin-commonjs'; // Для обработки CommonJS модулей

export default {
    input: 'src/game.ts',  // Точка входа для игрового проекта
    output: [
        {
            file: 'build/game.js',  // Скомпилированный файл игры
            format: 'umd',           // Универсальный формат для использования в браузере
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
                // Копируем HTML и CSS
                { src: 'template/index.html', dest: 'build' },
                { src: 'template/styles.css', dest: 'build' },
                { src: 'template/favicon.ico', dest: 'build' },
            ]
        }),

        resolve({
            preferBuiltins: true,
        }),

        commonjs(),
    ],
    external: [], // Движок будет упакован, не нужно исключать его
};
