import ActionController, {ActionData, ActionHandle, ActionInitData} from "./action/ActionController";
import ActionSource from "./action/ActionSource";
import EditorAction from "./action/EditorAction";
import TopBarEntry from "./top/TopBarEntry";
import KeybindManager from "./keybinds/KeybindManager";
import SidebarTabEntry from "./sidebar/SidebarTabEntry";
import {SidebarTabPosition} from "./sidebar/SidebarTabPosition";
import SidebarTabController, {SidebarInitData} from "./sidebar/SidebarTabController";

export default class EditorLayoutManager {
    private readonly actions: Map<string, EditorAction>;
    private readonly topBarEntries: TopBarEntry[];
    private readonly sideBarTabEntries: SidebarTabEntry[];
    private readonly keybindManager: KeybindManager;
    constructor() {
        this.actions = new Map();
        this.topBarEntries = [];
        this.sideBarTabEntries = [];
        this.keybindManager = new KeybindManager(this);
    }

    createAction(controller: ActionController): EditorAction;
    createAction(action: ActionHandle): EditorAction;
    createAction(options: ActionInitData): EditorAction;
    createAction(param: ActionController | ActionHandle | ActionInitData): EditorAction {
        // This method is very cursed, but having to support differently overloaded methods is pain
        let controller: ActionController;
        if (param instanceof ActionController) {
            controller = param;
        } else if (typeof param == "function") {
            controller = new ActionController({
                action: param,
            });
        } else {
            controller = new ActionController(param);
        }

        let editorAction = new EditorAction(this, controller);
        let idValue = editorAction.getId();
        if (idValue) this.actions.set(idValue, editorAction);
        return editorAction;
    }

    getAction(id: string) {
        return this.actions.get(id);
    }

    createTopBarEntry(id: string, name: string) {
        let entry = new TopBarEntry(id, name);
        this.topBarEntries.push(entry);
        return entry;
    }
    getTopBarEntry(id: string): TopBarEntry | undefined {
        return this.topBarEntries.find(e => e.getId() == id);
    }

    getKeybindManager() {
        return this.keybindManager;
    }

    addContextMenuAction(action: ActionController) {

    }

    getTopBarEntries() {
        return this.topBarEntries;
    }

    createSidebarTabEntry(controller: SidebarTabController): SidebarTabEntry;
    createSidebarTabEntry(options: SidebarInitData): SidebarTabEntry;
    createSidebarTabEntry(param: SidebarTabController | SidebarInitData) {
        let controller: SidebarTabController;
        if (param instanceof SidebarTabController) {
            controller = param;
        } else {
            controller = new SidebarTabController(param);
        }
        let entry = new SidebarTabEntry(this, controller);
        this.sideBarTabEntries.push(entry);
        return entry;
    }

    getSideBarTabEntry(id: string): SidebarTabEntry | undefined {
        return this.sideBarTabEntries.find(e => e.getId() == id);
    }

    getSideBarTabEntries(position: SidebarTabPosition) {
        return this.sideBarTabEntries.filter(e => e.getPosition() == position);
    }
}