import SidebarTabEntry from "./sidebar/SidebarTabEntry";
import SidebarTabController, {SidebarInitData} from "./sidebar/SidebarTabController";
import EditorLayoutManager from "../EditorLayoutManager";
import ChangeHandler from "../utils/ChangeHandler";
import TabSlotContainer from "./TabSlotContainer";

export default class TabManager {
    private readonly parent: EditorLayoutManager;
    private readonly sideBarTabEntries: Map<string,SidebarTabEntry>;
    private readonly changeHandler: ChangeHandler<TabManager>;

    private readonly leftSideBar: TabSlotContainer<SidebarTabEntry>;
    private readonly centerTabs: TabSlotContainer<SidebarTabEntry>; // TODO change this
    private readonly rightSideBar: TabSlotContainer<SidebarTabEntry>;

    constructor(parent: EditorLayoutManager) {
        this.parent = parent;
        this.sideBarTabEntries = new Map();
        this.changeHandler = new ChangeHandler();

        this.leftSideBar = new TabSlotContainer("left", false);
        this.centerTabs = new TabSlotContainer("center", true);
        this.rightSideBar = new TabSlotContainer("right", false);
    }

    getChangeHandler() {
        return this.changeHandler;
    }

    getParent() {
        return this.parent;
    }

    createSidebarTabEntry(controller: SidebarTabController): SidebarTabEntry;
    createSidebarTabEntry(options: SidebarInitData): SidebarTabEntry;
    createSidebarTabEntry(param: SidebarTabController | SidebarInitData) {
        let controller: SidebarTabController;
        if (param instanceof SidebarTabController) {
            controller = param;
        } else {
            controller = new SidebarTabController(param);
        }
        let entry = new SidebarTabEntry(this, controller);
        this.sideBarTabEntries.set(entry.getUniqueIdentifier(), entry);
        this.changeHandler.apply(this);
        return entry;
    }

    getSideBarTabEntry(id: string): SidebarTabEntry | undefined {
        return this.sideBarTabEntries.get(id);
    }

    getSidebarTabs() {
        return [...this.sideBarTabEntries.values()];
    }

    getLeftSideBar() {
        return this.leftSideBar;
    }

    getCenterSideBar() {
        return this.centerTabs;
    }

    getRightSideBar() {
        return this.rightSideBar;
    }
}