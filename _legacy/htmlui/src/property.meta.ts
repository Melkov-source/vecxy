export enum POROPERTY_TYPE {
    NUMBER = "NUMBER",
    STRING = "STRING",
    VECTOR_2 = "VECTOR_2"
}

export enum VIEW_TYPE {
    KEY_VALUE = "KEY_VALUE",
    SLIDER = "SLIDER"
}

export type PropertyMeta = {
    ctx_prototype: any;
    name: string;
    type: POROPERTY_TYPE;
    view: VIEW_TYPE;
    min: number,
    max: number;
}