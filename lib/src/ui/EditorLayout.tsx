import React, {Component} from "react";
import EditorLayoutManager from "../EditorLayoutManager";
import ContextMenuRenderer from "./context/ContextMenuRenderer";
import ContextMenu from "../context/ContextMenu";
import MenuBarRenderer from "./menu/MenuBarRenderer";
import ContextMenuInitiator from "./context/ContextMenuInitiator";
import ActionSource from "../action/ActionSource";
import EditorAction from "../action/EditorAction";
import TabSlotContainerRenderer from "./tab/TabSlotContainerRenderer";

export default class EditorLayout extends Component<Props, State> {
    private contextMenuClickHandler: (e: MouseEvent)=>void;
    private menuUpdate: (m: ContextMenu)=>void;
    private topBarRef: React.RefObject<MenuBarRenderer>;
    constructor(props: Props) {
        super(props);
        this.state = {};
        this.contextMenuClickHandler = (e)=>{
            this.showContextMenu(undefined);
        };
        this.topBarRef = React.createRef();
        this.menuUpdate = (m)=>{
            let sub = m.getSubMenu();
            if (sub !== null) {
                sub.getChangeHandler().add(this.menuUpdate);
            }
            this.forceUpdate();
        };
    }

    componentDidMount() {
        addEventListener("click", this.contextMenuClickHandler);
    }

    componentWillUnmount() {
        removeEventListener("click", this.contextMenuClickHandler);
    }

    render() {
        let contextMenus = [];
        let menu = this.state.contextMenu ?? null;
        while (menu != null) {
            contextMenus.push(menu);
            menu = menu.getSubMenu();
        }
        return <div className="editor_layout">
            <SharedEditorLayout.Provider value={this}>
                <SharedEditorLayoutManager.Provider value={this.props.manager}>
                    <MenuBarRenderer ref={this.topBarRef} manager={this.props.manager} renderer={this} icon={this.props.editorIcon ?? ""}/>
                    <div className="content">
                        <TabSlotContainerRenderer tab={this.props.manager.getTabManager().getLeftSideBar()} />
                        <div className="main_editors">
                            <TabSlotContainerRenderer tab={this.props.manager.getTabManager().getCenterSideBar()}/>
                        </div>
                        <TabSlotContainerRenderer tab={this.props.manager.getTabManager().getRightSideBar()} />
                    </div>
                    <div className="bottombar"></div>
                    {contextMenus.map((m,i)=><ContextMenuRenderer menu={m} key={i} renderer={this}/>)}
                </SharedEditorLayoutManager.Provider>
            </SharedEditorLayout.Provider>
        </div>;
    }

    showContextMenu(contextMenu: ContextMenu | undefined) {
        if (this.state.contextMenu) {
            this.state.contextMenu.setOpen(false);
            if (this.state.contextMenu.getSource() == ActionSource.MENU_BAR) {
                this.topBarRef.current!.closeMenu(true);
            }
        }

        contextMenu?.setOpen(true);
        contextMenu?.getChangeHandler().add(this.menuUpdate);
        this.setState({
            ...this.state,
            contextMenu: contextMenu
        });
    }
}

interface Props {
    manager: EditorLayoutManager,
    editorIcon?: string
}

interface State {
    contextMenu?: ContextMenu
}

export const SharedEditorLayout = React.createContext<EditorLayout>(null as any);
export const SharedEditorLayoutManager = React.createContext<EditorLayoutManager>(null as any);