import {SidebarTabPosition} from "../tab/sidebar/SidebarTabPosition";

export interface SerializedLayout {
    windows: SerializedWindowLayout[];
}

interface SerializedWindowLayout {
    sidebars: Record<SidebarTabPosition, SidebarContainer>
    editors: SerializedSplitView
}

interface SidebarContainer {
    size: number,
    open: boolean,
    slots: SidebarContainerSlot[]
}
interface SidebarContainerSlot {
    open: boolean,
    tabs: string[]
}

interface SerializedSplitViewSplit {
    split: true,
    vertical: boolean,
    splitPoint: number,
    first: SerializedSplitView,
    second: SerializedSplitView,
}

interface SerializedSplitViewContents {
    split: false,
    contents: string[]
}

type SerializedSplitView = SerializedSplitViewSplit | SerializedSplitViewContents;