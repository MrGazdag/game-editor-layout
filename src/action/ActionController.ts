import EditorLayoutManager from "../EditorLayoutManager";
import ActionSource from "./ActionSource";

export default class ActionController {
    private readonly manager: EditorLayoutManager;
    private readonly id: string;
    private name: string;
    private description: string;
    private icon: string | null;
    private callback: (source: ActionSource) => void | Promise<void>;

    constructor(manager: EditorLayoutManager, id: string, options: Partial<ActionOptions> | undefined, action: (source: ActionSource) => void | Promise<void>) {
        this.manager = manager;
        this.id = id;
        this.name = options?.name ?? id;
        this.description = options?.description ?? "";
        this.icon = options?.icon ?? null;
        this.callback = action;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getIcon() {
        return this.icon;
    }

    runAction(source: ActionSource): Promise<void> {
        let p = this.callback(source);

        if (p === undefined) return Promise.resolve();
        return p;
    }

    getManager() {
        return this.manager;
    }
}
export interface ActionOptions {
    name: string,
    description: string,
    icon: string | null
}