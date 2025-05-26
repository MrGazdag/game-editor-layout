import ActionGroupController from "./ActionGroupController";
import ChangeHandler from "../utils/ChangeHandler";
import EditorAction from "./EditorAction";

export default class ActionGroup {
    #group: ActionGroupController;
    private readonly changeHandler: ChangeHandler<ActionGroup>;
    constructor(group: ActionGroupController) {
        this.#group = group;
        this.changeHandler = new ChangeHandler();
        this.#group.getChangeHandler().add(()=>{
            this.changeHandler.apply(this);
        });
    }

    getChangeHandler() {
        return this.changeHandler;
    }

    getActions() {
        return this.#group.getActions();
    }
}