import TabEntry from "./TabEntry";
import TabSlotContainer from "./TabSlotContainer";
import ChangeHandler from "../utils/ChangeHandler";
import TabSlot from "./TabSlot";

export default class TabSlotGroup<out T extends TabEntry=TabEntry> {
    private static idCounter: number = 0;

    private readonly container: TabSlotContainer<T>;
    private readonly id: number;
    private group: TabSlotGroup<T> | null;
    private vertical: boolean;
    private splitPos: number;
    private first: TabSlotGroupEntry<T>;
    private second: TabSlotGroupEntry<T>;
    private readonly changeHandler: ChangeHandler<TabSlotGroup>;

    constructor(container: TabSlotContainer<T>, id: number, vertical: boolean, first: TabSlotGroupEntry<T>, second: TabSlotGroupEntry<T>) {
        this.container = container;
        this.id = id;
        this.group = null;

        this.vertical = vertical;
        this.splitPos = 0.5;
        this.first = first;
        this.second = second;

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
        if (group && group.getFirst() !== this && group.getSecond() !== this) return;
        this.group = group;
    }

    getId() {
        return this.id;
    }

    getFirst() {
        return this.first;
    }

    getSecond() {
        return this.second;
    }

    private update(first: TabSlotGroupEntry<T> | null, second: TabSlotGroupEntry<T> | null) {
        if (first) this.first = first;
        if (second) this.second = second;

        this.changeHandler.apply(this);
    }

    getSplitPos() {
        return this.splitPos;
    }

    setSplitPos(splitPos: number) {
        this.splitPos = splitPos;
        this.changeHandler.apply(this);
    }

    isVertical() {
        return this.vertical;
    }

    setVertical(vertical: boolean) {
        this.vertical = vertical;
        this.changeHandler.apply(this);
    }

    isOpen(): boolean {
        return this.first.isOpen() || this.second.isOpen();
    }

    static splitSlot<T extends TabEntry>(slot: TabSlot<T>, vertical: boolean, insertBefore: boolean, entry: T) {
        let newSlot = new TabSlot(slot.getContainer(), [entry]);
        let first: TabSlotGroupEntry<T>;
        let second: TabSlotGroupEntry<T>;
        if (insertBefore) {
            first = newSlot;
            second = slot;
        } else {
            first = slot;
            second = newSlot;
        }

        let parent = slot.getGroup();
        let parentFirst = parent !== null && parent.getFirst() === slot;
        let group = new TabSlotGroup(slot.getContainer(), this.idCounter++, vertical, first, second);
        first.setGroup(group);
        second.setGroup(group);
        if (parent) {
            if (parentFirst) parent.update(group, null);
            else parent.update(null, group);

            group.setGroup(parent);
        } else {
            group.setGroup(null);
            slot.getContainer().setRootEntry(group);
        }
        return group;
    }
    static removeEmptyGroups<T extends TabEntry>(group: TabSlotGroup<T>): TabSlotGroupEntry<T> {
        let parent = group.getGroup();
        let parentFirst = parent !== null && parent.getFirst() === group;

        let first = group.getFirst();
        let second = group.getSecond();

        let result: TabSlotGroupEntry<T> = group;
        if (first instanceof TabSlot && first.getTabs().length === 0) {
            result = second;
        } else if (second instanceof TabSlot && second.getTabs().length === 0) {
            result = first;
        } else {
            // No changes necessary
            return group;
        }

        if (parent) {
            if (parentFirst) parent.update(result, null);
            else parent.update(null, result);

            result.setGroup(parent);
        } else {
            result.setGroup(null);
            group.getContainer().setRootEntry(result);
        }
        return result;
    }
    static canUnsplit<T extends TabEntry>(group: TabSlotGroup<T>): boolean {
        return group.getFirst()  instanceof TabSlot
            && group.getSecond() instanceof TabSlot;
    }
    static unsplit<T extends TabEntry>(group: TabSlotGroup<T>): void {
        if (!this.canUnsplit(group)) return;

        let parent = group.getGroup();
        let parentFirst = parent !== null && parent.getFirst() === group;

        let first = group.getFirst() as TabSlot<T>;
        let second = group.getSecond() as TabSlot<T>;
        for (let tab of [...second.getTabs()]) {
            first.addTab(tab);
        }

        if (parent) {
            if (parentFirst) parent.first = first;
            else parent.second = first;

            first.setGroup(parent);
        } else {
            first.setGroup(null);
            group.getContainer().setRootEntry(first);
        }
    }
}
export type TabSlotGroupEntry<T extends TabEntry = TabEntry> = TabSlotGroup<T> | TabSlot<T>;