export default class Controller<D> {
    protected readonly data: D;
    constructor(defaults: D, data?: Partial<D>) {
        this.data = {
            ...defaults,
            ...data
        };
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