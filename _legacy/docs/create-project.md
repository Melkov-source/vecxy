```bash
npm init -y
npm install typescript ts-node @types/node --save-dev
npx tsc --init
```

```json
{
  "compilerOptions": {
    "module": "CommonJS",           // Используем CommonJS для совместимости
    "target": "ES6",                // Компилируем для ES6
    "declaration": true,            // Генерация файлов `.d.ts` для экспорта типов
    "outDir": "./dist",             // Папка для скомпилированных файлов
    "rootDir": "./src",             // Исходный код
    "strict": true,                 // Включаем строгий режим
    "esModuleInterop": true,        // Упрощаем импорт ES6 модулей
    "resolveJsonModule": true,      // Поддержка JSON импорта
    "baseUrl": "./",                // Абсолютные пути
    "paths": {
      "@core/*": ["src/core/*"],    // Абсолютный путь для `core`
      "@utils/*": ["src/utils/*"]   // Абсолютный путь для `utils`
    }
  },
  "include": ["src"],               // Включаем исходный код
  "exclude": ["node_modules"]       // Исключаем ненужные папки
}
```

```text
my-game-engine/
├── src/
│   ├── core/
│   │   ├── engine.ts
│   │   ├── scene.ts
│   │   └── game-object.ts
│   ├── utils/
│   │   ├── math.ts
│   │   └── events.ts
│   ├── components/
│   │   ├── sprite.ts
│   │   ├── physics.ts
│   │   └── audio.ts
│   ├── systems/
│   │   ├── render.ts
│   │   └── input.ts
│   └── index.ts               // Главный экспорт движка
├── dist/                      // Компилированный код
├── tsconfig.json              // Конфигурация TypeScript
├── package.json               // Конфигурация npm
└── .gitignore                 // Исключение файлов из Git
```

```json
"main": "dist/index.js",        // Главный файл JS
"types": "dist/index.d.ts",     // Главный файл типов
"files": ["dist"]               // Публикуем только папку `dist`

"scripts": {
  "build": "tsc",       // Компиляция TypeScript
  "start": "node dist/index.js" // Запуск после сборки
}
```

```bash
npm install --save-dev webpack webpack-cli webpack-dev-server ts-loader html-webpack-plugin typescript
npm install --save-dev @types/webpack-env

"scripts": {
    "start": "webpack serve --mode development",  // Запуск сервера с горячей перезагрузкой
    "build": "webpack --mode production"          // Сборка для продакшн
}
```

webpack.config
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts', // Точка входа в проект
  output: {
    filename: 'bundle.js',  // Имя собранного файла
    path: path.resolve(__dirname, 'dist'), // Папка для скомпилированных файлов
  },
  resolve: {
    extensions: ['.ts', '.js'], // Разрешаем работу с .ts и .js файлами
  },
  module: {
    rules: [
      {
        test: /\.ts$/,  // Применяем для всех .ts файлов
        use: 'ts-loader', // Используем ts-loader для компиляции TypeScript в JavaScript
        exclude: /node_modules/, // Исключаем node_modules
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'dist'),  // Папка для обслуживаемых файлов
    hot: true,  // Включаем горячую перезагрузку
    open: true, // Открывать браузер при запуске
    port: 8080, // Порт для локального сервера
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Шаблон для HTML страницы
    }),
  ],
};
```



