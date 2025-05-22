import { SidebarTabPosition } from "./SidebarTabPosition";
export default class SidebarTabEntry {
    private readonly id;
    private readonly name;
    private readonly position;
    private readonly openIcon;
    private readonly closedIcon;
    private open;
    private stateCallback;
    constructor(id: string, name: string, options?: Partial<SideBarTabEntryOptions>);
    setStateCallback(stateCallback: (open: boolean) => void): void;
    setTabState(state: boolean): void;
    getActiveIcon(): string;
    isOpen(): boolean;
    getOpenIcon(): string;
    getClosedIcon(): string;
    getId(): string;
    getName(): string;
    getPosition(): SidebarTabPosition;
}
export interface SideBarTabEntryOptions {
    position: SidebarTabPosition;
    openByDefault: boolean;
    icons: {
        open: string;
        closed: string;
    };
}
