"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    constructor(defaults, data) {
        this.data = Object.assign(Object.assign({}, defaults), data);
    }
    updateData(data) {
        for (let dataKey in data) {
            let key = dataKey;
            if (key in data) {
                this.data[key] = data[key];
            }
        }
    }
}
exports.default = Controller;
