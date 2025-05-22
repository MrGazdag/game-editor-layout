import ActionController, {ActionData} from "./action/ActionController";
import ActionSource from "./action/ActionSource";
import EditorAction from "./action/EditorAction";
import TopBarEntry from "./top/TopBarEntry";
import KeybindManager from "./keybinds/KeybindManager";
import SidebarTabEntry, {SideBarTabEntryOptions} from "./sidebar/SidebarTabEntry";
import {SidebarTabPosition} from "./sidebar/SidebarTabPosition";

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
    createAction(action: (source: ActionSource) => void | Promise<void>, options?: Partial<ActionData>): EditorAction;
    createAction(action: (source: ActionSource) => void | Promise<void>, id: string|null, options?: Partial<ActionData>): EditorAction;
    createAction(actionOrController: ActionController | ((source: ActionSource) => void | Promise<void>), idOrOptions?: string|null|Partial<ActionData>|undefined, options?: Partial<ActionData> | undefined): EditorAction {
        // This method is very cursed, but having to support differently overloaded methods is pain
        let controller: ActionController;
        if (actionOrController instanceof ActionController) {
            controller = actionOrController;
        } else {
            let id: string | null;
            let optionsValue: Partial<ActionData> | undefined = undefined;
            if (idOrOptions === null || typeof idOrOptions === "string") {
                id = idOrOptions;
                if (options) optionsValue = options;
            } else {
                id = null;
                if (idOrOptions) optionsValue = idOrOptions;
            }
            controller = new ActionController(id, optionsValue, actionOrController);
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

    createSideBarTabEntry(id: string, name: string, options: Partial<SideBarTabEntryOptions>) {
        let entry = new SidebarTabEntry(id, name, options);
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