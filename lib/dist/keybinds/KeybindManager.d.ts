import EditorLayoutManager from "../EditorLayoutManager";
import Keybind from "./Keybind";
export default class KeybindManager {
    private readonly parent;
    private readonly actionToBind;
    private readonly keyToBind;
    constructor(parent: EditorLayoutManager);
    addBind(bind: Keybind): void;
    getKeybindsFor(actionId: string): Keybind[] | undefined;
    removeBind(bind: Keybind): void;
    pressKey(key: string, ctrl?: boolean, shift?: boolean, alt?: boolean, meta?: boolean): boolean;
}
