import SidebarTabEntry from "./sidebar/SidebarTabEntry";
import SidebarTabController, {SidebarInitData} from "./sidebar/SidebarTabController";
import EditorLayoutManager from "../EditorLayoutManager";
import ChangeHandler from "../utils/ChangeHandler";
import {TabSlotContainerOptions} from "./TabSlotContainer";
import EditorTabEntry from "./editor/EditorTabEntry";
import EditorTabController from "./editor/EditorTabController";
import React from "react";
import {SidebarTabPosition} from "./sidebar/SidebarTabPosition";

export default class TabManager {
    private readonly parent: EditorLayoutManager;
    private readonly sideBarTabEntries: Map<string,SidebarTabEntry>;
    private readonly changeHandler: ChangeHandler<TabManager>;

    private readonly openEditorTabs: Map<string,EditorTabEntry>;

    private readonly opener: EditorTabOpener;
    private readonly allowedSidebarPositions: SidebarTabPosition[];

    constructor(parent: EditorLayoutManager, options?: TabManagerOptions) {
        this.parent = parent;
        this.sideBarTabEntries = new Map();
        this.changeHandler = new ChangeHandler();

        this.openEditorTabs = new Map();
        this.opener = options?.editorTabOpener ?? (()=>null);
        this.allowedSidebarPositions = options?.allowedSidebarPositions ?? [SidebarTabPosition.LEFT, SidebarTabPosition.RIGHT];
    }

    getChangeHandler() {
        return this.changeHandler;
    }

    getAllowedSidebarPositions() {
        return this.allowedSidebarPositions;
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

    // TODO i don't like the hackiness of the three methods below, maybe do some cleanup
    private openNewEditorTab(tab: EditorTabEntry) {
        this.openEditorTabs.set(tab.getURI(), tab);
        let defaultWindow = this.getParent().getWindowManager().getDefaultWindow();
        defaultWindow.getEditorTabContainer().addTabs(tab);
        tab.getSlot()!.setSelectedTab(tab);
    }
    openEditorTab(param: string | EditorTabEntry | EditorTabController) {
        if (typeof param === "string") {
            if (this.openEditorTabs.has(param)) {
                let tab = this.openEditorTabs.get(param)!;
                let slot = tab.getSlot()!;
                slot.setSelectedTab(tab);
            } else {
                let tab = this.opener(this, param);
                if (tab == null) tab = this.renderFallbackEditorTab(param);
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

    private renderFallbackEditorTab(uri: string) {
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
    }
}
type EditorTabOpener = (manager: TabManager, uri: string)=>EditorTabEntry | null;
export interface TabManagerOptions {
    editorTabOpener?: EditorTabOpener;
    allowedSidebarPositions?: SidebarTabPosition[],
    sidebarPreset?: TabSlotContainerOptions,
    editorPreset?: TabSlotContainerOptions
}