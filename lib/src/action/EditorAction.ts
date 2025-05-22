import ActionController from "./ActionController";
import ActionSource from "./ActionSource";
import Keybind from "../keybinds/Keybind";
import EditorLayoutManager from "../EditorLayoutManager";

export default class EditorAction {
    #manager: EditorLayoutManager;
    #action: ActionController;
    #keybinds: Keybind[];

    constructor(manager: EditorLayoutManager, action: ActionController) {
        this.#manager = manager;
        this.#action = action;
        this.#keybinds = [];
    }
    public refreshKeybinds() {
        let id = this.getId();
        if (id !== undefined) {
            this.#keybinds = this.#manager.getKeybindManager().getKeybindsFor(id) ?? [];
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

    public runAction(source?: ActionSource): Promise<void> {
        return this.#action.runAction(source ?? ActionSource.CUSTOM);
    }

    public getKeybinds() {
        return this.#keybinds;
    }
    public getManager() {
        return this.#manager;
    }
}