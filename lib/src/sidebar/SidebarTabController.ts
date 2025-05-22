import EditorLayoutManager from "../EditorLayoutManager";
import Controller from "../controller/Controller";

export default class SidebarTabController extends Controller<SidebarTabData> {
    private readonly id: string | null;

    constructor(id: string | null, options: Partial<SidebarTabData> | undefined) {
        super(DefaultSidebarTabData, {
            // The name defaults to the ID
            ...(id !== null ? {name: id}: null),
            ...options
        });
        this.id = id;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.data.name;
    }

    getDescription() {
        return this.data.description;
    }

    getIcon() {
        return this.data.icon;
    }
}
const DefaultSidebarTabData: SidebarTabData = {
    name: "Sidebar Tab",
    description: "",
    icon: null
}
export interface SidebarTabData {
    name: string,
    description: string,
    icon: string | null
}