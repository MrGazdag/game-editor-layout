import TabEntry from "./TabEntry";
import TabSlotContainer from "./TabSlotContainer";
import ChangeHandler from "../utils/ChangeHandler";
import TabSlotGroup from "./TabSlotGroup";

export default class TabSlot<out T extends TabEntry=TabEntry> {
    private readonly container: TabSlotContainer<T>;
    private readonly tabs: T[];

    private group: TabSlotGroup<T> | null;
    private selectedTab: T | null;
    private open: boolean;
    private readonly changeHandler: ChangeHandler<TabSlot>;

    constructor(parent: TabSlotContainer<T>, tabs: T[]) {
        this.container = parent;
        this.group = null;
        this.tabs = [...tabs];
        for (let tab of tabs) {
            tab.setSlot(this);
        }
        this.selectedTab = tabs.length == 0 ? null : tabs[0];
        this.open = parent.hasUncollapsableSlots();
        this.changeHandler = new ChangeHandler();
    }

    getChangeHandler() {
        return this.changeHandler;
    }

    getContainer() {
        return this.container;
    }

    getGroup() {
        return this.group;
    }

    setGroup(group: TabSlotGroup<T> | null) {
        this.group = group;
    }

    isOpen() {
        return this.container.hasUncollapsableSlots() || this.open;
    }

    setOpen(open: boolean) {
        if (this.container.hasUncollapsableSlots()) return;
        this.open = open;
        this.group?.updateOpen();
        this.changeHandler.apply(this);
    }

    getSelectedTab() {
        return this.selectedTab;
    }

    setSelectedTab(tab: T) {
        if (tab.getSlot() != this) return;
        this.selectedTab = tab;
        this.open = true;
        this.changeHandler.apply(this);
    }

    getTabs() {
        return [...this.tabs];
    }

    addTab(tab: T) {
        if (this.hasTab(tab)) return;

        this.tabs.push(tab);
        tab.setSlot(this);
        this.changeHandler.apply(this);
    }

    hasTab(tab: T) {
        return this.tabs.includes(tab);
    }

    removeTab(tab: T) {
        let index = this.tabs.indexOf(tab);
        if (index > -1) {
            this.tabs.splice(index, 1);
            if (tab.getSlot() == this) tab.setSlot(null);

            if (this.tabs.length == 0) {
                // Auto close when no more tabs are left
                if (this.group) TabSlotGroup.removeEmptyGroups(this.group);
            } else if (this.selectedTab == tab) {
                if (this.tabs.length == 0) {
                    this.selectedTab = null;
                } else {
                    this.selectedTab = this.tabs[index - 1];
                }
            }
            this.changeHandler.apply(this);
        }
    }

    closeAll() {
        let tabs = [...this.tabs];
        this.tabs.length = 0;
        for (let tab of tabs) {
            tab.setSlot(null);
        }
        if (this.group) TabSlotGroup.removeEmptyGroups(this.group);
    }
}