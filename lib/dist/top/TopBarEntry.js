"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TopBarEntry {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.actions = [];
    }
    addAction(action) {
        this.actions.push(action);
    }
    removeAction(action) {
        let index = this.actions.indexOf(action);
        if (index > -1) {
            this.actions.splice(index, 1);
        }
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getActions() {
        return this.actions;
    }
}
exports.default = TopBarEntry;
