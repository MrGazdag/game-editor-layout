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
}

interface ActionGroupData {
    actions: EditorAction[]
}