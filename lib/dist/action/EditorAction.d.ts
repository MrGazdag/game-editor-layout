import ActionController from "./ActionController";
import ActionSource from "./ActionSource";
import Keybind from "../keybinds/Keybind";
import EditorLayoutManager from "../EditorLayoutManager";
export default class EditorAction {
    #private;
    constructor(manager: EditorLayoutManager, action: ActionController);
    refreshKeybinds(): void;
    getId(): string | null;
    getName(): string;
    getDescription(): string;
    getIcon(): string | null;
    runAction(source?: ActionSource): Promise<void>;
    getKeybinds(): Keybind[];
    getManager(): EditorLayoutManager;
}
