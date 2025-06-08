import TabController from "./TabController";
import TabSlot from "./TabSlot";
import ChangeHandler from "../utils/ChangeHandler";

export default abstract class TabEntry<Controller extends TabController=any> {
    protected readonly controller: Controller;
    private readonly changeHandler: ChangeHandler<TabEntry<Controller>>;
    private slot: TabSlot<typeof this> | null;

    constructor(controller: Controller) {
        this.controller = controller;
        this.slot = null;
        this.changeHandler = new ChangeHandler();
        this.controller.getChangeHandler().add(()=>{
            this.changeHandler.apply(this);
        });
    }

    public getChangeHandler() {
        return this.changeHandler;
    }

    public getUniqueIdentifier() {
        return this.controller.getUniqueIdentifier();
    }

    setSlot(slot: TabSlot<typeof this> | null) {
        if (this.slot == slot) return;

        if (this.slot) {
            let oldSlot = this.slot;
            this.slot = null;
            oldSlot.removeTab(this);
        }
        this.slot = slot;
        if (slot != null && !slot.hasTab(this)) {
            slot.addTab(this);
        }
    }

    getSlot() {
        return this.slot;
    }

    getIcon() {
        return this.controller.getIcon();
    }

    getName() {
        return this.controller.getName();
    }

    getDescription() {
        return this.controller.getDescription();
    }

    render() {
        return this.controller.render();
    }
}