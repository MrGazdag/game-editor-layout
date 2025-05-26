import EditorAction, {ActionEntry, ActionEntryInput} from "../action/EditorAction";
import ActionSource from "../action/ActionSource";
import ChangeHandler from "../utils/ChangeHandler";
import ActionGroup from "../action/ActionGroup";

export default class ContextMenu {
    private readonly parent: ContextMenu | null;
    private readonly name: string;
    private readonly positionCandidates: ContextMenuPosition[];
    private readonly entries: ActionEntry[];
    private readonly source: ActionSource;
    private open: boolean;
    private subMenu: ContextMenu | null;
    private changeHandler: ChangeHandler<ContextMenu>;

    constructor(parent: ContextMenu | null, name: string, positions: ContextMenuPosition[], entries: ActionEntryInput[], source: ActionSource) {
        this.parent = parent;
        this.name = name;
        this.positionCandidates = positions;
        this.entries = EditorAction.flattenGroups(entries);
        this.source = source;
        this.open = false;
        this.subMenu = null;
        this.changeHandler = new ChangeHandler<ContextMenu>();
    }

    getParent() {
        return this.parent;
    }

    getChangeHandler() {
        return this.changeHandler;
    }

    getName() {
        return this.name;
    }

    getPositionCandidates() {
        return this.positionCandidates;
    }

    getEntries() {
        return this.entries;
    }

    getSource() {
        return this.source;
    }

    isOpen() {
        return this.open;
    }

    setOpen(open: boolean) {
        this.open = open;
        this.subMenu?.setOpen(open);
        this.changeHandler.apply(this);
    }

    setSubMenu(subMenu: ContextMenu | null) {
        if (this.subMenu == subMenu) return;

        this.subMenu?.setOpen(false);
        this.subMenu = subMenu;
        subMenu?.setOpen(this.open);
        this.changeHandler.apply(this);
    }

    appendChild(childMenu: ContextMenu) {
        this.entries.splice(0, 0, ...childMenu.entries);
        this.changeHandler.apply(this);
    }

    getSubMenu() {
        return this.subMenu;
    }
}
export interface ContextMenuPosition {
    horizontal: number,
    vertical: number,
    align: "left" | "right"
}