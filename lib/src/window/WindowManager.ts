import EditorLayoutManager from "../EditorLayoutManager";
import EditorWindow from "./EditorWindow";

export default class WindowManager {
    private readonly parent: EditorLayoutManager;
    private readonly windows: EditorWindow[];
    constructor(parent: EditorLayoutManager) {
        this.parent = parent;
        this.windows = [];
    }
}