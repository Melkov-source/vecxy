export type Task<T> = Promise<T>;

export class AsyncUtils {
    public static wait(seconds: number, cancellationToken?: CancellationToken): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                if (cancellationToken && cancellationToken.isCancelled()) {
                    cancellationToken.throwIfCancelled();
                    reject();

                    return;
                }

                resolve();
            }, seconds * 1000);

            if (cancellationToken) {
                cancellationToken.onCancel(() => {
                    clearTimeout(timeoutId);
                    reject(new Error('Operation canceled'));
                });
            }
        })
    }

    public static async yield(): Promise<void> {
        await AsyncUtils.wait(0.1);

        return Promise.resolve();
    }
}

export class CancellationToken {
    private _isCancelled: boolean = false;
    private _callbacks: Function[] = [];

    public cancel() {
        if (this._isCancelled === null || this._isCancelled) {
            return;
        }

        this._isCancelled = true;
        this._callbacks.forEach(callback => callback());
        this._callbacks = [];
    }

    public throwIfCancelled() {
        if (this._isCancelled === null || this._isCancelled) {
            throw new Error('Operation canceled');
        }
    }

    public isCancelled(): boolean {
        return this._isCancelled;
    }

    public onCancel(callback: Function) {
        if (this._isCancelled) {
            callback();
        } else {
            this._callbacks.push(callback);
        }
    }
}