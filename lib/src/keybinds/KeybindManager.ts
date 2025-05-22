import EditorLayoutManager from "../EditorLayoutManager";
import Keybind from "./Keybind";
import ActionSource from "../action/ActionSource";

export default class KeybindManager {
    private readonly parent: EditorLayoutManager;
    private readonly actionToBind: Map<string,Keybind[]>;
    private readonly keyToBind: Map<string,Keybind[]>;

    constructor(parent: EditorLayoutManager) {
        this.parent = parent;
        this.actionToBind = new Map();
        this.keyToBind = new Map();
        addEventListener("keydown", e=>{
            let result = this.pressKey(e.code, e.ctrlKey, e.shiftKey, e.altKey, e.metaKey);
            if (result) {
                e.preventDefault();
            }
        });
    }

    public addBind(bind: Keybind) {
        let action = this.actionToBind.get(bind.getAction());
        if (!action) {
            action = [];
            this.actionToBind.set(bind.getAction(), action);
        }
        action.push(bind);

        let key = this.keyToBind.get(bind.getCode());
        if (!key) {
            key = [];
            this.keyToBind.set(bind.getCode(), key);
        }
        key.push(bind);

        let editorAction = this.parent.getAction(bind.getAction());
        if (editorAction) {
            editorAction.refreshKeybinds();
        }
    }

    getKeybindsFor(actionId: string): Keybind[] | undefined {
        return this.actionToBind.get(actionId);
    }

    public removeBind(bind: Keybind) {
        let action = this.actionToBind.get(bind.getAction());
        if (action) {
            let index = action.indexOf(bind);
            if (index > -1) {
                action.splice(index, 1);
            }
            if (action.length == 0) this.actionToBind.delete(bind.getAction());
        }

        let key = this.keyToBind.get(bind.getCode());
        if (key) {
            let index = key.indexOf(bind);
            if (index > -1) {
                key.splice(index, 1);
            }
            if (key.length == 0) this.keyToBind.delete(bind.getCode());
        }
    }

    public pressKey(key: string, ctrl?: boolean, shift?: boolean, alt?: boolean, meta?: boolean): boolean {
        let success = false;
        let binds = this.keyToBind.get(key);
        if (binds) {
            for (let bind of binds) {
                if (ctrl == bind.isCtrl()
                    && shift == bind.isShift()
                    && alt == bind.isAlt()
                    && meta == bind.isMeta()
                    && key == bind.getCode()) {
                    let action = this.parent.getAction(bind.getAction());
                    if (action) {
                        action.runAction(ActionSource.KEYBIND);
                        success = true;
                    }
                }
            }
        }
        return success;
    }
}
