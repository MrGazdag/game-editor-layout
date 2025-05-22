"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _EditorAction_manager, _EditorAction_action, _EditorAction_keybinds;
Object.defineProperty(exports, "__esModule", { value: true });
const ActionSource_1 = __importDefault(require("./ActionSource"));
class EditorAction {
    constructor(manager, action) {
        _EditorAction_manager.set(this, void 0);
        _EditorAction_action.set(this, void 0);
        _EditorAction_keybinds.set(this, void 0);
        __classPrivateFieldSet(this, _EditorAction_manager, manager, "f");
        __classPrivateFieldSet(this, _EditorAction_action, action, "f");
        __classPrivateFieldSet(this, _EditorAction_keybinds, [], "f");
    }
    refreshKeybinds() {
        var _a;
        let id = this.getId();
        if (id) {
            __classPrivateFieldSet(this, _EditorAction_keybinds, (_a = __classPrivateFieldGet(this, _EditorAction_manager, "f").getKeybindManager().getKeybindsFor(id)) !== null && _a !== void 0 ? _a : [], "f");
        }
    }
    getId() {
        return __classPrivateFieldGet(this, _EditorAction_action, "f").getId();
    }
    getName() {
        return __classPrivateFieldGet(this, _EditorAction_action, "f").getName();
    }
    getDescription() {
        return __classPrivateFieldGet(this, _EditorAction_action, "f").getDescription();
    }
    getIcon() {
        return __classPrivateFieldGet(this, _EditorAction_action, "f").getIcon();
    }
    runAction(source) {
        return __classPrivateFieldGet(this, _EditorAction_action, "f").runAction(source !== null && source !== void 0 ? source : ActionSource_1.default.CUSTOM);
    }
    getKeybinds() {
        return __classPrivateFieldGet(this, _EditorAction_keybinds, "f");
    }
    getManager() {
        return __classPrivateFieldGet(this, _EditorAction_manager, "f");
    }
}
_EditorAction_manager = new WeakMap(), _EditorAction_action = new WeakMap(), _EditorAction_keybinds = new WeakMap();
exports.default = EditorAction;
