import React, {Component} from "react";
import EditorLayoutManager from "../EditorLayoutManager";
import EditorLayout from "./EditorLayout";
import ContextMenu from "../context/ContextMenu";
import ActionSource from "../action/ActionSource";
import Icon from "./Icon";
import TopBarEntry from "../top/TopBarEntry";

export default class TopBarRenderer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    private openMenu(t: TopBarEntry, e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        let rect = e.currentTarget.getBoundingClientRect();
        let contextMenu = new ContextMenu("Top Bar", rect.left, rect.bottom, t.getActions(), ActionSource.TOP_BAR);
        this.props.renderer.showContextMenu(contextMenu);
        this.setState({
            ...this.state,
            open: {
                entry: t,
                menu: contextMenu
            }
        });
    }
    private closeMenu() {
        this.props.renderer.showContextMenu(undefined);
        this.setState({
            ...this.state,
            open: undefined
        });
    }

    render() {
        return <div className="top_bar">
            <Icon icon={""} className={"_icon"}/>
            {this.props.manager.getTopBarEntries().map(t=>{
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
        </div>
    }
}
interface Props {
    manager: EditorLayoutManager,
    renderer: EditorLayout,
}
interface State {
    open?: {
        entry: TopBarEntry;
        menu: ContextMenu
    };
}