"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionSource_1 = __importDefault(require("../action/ActionSource"));
class KeybindManager {
    constructor(parent) {
        this.parent = parent;
        this.actionToBind = new Map();
        this.keyToBind = new Map();
        addEventListener("keydown", e => {
            let result = this.pressKey(e.code, e.ctrlKey, e.shiftKey, e.altKey, e.metaKey);
            if (result) {
                e.preventDefault();
            }
        });
    }
    addBind(bind) {
        let action = this.actionToBind.get(bind.getAction());
        if (!action) {
            action = [];
            this.actionToBind.set(bind.getAction(), action);
        }
        action.push(bind);
        let key = this.keyToBind.get(bind.getCode());
        if (!key) {
            key = [];
            this.keyToBind.set(bind.getCode(), key);
        }
        key.push(bind);
        let editorAction = this.parent.getAction(bind.getAction());
        if (editorAction) {
            editorAction.refreshKeybinds();
        }
    }
    getKeybindsFor(actionId) {
        return this.actionToBind.get(actionId);
    }
    removeBind(bind) {
        let action = this.actionToBind.get(bind.getAction());
        if (action) {
            let index = action.indexOf(bind);
            if (index > -1) {
                action.splice(index, 1);
            }
            if (action.length == 0)
                this.actionToBind.delete(bind.getAction());
        }
        let key = this.keyToBind.get(bind.getCode());
        if (key) {
            let index = key.indexOf(bind);
            if (index > -1) {
                key.splice(index, 1);
            }
            if (key.length == 0)
                this.keyToBind.delete(bind.getCode());
        }
    }
    pressKey(key, ctrl, shift, alt, meta) {
        let success = false;
        let binds = this.keyToBind.get(key);
        if (binds) {
            for (let bind of binds) {
                if (ctrl == bind.isCtrl()
                    && shift == bind.isShift()
                    && alt == bind.isAlt()
                    && meta == bind.isMeta()
                    && key == bind.getCode()) {
                    let action = this.parent.getAction(bind.getAction());
                    if (action) {
                        action.runAction(ActionSource_1.default.KEYBIND);
                        success = true;
                    }
                }
            }
        }
        return success;
    }
}
exports.default = KeybindManager;
