export default class Controller<D> {
    protected readonly data: D;
    constructor(defaults: D, data?: Partial<D>);
    updateData(data: Partial<D>): void;
}
