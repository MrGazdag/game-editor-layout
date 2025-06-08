import {SidebarTabPosition} from "./SidebarTabPosition";
import TabController, {TabData, TabInitData} from "../TabController";

export default class SidebarTabController extends TabController {
    private readonly id: string;
    private readonly preferredPosition: SidebarTabPosition;

    constructor(options: SidebarInitData) {
        super(DefaultSidebarTabData, {
            // The name defaults to the ID
            ...(options.name === null && options.id !== null ? {name: options.id}: null),
            ...options
        });
        this.id = options.id;
        this.preferredPosition = options?.preferredPosition ?? SidebarTabPosition.LEFT;
    }

    getId() {
        return this.id;
    }

    getUniqueIdentifier(): string {
        return this.id;
    }

    getPreferredPosition() {
        return this.preferredPosition;
    }
}
const DefaultSidebarTabData: TabData = {
    name: "Sidebar Tab",
    description: "",
    icon: null
}
export interface SidebarInitData extends TabInitData {
    id: string,
    preferredPosition?: SidebarTabPosition;
}