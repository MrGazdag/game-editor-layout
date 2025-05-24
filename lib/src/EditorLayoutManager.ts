import ActionController from "./action/ActionController";
import MenuBarEntry from "./menubar/MenuBarEntry";
import KeybindManager from "./keybinds/KeybindManager";
import SidebarTabEntry from "./tab/SidebarTabEntry";
import {SidebarTabPosition} from "./tab/SidebarTabPosition";
import SidebarTabController, {SidebarInitData} from "./tab/SidebarTabController";
import ActionManager from "./action/ActionManager";
import TabSlotContainer from "./tab/TabSlotContainer";
import MenuBarManager from "./menubar/MenuBarManager";

export default class EditorLayoutManager {
    private readonly sideBarTabEntries: SidebarTabEntry[];

    private readonly actionManager: ActionManager;
    private readonly menuBarManager: MenuBarManager;
    private readonly keybindManager: KeybindManager;

    private readonly leftSideBar: TabSlotContainer;
    private readonly centerTabs: TabSlotContainer;
    private readonly rightSideBar: TabSlotContainer;
    constructor() {
        this.sideBarTabEntries = [];
        this.actionManager = new ActionManager(this);
        this.menuBarManager = new MenuBarManager(this);
        this.keybindManager = new KeybindManager(this);

        this.leftSideBar = new TabSlotContainer("left", false);
        this.centerTabs = new TabSlotContainer("center", true);
        this.rightSideBar = new TabSlotContainer("right", false);
    }

    getLeftSideBar() {
        return this.leftSideBar;
    }

    getCenterSideBar() {
        return this.centerTabs;
    }

    getRightSideBar() {
        return this.rightSideBar;
    }


    getKeybindManager() {
        return this.keybindManager;
    }

    addContextMenuAction(action: ActionController) {

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

    getMenuBarManager() {
        return this.menuBarManager;
    }

    getActionManager() {
        return this.actionManager;
    }
}