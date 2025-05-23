import ActionController from "./action/ActionController";
import TopBarEntry from "./top/TopBarEntry";
import KeybindManager from "./keybinds/KeybindManager";
import SidebarTabEntry from "./tab/SidebarTabEntry";
import {SidebarTabPosition} from "./tab/SidebarTabPosition";
import SidebarTabController, {SidebarInitData} from "./tab/SidebarTabController";
import ActionManager from "./action/ActionManager";

export default class EditorLayoutManager {
    private readonly topBarEntries: TopBarEntry[];
    private readonly sideBarTabEntries: SidebarTabEntry[];

    private readonly actionManager: ActionManager;
    private readonly keybindManager: KeybindManager;
    constructor() {
        this.topBarEntries = [];
        this.sideBarTabEntries = [];
        this.actionManager = new ActionManager(this);
        this.keybindManager = new KeybindManager(this);
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

    getActionManager() {
        return this.actionManager;
    }
}