import { LogType } from "../log.type";

export interface ILogger {
    tag: string;
    log(type: LogType, message?: any, ...optional_params: any[]): void;
}