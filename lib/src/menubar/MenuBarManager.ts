import MenuBarEntry from "./MenuBarEntry";
import EditorLayoutManager from "../EditorLayoutManager";

export default class MenuBarManager {
    private readonly parent: EditorLayoutManager;
    private readonly menuBarEntries: MenuBarEntry[];

    constructor(parent: EditorLayoutManager) {
        this.parent = parent;
        this.menuBarEntries = [];
    }

    getParent() {
        return this.parent;
    }

    createMenuBarEntry(id: string, name: string) {
        let entry = new MenuBarEntry(id, name);
        this.menuBarEntries.push(entry);
        return entry;
    }
    getMenuBarEntry(id: string): MenuBarEntry | undefined {
        return this.menuBarEntries.find(e => e.getId() == id);
    }
    getMenuBarEntries() {
        return this.menuBarEntries;
    }
}