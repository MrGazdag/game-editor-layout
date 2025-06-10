import TabSlot from "./TabSlot";
import TabEntry from "./TabEntry";
import ChangeHandler from "../utils/ChangeHandler";
import TabType from "./TabType";
import {SidebarTabPosition} from "./sidebar/SidebarTabPosition";
import TabSlotGroup, {TabSlotGroupEntry} from "./TabSlotGroup";

export default class TabSlotContainer<out T extends TabEntry<any> = TabEntry<any>> {
    private readonly tabType: TabType;
    private readonly id: string;
    private readonly changeHandler: ChangeHandler<TabSlotContainer>;

    private readonly uncollapsableSlots: boolean;
    private readonly multiSlot: boolean;
    private readonly position: SidebarTabPosition | null;

    private rootEntry: TabSlotGroupEntry<T>;
    private open: boolean;

    constructor(id: string, tabType: TabType, options?: TabSlotContainerOptions) {
        this.id = id;
        this.tabType = tabType;
        this.rootEntry = new TabSlot(this, []);
        this.changeHandler = new ChangeHandler();

        this.uncollapsableSlots = options?.uncollapsableSlots ?? true;
        this.multiSlot = options?.multiSlot ?? true;
        this.position = options?.position ?? null;

        this.open = true; // TODO
    }

    getChangeHandler() {
        return this.changeHandler;
    }

    getId() {
        return this.id;
    }

    getTabType() {
        return this.tabType;
    }

    hasUncollapsableSlots() {
        return this.uncollapsableSlots;
    }

    isMultiSlot() {
        return this.multiSlot;
    }

    isOpen() {
        return this.open;
    }

    getRootEntry(): TabSlotGroupEntry<T> {
        return this.rootEntry;
    }

    setRootEntry(entry: TabSlotGroupEntry<T>) {
        this.rootEntry = entry;
        this.changeHandler.apply(this);
    }

    addTabs(...tabs: T[]) {
        if (tabs.length == 0) return;
        let entry: TabSlotGroupEntry<T> = this.rootEntry;
        // Find first slot
        while (entry instanceof TabSlotGroup) {
            entry = entry.getFirst();
        }
        for (let tab of tabs) {
            entry.addTab(tab);
        }
    }
}
export interface TabSlotContainerOptions {
    uncollapsableSlots?: boolean,
    multiSlot?: boolean,
    position?: SidebarTabPosition,
}