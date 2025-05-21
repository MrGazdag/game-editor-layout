import React, {Component} from "react";
import ContextMenu from "../context/ContextMenu";
import {SharedEditorLayout, SharedEditorLayoutManager} from "./EditorLayout";

export default class ContextMenuInitiator extends Component<Props,any> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return <SharedEditorLayout.Consumer>
            {layout => {
                return <div className="context_menu_initiator" onContextMenu={e=>{
                    e.preventDefault();
                    layout.showContextMenu(this.props.menuProvider(e))
                }}>
                    {this.props.children}
                </div>;
            }}
        </SharedEditorLayout.Consumer>
    }
}
interface Props {
    menuProvider: (e: React.MouseEvent)=>ContextMenu;
    children?: React.ReactNode;
}