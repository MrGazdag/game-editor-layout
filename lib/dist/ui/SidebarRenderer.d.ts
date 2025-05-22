import { Component } from "react";
import React from "react";
import SidebarTabEntry from "../sidebar/SidebarTabEntry";
export default class SidebarRenderer extends Component<Props, State> {
    constructor(props: Props);
    render(): React.JSX.Element;
}
interface Props {
    tab: SidebarTabEntry;
}
interface State {
    open: boolean;
}
export {};
