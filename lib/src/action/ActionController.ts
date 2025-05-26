import ActionSource from "./ActionSource";
import Controller from "../utils/Controller";
import EditorAction from "./EditorAction";

export default class ActionController extends Controller<ActionData> {
    private readonly id: string | undefined;
    private readonly callback: ActionHandle | undefined;

    constructor(options: ActionInitData | InlineActionInitData) {
        super(DefaultActionData, {
            // The name defaults to the ID
            ...{name: "id" in options ? options.id : "Inline Action"},
            ...options
        });
        this.id = "id" in options ? options.id : undefined;
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

    getSubMenu() {
        return this.data.subMenu;
    }

    isEnabled() {
        return this.data.enabled;
    }

    hasAction() {
        return this.callback != null;
    }

    runAction(source: ActionSource): Promise<void> {
        if (this.callback == null) return Promise.resolve();

        let p = this.callback(source);

        if (p === undefined) return Promise.resolve();
        return p;
    }
}
const DefaultActionData: ActionData = {
    name: "Action",
    description: "",
    icon: null,
    enabled: true,
    subMenu: null
}
export interface ActionData {
    name: string,
    description: string,
    icon: string | null,
    enabled: boolean,
    subMenu: EditorAction[] | null
}
export interface ActionInitData extends InlineActionInitData {
    id: string,
}
export interface InlineActionInitData extends Partial<ActionData> {
    action?: ActionHandle
}
export type ActionHandle = (source: ActionSource)=>void|Promise<void>;