import React, {MouseEvent, RefObject} from "react";
import EditorAction from "../../action/EditorAction";
import Icon from "../common/Icon";
import DynamicComponent from "../common/DynamicComponent";
import ContextMenu, {ContextMenuPosition} from "../../context/ContextMenu";
import {SharedEditorLayout} from "../EditorLayout";

export default class EditorActionRenderer extends DynamicComponent<EditorAction, Props> {
    /**
     * The current submenu open under this action, or null if not present/applicable.
     */
    private subMenu: ContextMenu | null;
    /**
     * Whether this component is actively being hovered.
     * This is used because if an EditorAction is updated to
     * have a submenu when it previously didn't, and the user
     * was actively hovering while this happened, then the menu
     * should automatically open
     */
    private hovering: boolean;
    private hoverTimeout: number | null;

    private ref: RefObject<HTMLDivElement>;
    constructor(props: Props) {
        super(props, "action");
        this.subMenu = null;
        this.hoverTimeout = null;
        this.hovering = false;
        this.ref = React.createRef();
    }
    private delayOpenSubMenu() {
        this.hoverTimeout = window.setTimeout(() => {
            this.hoverTimeout = null;
            this.openSubMenu();
        }, 200);
    }
    private openSubMenu() {
        if (!this.ref.current) return;
        let subMenu = this.props.action.getSubMenu();
        if (subMenu) {
            let div = this.ref.current;
            let rect = div.getBoundingClientRect();
            let borderSide = 16*0.1; // 0.1rem border
            let borderTop = 16*0.4; // 0.1rem border + 0.4rem padding
            let posRight: ContextMenuPosition = {horizontal: rect.right - borderSide, vertical: rect.top-borderTop, align: "left"};
            let posLeft: ContextMenuPosition = {horizontal: rect.left + borderSide, vertical: rect.top-borderTop, align: "right"};
            this.subMenu = new ContextMenu(this.props.menu, this.props.menu.getName(), [posRight, posLeft], subMenu, this.props.menu.getSource());
            this.subMenu.getChangeHandler().add(menu=>{
                if (!menu.isOpen()) {
                    this.subMenu = null;
                    this.rerender();
                }
            });
            this.props.menu.setSubMenu(this.subMenu);
        }
    }
    renderData(action: EditorAction) {
        let className = "_action";
        // If there is no action and no submenu on an action,
        // then it is effectively a no-op, so mark it as disabled
        if (!action.isEnabled() ||
            (action.getSubMenu() == null && !action.hasAction())) className += " _disabled";
        else if ((this.subMenu != null && this.props.menu.getSubMenu() == this.subMenu)
            || this.hovering) {
            className += " _hovered";
        }

        let icon = action.getIcon();
        return <SharedEditorLayout.Consumer>
            {renderer=>{
                return <div ref={this.ref} className={className} onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (action.getSubMenu() == null || action.hasAction()) {
                        renderer.showContextMenu(undefined);
                    }
                    if (action.isEnabled() && action.hasAction()) {
                        action.runAction(this.props.menu.getSource());
                    }
                }} onMouseEnter={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.hovering = true;
                    this.props.menu.setSubMenu(this.subMenu);
                    if (this.subMenu == null) this.delayOpenSubMenu();
                    this.rerender();
                }} onMouseLeave={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.hovering = false;
                    this.rerender();
                    if (this.hoverTimeout != null) {
                        clearTimeout(this.hoverTimeout);
                        this.hoverTimeout = null;
                    }
                }}>
                    {icon ? <Icon className="_icon" icon={icon}/> : <span className="_icon"/>}
                    <span className="_name">{action.getName()}</span>
                    <span className="_binds">{action.getKeybinds().map((e,i)=>{
                        return <span className={e.isUnsafe() ? "_unsafe" : ""} key={i}>{e.toString()}</span>
                    })}</span>
                    {action.getSubMenu() != null ? <Icon className="_sub_icon" icon={"chevron-right-solid"}/> : null}
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