import { LogType } from "./log.type";
import { ILogger } from "./variants/logger.interface";
import { LoggerConsole } from "./variants/logger.console";

export class Logger {
    public readonly tag: string;

    private readonly _loggers: ILogger[] = [];

    public constructor(tag: string) {
        this.tag = tag;

        this._loggers.push(new LoggerConsole(tag));
    }

    public trace(message?: any, ...optional_params: any[]): void {
        this.logInternal(LogType.TRACE, message, ...optional_params);
    }

    public debug(message?: any, ...optional_params: any[]): void {
        this.logInternal(LogType.DEBUG, message, ...optional_params);
    }

    public info(message?: any, ...optional_params: any[]): void {
        this.logInternal(LogType.INFO, message, ...optional_params);
    }

    public warn(message?: any, ...optional_params: any[]): void {
        this.logInternal(LogType.WARN, message, ...optional_params);
    }

    public error(message?: any, ...optional_params: any[]): void {
        this.logInternal(LogType.ERROR, message, ...optional_params);
    }

    public fatal(message?: any, ...optional_params: any[]): void {
        this.logInternal(LogType.FATAL, message, ...optional_params);
    }

    public success(message?: any, ...optional_params: any[]): void {
        this.logInternal(LogType.SUCCESS, message, ...optional_params);
    }

    public failed(message?: any, ...optional_params: any[]): void {
        this.logInternal(LogType.FAILED, message, ...optional_params);
    }

    private logInternal(type: LogType, message?: any, ...optional_params: any[]): void {
        for (let index = 0, count = this._loggers.length; index < count; index++) {
            const logger = this._loggers[index];
            
            logger.log(type, message, ...optional_params);
        }
    }
}