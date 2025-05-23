import ActionController, {ActionHandle, ActionInitData, InlineActionInitData} from "./ActionController";
import ActionSource from "./ActionSource";
import Keybind from "../keybinds/Keybind";
import EditorLayoutManager from "../EditorLayoutManager";
import ActionManager from "./ActionManager";

export default class EditorAction {
    readonly #manager: ActionManager;
    readonly #action: ActionController;
    #keybinds: Keybind[];

    constructor(manager: ActionManager, action: ActionController) {
        this.#manager = manager;
        this.#action = action;
        this.#keybinds = [];
    }
    public refreshKeybinds() {
        let id = this.getId();
        if (id !== undefined && this.#manager != null) {
            this.#keybinds = this.#manager.getParent().getKeybindManager().getKeybindsFor(id) ?? [];
        }
    }
    public getId() {
        return this.#action.getId();
    }

    public getName() {
        return this.#action.getName();
    }

    public getDescription() {
        return this.#action.getDescription();
    }

    public getIcon() {
        return this.#action.getIcon();
    }

    public runAction(source?: ActionSource): void {
        this.#action.runAction(source ?? ActionSource.CUSTOM).then(); //suppress warning
    }
    public runActionAsync(source?: ActionSource): Promise<void> {
        return this.#action.runAction(source ?? ActionSource.CUSTOM);
    }

    public getKeybinds() {
        return this.#keybinds;
    }
    public getManager() {
        return this.#manager;
    }

    public static inline(action: ActionHandle): EditorAction;
    public static inline(name: string, action: ActionHandle): EditorAction;
    public static inline(options: InlineActionInitData): EditorAction
    public static inline(param0: ActionHandle|InlineActionInitData|string, param1?: ActionHandle): EditorAction {
        let controller: ActionController;
        if (typeof param1 === "function") {
            controller = new ActionController({
                name: param0 as string,
                action: param1,
            });
        } else if (typeof param0 === "function") {
            controller = new ActionController({
                action: param0
            });
        } else {
            controller = new ActionController(param0 as InlineActionInitData);
        }

        // Null manager does not matter here, as there is
        // no use of the manager on inline actions
        return new EditorAction(null as any, controller);
    }
}