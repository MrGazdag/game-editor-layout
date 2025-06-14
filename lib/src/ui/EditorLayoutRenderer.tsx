import React, {PureComponent} from "react";
import EditorLayoutManager from "../EditorLayoutManager";
import ContextMenuRenderer from "./context/ContextMenuRenderer";
import ContextMenu from "../context/ContextMenu";
import MenuBarRenderer from "./menu/MenuBarRenderer";
import ActionSource from "../action/ActionSource";
import TabSlotContainerRenderer from "./tab/TabSlotContainerRenderer";
import {SidebarTabPosition} from "../tab/sidebar/SidebarTabPosition";

export default class EditorLayoutRenderer extends PureComponent<Props, State> {
    private contextMenuClickHandler: (e: MouseEvent)=>void;
    private blurHandler: (e: Event)=>void;
    private menuUpdate: (m: ContextMenu)=>void;
    private topBarRef: React.RefObject<MenuBarRenderer>;
    private dragContexts: Map<string,any>;
    private sessionId: string;
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
        this.blurHandler = (e)=>{
            if (!this.props.dev) this.showContextMenu(undefined);
        };
        this.dragContexts = new Map();
        this.sessionId = crypto.randomUUID();
    }

    componentDidMount() {
        addEventListener("click", this.contextMenuClickHandler);
        addEventListener("blur", this.blurHandler);
    }

    componentWillUnmount() {
        removeEventListener("click", this.contextMenuClickHandler);
        removeEventListener("blur", this.blurHandler);
    }

    render() {
        let contextMenus = [];
        let menu = this.state.contextMenu ?? null;
        while (menu != null) {
            contextMenus.push(menu);
            menu = menu.getSubMenu();
        }

        let window = this.props.manager.getWindowManager().getCurrentWindow();
        let leftSidebar = window.getSidebarTabContainer(SidebarTabPosition.LEFT);
        let rightSidebar = window.getSidebarTabContainer(SidebarTabPosition.RIGHT);
        return <div className="editor_layout">
            <SharedEditorLayoutRenderer.Provider value={this}>
                <SharedEditorLayoutManager.Provider value={this.props.manager}>
                    <MenuBarRenderer ref={this.topBarRef} icon={this.props.editorIcon ?? ""}/>
                    <div className="_content">
                        {leftSidebar ? <TabSlotContainerRenderer tab={leftSidebar}/> : undefined}
                        <div className="_main_editors">
                            <TabSlotContainerRenderer tab={window.getEditorTabContainer()}/>
                        </div>
                        {rightSidebar ? <TabSlotContainerRenderer tab={rightSidebar}/> : undefined}
                    </div>
                    <div className="_bottombar"></div>
                    {contextMenus.map((m,i)=><ContextMenuRenderer menu={m} key={i} renderer={this}/>)}
                </SharedEditorLayoutManager.Provider>
            </SharedEditorLayoutRenderer.Provider>
        </div>;
    }

    private getDragTypePrefix() {
        return "game-editor-layout:" + this.sessionId + "/drag:";
    }

    setDraggableContext<T>(target: T, e: React.DragEvent) {
        let id = crypto.randomUUID();
        this.dragContexts.set(id, target);
        e.dataTransfer.setData(this.getDragTypePrefix() + id, "Yes");
    }

    getDraggableContext<T>(e: React.DragEvent): T | undefined {
        for (let type of e.dataTransfer.types) {
            if (type.startsWith(this.getDragTypePrefix())) {
                let key = type.substring(this.getDragTypePrefix().length);
                let result = this.dragContexts.get(key);
                if (result !== undefined) return result;
            }
        }
        return undefined;
    }

    clearDraggableContext<T>(e: React.DragEvent) {
        for (let type of e.dataTransfer.types) {
            if (type.startsWith(this.getDragTypePrefix())) {
                let key = type.substring(this.getDragTypePrefix().length);
                if (this.dragContexts.has(key)) {
                    this.dragContexts.delete(key);
                }
            }
        }
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
    editorIcon?: string,
    dev?: boolean
}

interface State {
    contextMenu?: ContextMenu
}

export const SharedEditorLayoutRenderer = React.createContext<EditorLayoutRenderer>(null as any);
export const SharedEditorLayoutManager = React.createContext<EditorLayoutManager>(null as any);