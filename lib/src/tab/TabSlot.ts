import TabEntry from "./TabEntry";
import TabSlotContainer from "./TabSlotContainer";
import ChangeHandler from "../utils/ChangeHandler";

export default class TabSlot<out T extends TabEntry=TabEntry> {
    private readonly parent: TabSlotContainer<T>;
    private readonly id: number;
    private readonly tabs: T[];
    private selectedTab: T;
    private open: boolean;
    private readonly changeHandler: ChangeHandler<TabSlot>;

    constructor(parent: TabSlotContainer<T>, id: number, tabs: T[]) {
        this.parent = parent;
        this.id = id;
        this.tabs = [...tabs];
        for (let tab of tabs) {
            tab.setSlot(this);
        }
        this.selectedTab = tabs[0];
        this.open = parent.isAlwaysOpen();
        this.changeHandler = new ChangeHandler();
    }

    getChangeHandler() {
        return this.changeHandler;
    }

    getParent() {
        return this.parent;
    }

    getId() {
        return this.id;
    }

    isOpen() {
        return this.parent.isAlwaysOpen() || this.open;
    }

    setOpen(open: boolean) {
        if (this.parent.isAlwaysOpen()) return;
        this.open = open;
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
                this.parent.removeSlot(this);
            } else if (this.selectedTab == tab) {
                this.selectedTab = this.tabs[index - 1];
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
    }
}