export class Delegate<T extends any[]> {
    private handlers: { func: (...args: T) => void, context: any }[] = [];

    public add(handler: (...args: T) => void, context: any): void {
        this.handlers.push({ func: handler, context });
    }

    public remove(handler: (...args: T) => void, context: any): void {
        const index = this.handlers.findIndex(h => h.func === handler && h.context === context);

        if (index !== -1) {
            this.handlers.splice(index, 1);
        }
    }

    public invoke(...args: T): void {
        for (const { func, context } of this.handlers) {
            func.apply(context, args);
        }
    }
}