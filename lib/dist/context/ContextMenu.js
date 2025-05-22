"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ContextMenu {
    constructor(name, posX, posY, actions, source) {
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.actions = [...actions];
        this.source = source;
        this.open = false;
    }
    getName() {
        return this.name;
    }
    getPosX() {
        return this.posX;
    }
    getPosY() {
        return this.posY;
    }
    getActions() {
        return this.actions;
    }
    getSource() {
        return this.source;
    }
    isOpen() {
        return this.open;
    }
    setOpen(open) {
        this.open = open;
    }
    appendChild(childMenu) {
        this.actions.splice(0, 0, ...childMenu.actions);
    }
}
exports.default = ContextMenu;
