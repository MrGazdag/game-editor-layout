import EditorLayoutManager from "../EditorLayoutManager";

export default class EditorWindow {
    private readonly parent: EditorLayoutManager;
    constructor(parent: EditorLayoutManager) {
        this.parent = parent;
    }

    getParent() {
        return this.parent;
    }
}