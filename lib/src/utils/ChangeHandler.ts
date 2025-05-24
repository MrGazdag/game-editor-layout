export default class ChangeHandler<T> {
    private readonly handlers: ChangeHandlerFunction<T>[];
    constructor() {
        this.handlers = [];
    }

    public add(handler: ChangeHandlerFunction<T>) {
        if (this.handlers.includes(handler)) return;

        this.handlers.push(handler);
    }

    public remove(handler: ChangeHandlerFunction<T>) {
        let index = this.handlers.indexOf(handler);
        if (index == -1) return;

        this.handlers.splice(index, 1);
    }

    public apply(value: T) {
        for (let handler of this.handlers) {
            handler(value);
        }
    }
}
export type ChangeHandlerFunction<T> = (value: T) => void;