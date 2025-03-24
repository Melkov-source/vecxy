import { HTMLUI } from "./htmlui";
import { POROPERTY_TYPE, VIEW_TYPE } from "./property.meta";

export namespace _decorator {
    export function property(type: POROPERTY_TYPE, view: VIEW_TYPE, min: number, max: number) {
        return function (context: any, property: string) {
            HTMLUI.registerProperty(context, property, type, view, min, max);
        };
    }
}