import EditorLayoutManager from "../EditorLayoutManager";
import ActionSource from "./ActionSource";
import Controller from "../controller/Controller";

export default class ActionController extends Controller<ActionData> {
    private readonly id: string | undefined;
    private callback: ActionHandle;

    constructor(options: ActionInitData) {
        super(DefaultActionData, {
            // The name defaults to the ID
            ...{name: options.id ?? "Inline Action"},
            ...options
        });
        this.id = options.id;
        this.callback = options.action;
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
export interface ActionInitData extends Partial<ActionData> {
    id?: string,
    action: ActionHandle
}
export type ActionHandle = (source: ActionSource)=>void|Promise<void>;