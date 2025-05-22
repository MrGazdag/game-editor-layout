import { Component } from "react";
import EditorLayoutManager from "../EditorLayoutManager";
import React from "react";
import SidebarTabEntry from "../sidebar/SidebarTabEntry";
import { SidebarTabPosition } from "../sidebar/SidebarTabPosition";
export default class SidebarContainerRenderer extends Component<Props, State> {
    constructor(props: Props);
    render(): React.JSX.Element;
    getSideBarTabs(): SidebarTabEntry[];
}
interface Props {
    manager: EditorLayoutManager;
    position: SidebarTabPosition;
}
interface State {
}
export {};
