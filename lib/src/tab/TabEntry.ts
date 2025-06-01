import TabController from "./TabController";
import TabSlot from "./TabSlot";
import ChangeHandler from "../utils/ChangeHandler";
import TabManager from "./TabManager";

export default class TabEntry<Controller extends TabController=any> {
    #manager: TabManager;
    protected readonly controller: Controller;
    private slot: TabSlot | null;
    private changeHandler: ChangeHandler<TabEntry<Controller>>;

    constructor(manager: TabManager, controller: Controller) {
        this.#manager = manager;
        this.controller = controller;
        this.slot = null;
        this.changeHandler = new ChangeHandler();
        this.controller.getChangeHandler().add(()=>{
            this.changeHandler.apply(this);
        });
    }

    public getManager() {
        return this.#manager;
    }

    public getChangeHandler() {
        return this.changeHandler;
    }

    public getId() {
        return this.controller.getId();
    }

    setSlot(slot: TabSlot | null) {
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