import "reflect-metadata";

import { diContainer } from "./di.container";

export function Service<T extends { new(...args: any[]): {} }>(constructor: T) {
    diContainer.register(constructor.name, new constructor());
}

export function Inject() {
    return function (target: any, property_key: string) {
        const type = Reflect.getMetadata("design:type", target, property_key);

        if (!type) {
            throw new Error(`Cannot resolve dependency for ${property_key}`);
        }

        target[property_key] = diContainer.resolve(type.name);
    };
}