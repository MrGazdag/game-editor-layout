import ChangeHandler from "./ChangeHandler";

export default class Controller<D> {
    protected readonly data: D;
    protected readonly changeHandler: ChangeHandler<D>;
    constructor(defaults: D, data?: Partial<D>) {
        this.data = {
            ...defaults,
            ...data
        };
        this.changeHandler = new ChangeHandler();
    }

    public getChangeHandler() {
        return this.changeHandler;
    }

    public updateData(data: Partial<D>) {
        for (let dataKey in data) {
            let key = dataKey as keyof D;
            if (key in data) {
                this.data[key] = data[key]!;
            }
        }
    }
}