import KeybindManager from "./keybinds/KeybindManager";
import ActionManager from "./action/ActionManager";
import MenuBarManager from "./menubar/MenuBarManager";
import TabManager from "./tab/TabManager";
import WindowManager from "./window/WindowManager";

export default class EditorLayoutManager {
    private readonly actionManager: ActionManager;
    private readonly menuBarManager: MenuBarManager;
    private readonly keybindManager: KeybindManager;
    private readonly tabManager: TabManager;
    private readonly windowManager: WindowManager;
    constructor() {
        this.actionManager = new ActionManager(this);
        this.menuBarManager = new MenuBarManager(this);
        this.keybindManager = new KeybindManager(this);
        this.tabManager = new TabManager(this);
        this.windowManager = new WindowManager(this);
    }


    getKeybindManager() {
        return this.keybindManager;
    }

    getMenuBarManager() {
        return this.menuBarManager;
    }

    getActionManager() {
        return this.actionManager;
    }

    getTabManager() {
        return this.tabManager;
    }

    getWindowManager() {
        return this.windowManager;
    }
}