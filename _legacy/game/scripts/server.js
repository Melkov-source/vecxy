const browserSync = require('browser-sync').create();
const path = require('path');

// Указываем папку с билдом
const buildPath = path.join(__dirname, '../build');

// Запускаем сервер с отслеживанием изменений в папке билда
browserSync.init({
    server: {
        baseDir: buildPath,  // Указываем базовую папку для сервера
    },
    files: [`${buildPath}/**/*.*`],  // Отслеживаем все файлы в папке с билдом
    open: false,  // Отключить автоматическое открытие браузера
    notify: false,  // Отключить уведомления о перезагрузке
    reloadDelay: 0,  // Уменьшаем задержку перед перезагрузкой
    reloadOnRestart: true,  // Перезагружать при каждом рестарте сервера
    watch: true  // Включаем наблюдение за изменениями
});
