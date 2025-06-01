import Controller from "../utils/Controller";
import EditorAction from "./EditorAction";

export default class ActionGroupController extends Controller<ActionGroupData> {
    constructor(...actions: EditorAction[]) {
        super({
            actions: actions
        }, {});
    }

    public add(...actions: EditorAction[]) {
        this.data.actions.push(...actions);
        this.getChangeHandler().apply({...this.data});
    }

    public set(...actions: EditorAction[]) {
        this.data.actions = actions;
        this.getChangeHandler().apply({...this.data});
    }

    public getActions() {
        return this.data.actions;
    }

    public remove(...actions: EditorAction[]) {
        for (let action of actions) {
            let index = this.data.actions.indexOf(action);
            if (index > -1) {
                this.data.actions.splice(index, 1);
            }
        }
        this.getChangeHandler().apply({...this.data});
    }

    sort(comparator: (a: EditorAction, b: EditorAction) => number = defaultComparator) {
        this.data.actions.sort(comparator);
        this.getChangeHandler().apply({...this.data});
    }
}
const defaultComparator = (a: EditorAction, b: EditorAction)=>{
    let id1 = a.getId();
    let id2 = b.getId();
    if (id1 != null && id2 == null) return -1;
    if (id1 == null && id2 != null) return  1;
    if (id1 == null && id2 == null) {
        // Both actions inline, sort by name
        return a.getName().localeCompare(b.getName());
    }
    // Both actions are registered, sort by id
    return id1!.localeCompare(id2!);
}

interface ActionGroupData {
    actions: EditorAction[]
}