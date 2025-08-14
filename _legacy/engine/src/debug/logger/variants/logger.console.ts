import { LogType } from "../log.type";
import { ILogger } from "./logger.interface";

export class LoggerConsole implements ILogger {
    public readonly tag: string;

    public constructor(tag: string) {
        this.tag = tag;
    }

    public log(type: LogType, message?: any, ...optional_params: any[]): void {
        if (type === LogType.NONE) {
            return;
        }

        const message_data = typeof message === 'object' ? JSON.stringify(message) : message;

        const date = new Date();

        var format_message = `[${date.toISOString()}] [${this.tag}] [${type}] ${message_data}`;

        let logColor = '';
        switch (type) {
            case LogType.TRACE:
                logColor = 'color:rgb(192, 192, 192);';
                break;
            case LogType.DEBUG:
                logColor = 'color:rgb(255, 255, 255);';
                break;
            case LogType.INFO:
                logColor = 'color:rgb(32, 143, 255);';
                break;
            case LogType.WARN:
                logColor = 'color:rgb(255, 153, 21);';
                break;
            case LogType.ERROR:
                logColor = 'color:rgb(241, 1, 1);';
                break;
            case LogType.FATAL:
                logColor = 'color:rgb(197, 5, 5);';
                break;
            case LogType.SUCCESS:
                logColor = 'color:rgb(132, 255, 32);';
                break;
            case LogType.FAILED:
                logColor = 'color:rgb(255, 112, 112);';
                break;
        }


        // Log message with color
        switch (type) {
            case LogType.TRACE:
                console.log(`%c${format_message}`, logColor, ...optional_params);
                break;
            case LogType.DEBUG:
                console.log(`%c${format_message}`, logColor, ...optional_params);
                break;
            case LogType.INFO:
                console.info(`%c${format_message}`, logColor, ...optional_params);
                break;
            case LogType.WARN:
                console.warn(`%c${format_message}`, logColor, ...optional_params);
                break;
            case LogType.ERROR:
                console.error(`%c${format_message}`, logColor, ...optional_params);
                break;
            case LogType.FATAL:
                console.error(`%c${format_message}`, logColor, ...optional_params);
                break;
            case LogType.SUCCESS:
                console.info(`%c${format_message}`, logColor, ...optional_params);
                break;
            case LogType.FAILED:
                console.info(`%c${format_message}`, logColor, ...optional_params);
                break;
        }
    }

}