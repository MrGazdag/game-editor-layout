import EditorAction from "./EditorAction";
import ActionController, {ActionHandle, ActionInitData} from "./ActionController";
import EditorLayoutManager from "../EditorLayoutManager";

export default class ActionManager {
    private readonly parent: EditorLayoutManager;
    private readonly actions: Map<string, EditorAction>;
    constructor(parent: EditorLayoutManager) {
        this.parent = parent;
        this.actions = new Map();
    }

    public getParent() {
        return this.parent;
    }

    createAction(controller: ActionController): EditorAction;
    createAction(options: ActionInitData): EditorAction;
    createAction(param: ActionController | ActionInitData): EditorAction {
        // This method is very cursed, but having to support differently overloaded methods is pain
        let controller: ActionController;
        if (param instanceof ActionController) {
            controller = param;
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
}
interface ToggleActionInitData {

}