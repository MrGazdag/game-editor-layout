import TabEntry from "./TabEntry";
import TabSlotContainer from "./TabSlotContainer";

export default class TabSlot {
    private readonly parent: TabSlotContainer;
    private readonly id: number;
    private readonly tabs: TabEntry[];
    private selectedTab: TabEntry;
    private open: boolean;
    private changeHandler: (slot: TabSlot) => void;

    constructor(parent: TabSlotContainer, id: number, tabs: TabEntry[]) {
        this.parent = parent;
        this.id = id;
        this.tabs = [...tabs];
        for (let tab of tabs) {
            tab.setSlot(this);
        }
        this.selectedTab = tabs[0];
        this.open = parent.isAlwaysOpen();
        this.changeHandler = ()=>{};
    }

    setChangeHandler(changeHandler: (slot: TabSlot) => void) {
        this.changeHandler = changeHandler;
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
        this.changeHandler(this);
    }

    getSelectedTab() {
        return this.selectedTab;
    }

    setSelectedTab(tab: TabEntry) {
        if (tab.getSlot() != this) return;
        this.selectedTab = tab;
        this.open = true;
        this.changeHandler(this);
    }

    getTabs() {
        return [...this.tabs];
    }

    addTab(tab: TabEntry) {
        if (this.hasTab(tab)) return;

        this.tabs.push(tab);
        tab.setSlot(this);
        this.changeHandler(this);
    }

    hasTab(tab: TabEntry) {
        return this.tabs.includes(tab);
    }

    removeTab(tab: TabEntry) {
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
            this.changeHandler(this);
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