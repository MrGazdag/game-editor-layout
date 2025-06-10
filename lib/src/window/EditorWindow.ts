import EditorLayoutManager from "../EditorLayoutManager";
import TabSlotContainer from "../tab/TabSlotContainer";
import SidebarTabEntry from "../tab/sidebar/SidebarTabEntry";
import EditorTabEntry from "../tab/editor/EditorTabEntry";
import TabType from "../tab/TabType";
import {SidebarTabPosition} from "../tab/sidebar/SidebarTabPosition";

export default class EditorWindow {
    private readonly parent: EditorLayoutManager;
    private readonly id: number;

    private readonly sidebars: Map<SidebarTabPosition, TabSlotContainer<SidebarTabEntry>>;
    private readonly editorTabs: TabSlotContainer<EditorTabEntry>;

    constructor(parent: EditorLayoutManager, id: number) {
        this.parent = parent;
        this.id = id;

        this.sidebars = new Map();
        for (let pos of this.parent.getTabManager().getAllowedSidebarPositions()) {
            this.sidebars.set(pos, new TabSlotContainer(pos, TabType.SIDEBAR, {
                uncollapsableSlots: false,
                multiSlot: true
            }));
        }
        this.editorTabs = new TabSlotContainer("center", TabType.EDITOR, {
            uncollapsableSlots: true,
            multiSlot: false
        });
    }

    getParent() {
        return this.parent;
    }

    public getSidebarTabContainer(pos: SidebarTabPosition) {
        return this.sidebars.get(pos);
    }

    getSidebarTabContainerOrFallback(pos: SidebarTabPosition) {
        return this.sidebars.get(pos) ?? [...this.sidebars.values()][0];
    }

    getEditorTabContainer() {
        return this.editorTabs;
    }
}