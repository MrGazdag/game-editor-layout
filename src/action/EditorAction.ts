import ActionController from "./ActionController";
import ActionSource from "./ActionSource";
import Keybind from "../keybinds/Keybind";

export default class EditorAction {
    #action: ActionController;
    #keybinds: Keybind[];

    constructor(action: ActionController) {
        this.#action = action;
        this.#keybinds = [];
    }
    public refreshKeybinds() {
        this.#keybinds = this.#action.getManager().getKeybindManager().getKeybindsFor(this.getId()) ?? [];
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

    getIcon() {
        return this.#action.getIcon();
    }

    public runAction(source?: ActionSource): Promise<void> {
        return this.#action.runAction(source ?? ActionSource.CUSTOM);
    }

    public getKeybinds() {
        return this.#keybinds;
    }
}