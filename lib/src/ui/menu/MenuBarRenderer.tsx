import React, {Component} from "react";
import EditorLayoutRenderer, {SharedEditorLayoutManager, SharedEditorLayoutRenderer} from "../EditorLayoutRenderer";
import ContextMenu, {ContextMenuPosition} from "../../context/ContextMenu";
import ActionSource from "../../action/ActionSource";
import Icon from "../common/Icon";
import MenuBarEntry from "../../menubar/MenuBarEntry";

export default class MenuBarRenderer extends Component<Props, State> {
    private renderer!: EditorLayoutRenderer;
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    private openMenu(t: MenuBarEntry, e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        let rect = e.currentTarget.getBoundingClientRect();
        let pos: ContextMenuPosition = {horizontal: rect.left, vertical: rect.bottom, align: "left"};
        let contextMenu = new ContextMenu(null, "Menu Bar", [pos], t.getEntries(), ActionSource.MENU_BAR);
        this.renderer.showContextMenu(contextMenu);
        this.setState({
            ...this.state,
            open: {
                entry: t,
                menu: contextMenu
            }
        });
    }
    public closeMenu(onlyUpdate?: boolean) {
        if (!onlyUpdate) this.renderer.showContextMenu(undefined);
        this.setState({
            ...this.state,
            open: undefined
        });
    }

    render() {
        return <SharedEditorLayoutRenderer.Consumer>
            {renderer => {
                this.renderer = renderer;
                return <SharedEditorLayoutManager.Consumer>
                    {manager=>{
                        return <div className="menu_bar">
                            <Icon icon={this.props.icon} className={"_icon"}/>
                            {manager.getMenuBarManager().getMenuBarEntries().map(t=>{
                                let className = "_entry";
                                if (this.state.open?.entry == t) className += " _open";
                                return <div className={className} key={t.getId()} onMouseOver={e=>{
                                    // Only open on hover, when there is another menu open
                                    if (this.state.open && this.state.open.menu.isOpen() && this.state.open.entry != t) this.openMenu(t,e);
                                }} onClick={e=>{
                                    // If this menu is already open, close it
                                    if (this.state.open && this.state.open.menu.isOpen() && this.state.open.entry == t) this.closeMenu();
                                    else this.openMenu(t,e);
                                }}>
                                    {t.getName()}
                                </div>;
                            })}
                        </div>;
                    }}
                </SharedEditorLayoutManager.Consumer>;
            }}
        </SharedEditorLayoutRenderer.Consumer>
    }
}
interface Props {
    icon: string
}
interface State {
    open?: {
        entry: MenuBarEntry;
        menu: ContextMenu
    };
}