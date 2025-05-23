import Controller from "../controller/Controller";
import {SidebarTabPosition} from "./SidebarTabPosition";
import React from "react";
import TabController, {TabData, TabInitData} from "./TabController";

export default class SidebarTabController extends TabController {
    private readonly id: string;
    private readonly preferredPosition: SidebarTabPosition;

    constructor(options: SidebarInitData) {
        super(DefaultSidebarTabData, {
            // The name defaults to the ID
            ...(options.id !== null ? {name: options.id}: null),
            ...options
        });
        this.id = options.id;
        this.preferredPosition = options?.preferredPosition ?? SidebarTabPosition.LEFT;
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