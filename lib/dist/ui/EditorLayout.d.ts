import React, { Component } from "react";
import EditorLayoutManager from "../EditorLayoutManager";
import ContextMenu from "../context/ContextMenu";
export default class EditorLayout extends Component<Props, State> {
    private contextMenuClickHandler;
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.JSX.Element;
    showContextMenu(contextMenu: ContextMenu | undefined): void;
}
interface Props {
    manager: EditorLayoutManager;
    editorIcon?: string;
}
interface State {
    contextMenu?: ContextMenu;
}
export declare const SharedEditorLayout: React.Context<EditorLayout>;
export declare const SharedEditorLayoutManager: React.Context<EditorLayoutManager>;
export {};
