export enum POROPERTY_TYPE {
    NUMBER = "NUMBER",
    STRING = "STRING",
    VECTOR_2 = "VECTOR_2"
}

export type PropertyMeta = {
    ctx_prototype: any;
    name: string;
    type: POROPERTY_TYPE;
}