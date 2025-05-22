import Controller from "../controller/Controller";
export default class SidebarTabController extends Controller<SidebarTabData> {
    private readonly id;
    constructor(id: string | null, options: Partial<SidebarTabData> | undefined);
    getId(): string | null;
    getName(): string;
    getDescription(): string;
    getIcon(): string | null;
}
export interface SidebarTabData {
    name: string;
    description: string;
    icon: string | null;
}
