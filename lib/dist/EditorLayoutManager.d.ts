import ActionController, { ActionData } from "./action/ActionController";
import ActionSource from "./action/ActionSource";
import EditorAction from "./action/EditorAction";
import TopBarEntry from "./top/TopBarEntry";
import KeybindManager from "./keybinds/KeybindManager";
import SidebarTabEntry, { SideBarTabEntryOptions } from "./sidebar/SidebarTabEntry";
import { SidebarTabPosition } from "./sidebar/SidebarTabPosition";
export default class EditorLayoutManager {
    private readonly actions;
    private readonly topBarEntries;
    private readonly sideBarTabEntries;
    private readonly keybindManager;
    constructor();
    createAction(controller: ActionController): EditorAction;
    createAction(action: (source: ActionSource) => void | Promise<void>, options?: Partial<ActionData>): EditorAction;
    createAction(action: (source: ActionSource) => void | Promise<void>, id: string | null, options?: Partial<ActionData>): EditorAction;
    getAction(id: string): EditorAction | undefined;
    createTopBarEntry(id: string, name: string): TopBarEntry;
    getTopBarEntry(id: string): TopBarEntry | undefined;
    getKeybindManager(): KeybindManager;
    addContextMenuAction(action: ActionController): void;
    getTopBarEntries(): TopBarEntry[];
    createSideBarTabEntry(id: string, name: string, options: Partial<SideBarTabEntryOptions>): SidebarTabEntry;
    getSideBarTabEntry(id: string): SidebarTabEntry | undefined;
    getSideBarTabEntries(position: SidebarTabPosition): SidebarTabEntry[];
}
