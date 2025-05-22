"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionController_1 = __importDefault(require("./action/ActionController"));
const EditorAction_1 = __importDefault(require("./action/EditorAction"));
const TopBarEntry_1 = __importDefault(require("./top/TopBarEntry"));
const KeybindManager_1 = __importDefault(require("./keybinds/KeybindManager"));
const SidebarTabEntry_1 = __importDefault(require("./sidebar/SidebarTabEntry"));
class EditorLayoutManager {
    constructor() {
        this.actions = new Map();
        this.topBarEntries = [];
        this.sideBarTabEntries = [];
        this.keybindManager = new KeybindManager_1.default(this);
    }
    createAction(actionOrController, idOrOptions, options) {
        // This method is very cursed, but having to support differently overloaded methods is pain
        let controller;
        if (actionOrController instanceof ActionController_1.default) {
            controller = actionOrController;
        }
        else {
            let id;
            let optionsValue = undefined;
            if (idOrOptions === null || typeof idOrOptions === "string") {
                id = idOrOptions;
                if (options)
                    optionsValue = options;
            }
            else {
                id = null;
                if (idOrOptions)
                    optionsValue = idOrOptions;
            }
            controller = new ActionController_1.default(id, optionsValue, actionOrController);
        }
        let editorAction = new EditorAction_1.default(this, controller);
        let idValue = editorAction.getId();
        if (idValue)
            this.actions.set(idValue, editorAction);
        return editorAction;
    }
    getAction(id) {
        return this.actions.get(id);
    }
    createTopBarEntry(id, name) {
        let entry = new TopBarEntry_1.default(id, name);
        this.topBarEntries.push(entry);
        return entry;
    }
    getTopBarEntry(id) {
        return this.topBarEntries.find(e => e.getId() == id);
    }
    getKeybindManager() {
        return this.keybindManager;
    }
    addContextMenuAction(action) {
    }
    getTopBarEntries() {
        return this.topBarEntries;
    }
    createSideBarTabEntry(id, name, options) {
        let entry = new SidebarTabEntry_1.default(id, name, options);
        this.sideBarTabEntries.push(entry);
        return entry;
    }
    getSideBarTabEntry(id) {
        return this.sideBarTabEntries.find(e => e.getId() == id);
    }
    getSideBarTabEntries(position) {
        return this.sideBarTabEntries.filter(e => e.getPosition() == position);
    }
}
exports.default = EditorLayoutManager;
