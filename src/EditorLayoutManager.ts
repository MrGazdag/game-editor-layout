import ActionController, {ActionOptions} from "./action/ActionController";
import ActionSource from "./action/ActionSource";
import EditorAction from "./action/EditorAction";
import TopBarEntry from "./top/TopBarEntry";
import KeybindManager from "./keybinds/KeybindManager";
import SideBarTabEntry from "./sidebar/SideBarTabEntry";
import {SideBarTabPosition} from "./sidebar/SideBarTabPosition";

export default class EditorLayoutManager {
    private readonly actions: Map<string, EditorAction>;
    private readonly topBarEntries: TopBarEntry[];
    private readonly sideBarTabEntries: SideBarTabEntry[];
    private readonly keybindManager: KeybindManager;
    constructor() {
        this.actions = new Map();
        this.topBarEntries = [];
        this.sideBarTabEntries = [];
        this.keybindManager = new KeybindManager(this);
    }

    createAction(controller: ActionController): EditorAction;
    createAction(id: string, options: Partial<ActionOptions> | undefined, action: (source: ActionSource) => void | Promise<void>): EditorAction;
    createAction(idOrController: ActionController | string, options?: Partial<ActionOptions> | undefined, action?: (source: ActionSource) => void | Promise<void>): EditorAction {
        let controller: ActionController;
        if (idOrController instanceof ActionController) {
            controller = idOrController;
        } else {
            controller = new ActionController(this, idOrController, options, action!);
        }

        let editorAction = new EditorAction(controller);
        this.actions.set(editorAction.getId(), editorAction);
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

    createSideBarTabEntry(id: string, name: string, position: SideBarTabPosition) {
        let entry = new SideBarTabEntry(id, name, position);
        this.sideBarTabEntries.push(entry);
        return entry;
    }

    getSideBarTabEntry(id: string): SideBarTabEntry | undefined {
        return this.sideBarTabEntries.find(e => e.getId() == id);
    }

    getSideBarTabEntries(position: SideBarTabPosition) {
        return this.sideBarTabEntries.filter(e => e.getPosition() == position);
    }
}