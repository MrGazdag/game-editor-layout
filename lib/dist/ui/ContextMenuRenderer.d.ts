import React, { Component } from "react";
import ContextMenu from "../context/ContextMenu";
import EditorLayout from "./EditorLayout";
export default class ContextMenuRenderer extends Component<Props, any> {
    private resizeHandler;
    private ref;
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    recalculatePos(): void;
    render(): React.JSX.Element | undefined;
}
interface Props {
    menu: ContextMenu;
    renderer: EditorLayout;
}
export {};
