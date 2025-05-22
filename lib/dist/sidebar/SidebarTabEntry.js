"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SidebarTabPosition_1 = require("./SidebarTabPosition");
class SidebarTabEntry {
    constructor(id, name, options) {
        var _a, _b, _c, _d, _e, _f;
        this.id = id;
        this.name = name;
        this.position = (_a = options === null || options === void 0 ? void 0 : options.position) !== null && _a !== void 0 ? _a : SidebarTabPosition_1.SidebarTabPosition.LEFT;
        this.open = (_b = options === null || options === void 0 ? void 0 : options.openByDefault) !== null && _b !== void 0 ? _b : false;
        this.openIcon = (_d = (_c = options === null || options === void 0 ? void 0 : options.icons) === null || _c === void 0 ? void 0 : _c.open) !== null && _d !== void 0 ? _d : null;
        this.closedIcon = (_f = (_e = options === null || options === void 0 ? void 0 : options.icons) === null || _e === void 0 ? void 0 : _e.closed) !== null && _f !== void 0 ? _f : null;
        this.stateCallback = () => { };
    }
    setStateCallback(stateCallback) {
        this.stateCallback = stateCallback;
    }
    setTabState(state) {
        this.open = state;
        this.stateCallback(state);
    }
    getActiveIcon() {
        return (this.isOpen() ? this.getOpenIcon() : this.getClosedIcon());
    }
    isOpen() {
        return this.open;
    }
    getOpenIcon() {
        var _a;
        return (_a = this.openIcon) !== null && _a !== void 0 ? _a : "";
    }
    getClosedIcon() {
        var _a;
        return (_a = this.closedIcon) !== null && _a !== void 0 ? _a : "";
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getPosition() {
        return this.position;
    }
}
exports.default = SidebarTabEntry;
