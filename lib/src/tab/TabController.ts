import React from "react";
import Controller from "../controller/Controller";

export default abstract class TabController extends Controller<TabData> {
    private readonly renderer: ()=>React.ReactNode;
    protected constructor(defaults: TabData, data: TabInitData) {
        super(defaults, data);
        this.renderer = data.renderer;
    }

    public abstract getId(): string;

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
export interface TabData {
    name: string,
    description: string,
    icon: string | null
}
export interface TabInitData extends Partial<TabData> {
    renderer: ()=>React.ReactNode;
}