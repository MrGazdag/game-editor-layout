import EditorAction, {ActionEntry, ActionEntryInput} from "../action/EditorAction";

export default class MenuBarEntry {
    private readonly id: string;
    private readonly name: string;
    private readonly entries: ActionEntry[];

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.entries = [];
    }

    addEntry(...entries: ActionEntryInput[]) {
        this.entries.push(...EditorAction.flattenGroups(entries));
    }
    removeEntry(...entries: ActionEntry[]) {
        for (let entry of entries) {
            let index = this.entries.indexOf(entry);
            if (index > -1) {
                this.entries.splice(index, 1);
            }
        }
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getEntries() {
        return this.entries;
    }
}