import TabSlot from "./TabSlot";
import TabEntry from "./TabEntry";
import ChangeHandler from "../utils/ChangeHandler";

export default class TabSlotContainer {
    private static idCounter: number = 0;
    private readonly id: string;
    private readonly slots: TabSlot[];
    private readonly alwaysOpen: boolean;
    private open: boolean;
    private changeHandler: ChangeHandler<TabSlotContainer>;

    constructor(id: string, alwaysOpen: boolean) {
        this.id = id;
        this.slots = [];
        this.alwaysOpen = alwaysOpen;
        this.open = alwaysOpen;
        this.changeHandler = new ChangeHandler();
    }

    getChangeHandler() {
        return this.changeHandler;
    }

    getId() {
        return this.id;
    }

    isAlwaysOpen() {
        return this.alwaysOpen;
    }

    createSlot(...tabs: TabEntry[]) {
        if (tabs.length == 0) return;

        let id = TabSlotContainer.idCounter++;
        let slot = new TabSlot(this, id, tabs);
        this.slots.push(slot);

        this.changeHandler.apply(this);
        return slot;
    }

    getSlots() {
        return [...this.slots];
    }

    isOpen() {

    }

    removeSlot(slot: TabSlot) {
        let index = this.slots.indexOf(slot);
        if (index > -1) {
            this.slots.splice(index, 1);
            slot.closeAll();
            this.changeHandler.apply(this);
        }
    }
}