export * from './graphics'
export * from './application'

import {Application} from "./application";

(async () => {
    const application = new Application();

    await application.runAsync();
})()
