import EditorLayoutManager from "../EditorLayoutManager";
import TabController from "./TabController";
import TabSlot from "./TabSlot";

export default class TabEntry<Controller extends TabController=TabController> {
    #manager: EditorLayoutManager;
    protected readonly controller: Controller;
    private slot: TabSlot | null;

    constructor(manager: EditorLayoutManager, controller: Controller) {
        this.#manager = manager;
        this.controller = controller;
        this.slot = null;
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