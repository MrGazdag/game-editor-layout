import React, { Component } from "react";
import ContextMenuMode from "../context/ContextMenuMode";
import EditorAction from "../action/EditorAction";
export default class ContextMenuInitiator extends Component<Props, any> {
    private layout;
    private parent;
    constructor(props: Props);
    openContextMenu(e: React.MouseEvent, childActions?: EditorAction[]): void;
    render(): React.JSX.Element;
}
interface Props {
    mode?: ContextMenuMode;
    menuProvider: (e: React.MouseEvent) => EditorAction[];
    children?: React.ReactNode;
}
export {};
