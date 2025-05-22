import React, { Component } from "react";
import EditorLayoutManager from "../EditorLayoutManager";
import EditorLayout from "./EditorLayout";
import ContextMenu from "../context/ContextMenu";
import TopBarEntry from "../top/TopBarEntry";
export default class TopBarRenderer extends Component<Props, State> {
    constructor(props: Props);
    private openMenu;
    private closeMenu;
    render(): React.JSX.Element;
}
interface Props {
    manager: EditorLayoutManager;
    renderer: EditorLayout;
    icon: string;
}
interface State {
    open?: {
        entry: TopBarEntry;
        menu: ContextMenu;
    };
}
export {};
