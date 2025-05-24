import TabSlot from "./TabSlot";
import TabEntry from "./TabEntry";

export default class TabSlotContainer {
    private static idCounter: number = 0;
    private readonly id: string;
    private readonly slots: TabSlot[];
    private readonly alwaysOpen: boolean;
    private changeHandler: (slots: TabSlot[])=>void;

    constructor(id: string, alwaysOpen: boolean) {
        this.id = id;
        this.slots = [];
        this.alwaysOpen = alwaysOpen;
        this.changeHandler = ()=>{};
    }

    getId() {
        return this.id;
    }

    isAlwaysOpen() {
        return this.alwaysOpen;
    }

    setChangeHandler(changeHandler: (slots: TabSlot[]) => void) {
        this.changeHandler = changeHandler;
    }

    createSlot(...tabs: TabEntry[]) {
        if (tabs.length == 0) return;

        let id = TabSlotContainer.idCounter++;
        let slot = new TabSlot(this, id, tabs);
        this.slots.push(slot);

        this.changeHandler([...this.slots]);
        return slot;
    }

    getSlots() {
        return [...this.slots];
    }

    removeSlot(slot: TabSlot) {
        let index = this.slots.indexOf(slot);
        if (index > -1) {
            this.slots.splice(index, 1);
            slot.closeAll();
            this.changeHandler([...this.slots]);
        }
    }
}