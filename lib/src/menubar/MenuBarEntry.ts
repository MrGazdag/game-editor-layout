import EditorAction from "../action/EditorAction";

export default class MenuBarEntry {
    private readonly id: string;
    private readonly name: string;
    private readonly actions: EditorAction[];

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.actions = [];
    }

    addAction(action: EditorAction) {
        this.actions.push(action);
    }
    removeAction(action: EditorAction) {
        let index = this.actions.indexOf(action);
        if (index > -1) {
            this.actions.splice(index, 1);
        }
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getActions() {
        return this.actions;
    }
}