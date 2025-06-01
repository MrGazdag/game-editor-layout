import ActionController, {ActionHandle, InlineActionInitData} from "./ActionController";
import ActionSource from "./ActionSource";
import Keybind from "../keybinds/Keybind";
import ActionManager from "./ActionManager";
import ChangeHandler from "../utils/ChangeHandler";
import ActionGroup from "./ActionGroup";
import ActionGroupController from "./ActionGroupController";

export default class EditorAction {
    readonly #manager: ActionManager;
    readonly #action: ActionController;
    #keybinds: Keybind[];

    private readonly changeHandler: ChangeHandler<EditorAction>;

    constructor(manager: ActionManager, action: ActionController) {
        this.#manager = manager;
        this.#action = action;
        this.#keybinds = [];
        this.changeHandler = new ChangeHandler();
        action.getChangeHandler().add(()=>{
            this.changeHandler.apply(this);
        });
    }

    getChangeHandler() {
        return this.changeHandler;
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

    public isEnabled() {
        return this.#action.isEnabled();
    }

    public hasAction() {
        return this.#action.hasAction();
    }

    public getSubMenu() {
        return this.#action.getSubMenu();
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
    public static inline(name: string, action?: ActionHandle): EditorAction;
    public static inline(options: InlineActionInitData): EditorAction;
    public static inline(controller: ActionController): EditorAction;
    public static inline(param0: ActionHandle|InlineActionInitData|string|ActionController, param1?: ActionHandle): EditorAction {
        let controller: ActionController;
        if (typeof param0 === "string") {
            controller = new ActionController({
                name: param0,
                action: param1,
            });
        } else if (typeof param0 === "function") {
            controller = new ActionController({
                action: param0
            });
        } else if (param0 instanceof ActionController) {
            controller = param0;
        } else {
            controller = new ActionController(param0 as InlineActionInitData);
        }

        // Null manager does not matter here, as there is
        // no use of the manager on inline actions
        return new EditorAction(null as any, controller);
    }

    public static flattenGroups(entries: ActionEntryInput[]): ActionEntry[] {
        return entries.map(entry=>{
            if (entry instanceof EditorAction || entry instanceof ActionGroup) {
                return entry;
            } else {
                return new ActionGroup(new ActionGroupController(...entry));
            }
        });
    }
}
export type ActionEntry = EditorAction | ActionGroup;
export type ActionEntryInput = EditorAction | ActionGroup | EditorAction[];