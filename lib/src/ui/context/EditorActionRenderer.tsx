import React, {MouseEvent} from "react";
import EditorAction from "../../action/EditorAction";
import Icon from "../common/Icon";
import DynamicComponent from "../common/DynamicComponent";
import ContextMenu from "../../context/ContextMenu";
import {SharedEditorLayout} from "../EditorLayout";

export default class EditorActionRenderer extends DynamicComponent<EditorAction, Props> {
    constructor(props: Props) {
        super(props, "action");
    }
    renderData(action: EditorAction) {
        let className = "_action";
        // TODO enabled, submenus, etc
        let icon = action.getIcon();
        return <SharedEditorLayout.Consumer>
            {renderer=>{
                return <div className={className} onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    renderer.showContextMenu(undefined);
                    action.runAction(this.props.menu.getSource());
                }}>
                    {icon ? <Icon className="_icon" icon={icon}/> : <span className="_icon"/>}
                    <span className="_name">{action.getName()}</span>
                    <span className="_binds">{action.getKeybinds().map((e,i)=>{
                        return <span className={e.isUnsafe() ? "_unsafe" : ""} key={i}>{e.toString()}</span>
                    })}</span>
                </div>;
            }}
        </SharedEditorLayout.Consumer>;
    }
}
interface Props {
    menu: ContextMenu;
    action: EditorAction;
    onClick?: (e: MouseEvent) => void;
}