import SidebarTabEntry from "./sidebar/SidebarTabEntry";
import SidebarTabController, {SidebarInitData} from "./sidebar/SidebarTabController";
import EditorLayoutManager from "../EditorLayoutManager";
import ChangeHandler from "../utils/ChangeHandler";
import TabSlotContainer from "./TabSlotContainer";
import TabType from "./TabType";
import EditorTabEntry from "./editor/EditorTabEntry";
import EditorTabController from "./editor/EditorTabController";
import React from "react";

export default class TabManager {
    private readonly parent: EditorLayoutManager;
    private readonly sideBarTabEntries: Map<string,SidebarTabEntry>;
    private readonly changeHandler: ChangeHandler<TabManager>;

    private readonly leftSideBar: TabSlotContainer<SidebarTabEntry>;
    private readonly centerTabs: TabSlotContainer<EditorTabEntry>; // TODO change this
    private readonly rightSideBar: TabSlotContainer<SidebarTabEntry>;

    private readonly openEditorTabs: Map<string,EditorTabEntry>;

    private readonly opener: EditorTabOpener;

    constructor(parent: EditorLayoutManager, options?: TabManagerOptions) {
        this.parent = parent;
        this.sideBarTabEntries = new Map();
        this.changeHandler = new ChangeHandler();

        this.leftSideBar = new TabSlotContainer("left", TabType.SIDEBAR, {
            alwaysOpen: false,
            multiSlot: true
        });
        this.centerTabs = new TabSlotContainer("center", TabType.EDITOR, {
            alwaysOpen: true,
            multiSlot: false
        });
        this.rightSideBar = new TabSlotContainer("right", TabType.SIDEBAR, {
            alwaysOpen: false,
            multiSlot: true
        });
        this.openEditorTabs = new Map();
        this.opener = options?.editorTabOpener ?? (uri => {
            return new EditorTabEntry(this, new EditorTabController({
                name: "Unknown Tab",
                uri: uri,
                renderer: ()=>{
                    return <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexGrow: "1", flexDirection: "column"}}>
                        <span>Unknown Editor Tab with URI</span>
                        <span>{uri}</span>
                    </div>
                }
            }))
        });
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

    getCenterTabs() {
        return this.centerTabs;
    }

    getRightSideBar() {
        return this.rightSideBar;
    }

    // TODO i don't like the hackiness of the three methods below, maybe do some cleanup
    private openNewEditorTab(tab: EditorTabEntry) {
        this.openEditorTabs.set(tab.getURI(), tab);
        let slot = this.centerTabs.getSlots()[0];
        if (slot) tab.setSlot(slot);
        else slot = this.centerTabs.createSlot(tab)!;

        slot.setSelectedTab(tab);
    }
    openEditorTab(param: string | EditorTabEntry | EditorTabController) {
        if (typeof param === "string") {
            if (this.openEditorTabs.has(param)) {
                let tab = this.openEditorTabs.get(param)!;
                let slot = tab.getSlot()!;
                slot.setSelectedTab(tab);
            } else {
                let tab = this.opener(param);
                this.openNewEditorTab(tab);
            }
        } else if (param instanceof EditorTabController) {
            let uri = param.getURI();
            if (this.openEditorTabs.has(uri)) {
                let tab = this.openEditorTabs.get(uri)!;
                let slot = tab.getSlot()!;
                slot.setSelectedTab(tab);
            } else {
                let tab = new EditorTabEntry(this, param);
                this.openNewEditorTab(tab);
            }
        } else {
            let uri = param.getURI();
            if (this.openEditorTabs.has(uri)) {
                let slot = param.getSlot()!;
                slot.setSelectedTab(param);
            } else {
                this.openNewEditorTab(param);
            }
        }
    }

    closeEditorTab(tab: EditorTabEntry) {
        let uri = tab.getURI();
        this.openEditorTabs.delete(uri);
        tab.setSlot(null);
    }
}
type EditorTabOpener = (uri: string)=>EditorTabEntry;
export interface TabManagerOptions {
    editorTabOpener: EditorTabOpener;
}