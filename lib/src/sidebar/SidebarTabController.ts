import Controller from "../controller/Controller";
import {SidebarTabPosition} from "./SidebarTabPosition";
import React from "react";

export default class SidebarTabController extends Controller<SidebarTabData> {
    private readonly id: string;
    private readonly preferredPosition: SidebarTabPosition;
    private readonly renderer: ()=>React.ReactNode;

    constructor(options: SidebarInitData) {
        super(DefaultSidebarTabData, {
            // The name defaults to the ID
            ...(options.id !== null ? {name: options.id}: null),
            ...options
        });
        this.id = options.id;
        this.preferredPosition = options?.preferredPosition ?? SidebarTabPosition.LEFT;
        this.renderer = options.renderer;
    }

    getId() {
        return this.id;
    }

    getPreferredPosition() {
        return this.preferredPosition;
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

    render() {
        return this.renderer();
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
export interface SidebarInitData extends Partial<SidebarTabData> {
    id: string,
    preferredPosition?: SidebarTabPosition;
    renderer: ()=>React.ReactNode;
}