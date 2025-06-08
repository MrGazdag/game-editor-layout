import TabSlot from "./TabSlot";
import TabEntry from "./TabEntry";
import ChangeHandler from "../utils/ChangeHandler";
import TabType from "./TabType";

export default class TabSlotContainer<out T extends TabEntry<any> = TabEntry<any>> {
    private static slotIdCounter: number = 0;
    private readonly type: TabType;
    private readonly id: string;
    private readonly slots: TabSlot<T>[];
    private readonly changeHandler: ChangeHandler<TabSlotContainer>;

    private readonly alwaysOpen: boolean;
    private readonly multiSlot: boolean;

    private open: boolean;

    constructor(id: string, type: TabType, options?: TabSlotContainerOptions) {
        this.id = id;
        this.type = type;
        this.slots = [];
        this.alwaysOpen = options?.alwaysOpen ?? true;
        this.multiSlot = options?.multiSlot ?? true;
        this.open = this.alwaysOpen;
        this.changeHandler = new ChangeHandler();
    }

    getChangeHandler() {
        return this.changeHandler;
    }

    getId() {
        return this.id;
    }

    getType() {
        return this.type;
    }

    isAlwaysOpen() {
        return this.alwaysOpen;
    }

    isMultiSlot() {
        return this.multiSlot;
    }

    createSlot(...tabs: T[]) {
        if (tabs.length == 0) return;
        if (!this.multiSlot && this.slots.length > 0) {
            for (let tab of tabs) {
                this.slots[0].addTab(tab);
            }
            return this.slots[0];
        }

        let id = TabSlotContainer.slotIdCounter++;
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

    removeSlot(slot: TabSlot<T>) {
        let index = this.slots.indexOf(slot);
        if (index > -1) {
            this.slots.splice(index, 1);
            slot.closeAll();
            this.changeHandler.apply(this);
        }
    }
}
interface TabSlotContainerOptions {
    alwaysOpen?: boolean,
    multiSlot?: boolean
}