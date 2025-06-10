import EditorLayoutManager from "../EditorLayoutManager";
import EditorWindow from "./EditorWindow";

export default class WindowManager {
    private readonly parent: EditorLayoutManager;
    private readonly windows: Map<number, EditorWindow>;

    private readonly currentWindow: EditorWindow;
    constructor(parent: EditorLayoutManager) {
        this.parent = parent;
        this.windows = new Map();

        // TODO in case of multi window setups, this should probably be sourced from somewhere else
        this.currentWindow = new EditorWindow(this.parent, 0);
        this.windows.set(0, this.currentWindow);
    }

    public getDefaultWindow() {
        return this.windows.get(0)!;
    }

    public getWindow(id: number): EditorWindow | undefined {
        return this.windows.get(id);
    }

    public getWindows(): Iterable<EditorWindow> {
        return this.windows.values();
    }

    public getCurrentWindow() {
        return this.currentWindow;
    }
}