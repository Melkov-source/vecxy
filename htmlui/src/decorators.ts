import { HTMLUI } from "./htmlui";
import { POROPERTY_TYPE } from "./property.meta";

export namespace _decorator {
    export function property(type: POROPERTY_TYPE) {
        return function (context: any, property: string) {
            HTMLUI.registerProperty(context, property, type);
        };
    }
}