import ActionController, {ActionOptions} from "./action/ActionController";
import ActionSource from "./action/ActionSource";
import EditorAction from "./action/EditorAction";
import TopBarEntry from "./top/TopBarEntry";

export default class EditorLayoutManager {
    private readonly actions: Map<string, EditorAction>;
    private readonly topBarEntries: TopBarEntry[];
    private readonly keybinds: Map<string, string[]>;
    constructor() {
        this.actions = new Map();
        this.topBarEntries = [];
        this.keybinds = new Map<string, string[]>();
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

    addKeybind(actionId: string, keybind: string) {
        let action = this.actions.get(actionId);
        if (!action) return;

        let binds = this.keybinds.get(actionId);
        if (!binds) {
            binds = [];
            this.keybinds.set(actionId, binds);
        }
        binds.push(keybind);
        action.refreshKeybinds();
    }

    addContextMenuAction(action: ActionController) {

    }


    getTopBarEntries() {
        return this.topBarEntries;
    }

    getKeybindsFor(actionId: string) {
        return this.keybinds.get(actionId);
    }
}