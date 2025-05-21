import ActionController from "./ActionController";
import ActionSource from "./ActionSource";

export default class EditorAction {
    #action: ActionController;
    #keybinds: string[];

    constructor(action: ActionController) {
        this.#action = action;
        this.#keybinds = [];
    }
    public refreshKeybinds() {
        this.#keybinds = this.#action.getManager().getKeybindsFor(this.getId())!;
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