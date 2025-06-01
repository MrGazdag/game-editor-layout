import Controller from "../utils/Controller";
import EditorAction from "./EditorAction";
import Comparator from "../utils/Comparator";

export default class ActionGroupController extends Controller<ActionGroupData> {
    constructor(data: ActionGroupData) {
        super({
            actions: [],
            sort: defaultComparator
        }, data);
    }

    public add(...actions: EditorAction[]) {
        if (actions.length == 0) return;

        let changed = false;
        if (this.data.sort) {
            for (let action of actions) {
                // Find target index
                let index = Comparator.binarySearch(this.data.actions, action, this.data.sort);
                if (index > 0) continue; // Already in list
                index = -index-1;

                // Add element at index
                this.data.actions.splice(index, 0, action);
                changed = true;
            }
        } else {
            changed = true;
            this.data.actions.push(...actions);
        }

        if (changed) this.getChangeHandler().apply({...this.data});
    }

    public set(...actions: EditorAction[]) {
        let copy = [...actions];
        if (this.data.sort) copy.sort(this.data.sort);
        this.data.actions = copy;
        this.getChangeHandler().apply({...this.data});
    }

    public getActions() {
        return this.data.actions;
    }

    public remove(...actions: EditorAction[]) {
        let changed = false;
        for (let action of actions) {
            let index;
            if (this.data.sort) {
                // Use faster binary search with known sort
                index = Comparator.binarySearch(this.data.actions, action, this.data.sort);
            } else {
                // Insertion order, so just use the builtin
                index = this.data.actions.indexOf(action);
            }

            if (index > -1) {
                this.data.actions.splice(index, 1);
                changed = true;
            }
        }
        if (changed) this.getChangeHandler().apply({...this.data});
    }

    setSort(comparator: ((a: EditorAction, b: EditorAction) => number) | null = defaultComparator) {
        this.data.sort = comparator;
        if (comparator) this.data.actions.sort(comparator);
        this.getChangeHandler().apply({...this.data});
    }
}
const defaultComparator = (a: EditorAction, b: EditorAction)=>{
    let id1 = a.getId();
    let id2 = b.getId();
    if (id1 != null && id2 == null) return -1;
    if (id1 == null && id2 != null) return  1;
    if (id1 == null && id2 == null) {
        // Both actions inline, sort by name
        return Comparator.naturalCompare(a.getName(), b.getName());
    }
    // Both actions are registered, sort by id
    return Comparator.naturalCompare(id1!, id2!);
}

interface ActionGroupData {
    actions: EditorAction[],
    /**
     * Represents the sort order of this action group. By default, the entries
     * are sorted ID first (inline actions are put at the end), and then by name.
     *
     * `null` represents insertion-order sorting.
     */
    sort: Comparator<EditorAction> | null
}