import EditorLayoutManager from "../EditorLayoutManager";
import ActionSource from "./ActionSource";
import Controller from "../controller/Controller";

export default class ActionController extends Controller<ActionData> {
    private readonly id: string | null;
    private callback: (source: ActionSource) => void | Promise<void>;

    constructor(id: string | null, options: Partial<ActionData> | undefined, action: (source: ActionSource) => void | Promise<void>) {
        super(DefaultActionData, {
            // The name defaults to the ID
            ...{name: id !== null ? id : "Inline Action"},
            ...options
        });
        this.id = id;
        this.callback = action;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.data.name;
    }

    getDescription() {
        return this.data.description;
    }

    getIcon() {
        return this.data.icon;
    }

    runAction(source: ActionSource): Promise<void> {
        let p = this.callback(source);

        if (p === undefined) return Promise.resolve();
        return p;
    }
}
const DefaultActionData: ActionData = {
    name: "Action",
    description: "",
    icon: null
}
export interface ActionData {
    name: string,
    description: string,
    icon: string | null
}