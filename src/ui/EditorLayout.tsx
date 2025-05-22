import React, {Component} from "react";
import EditorLayoutManager from "../EditorLayoutManager";
import ContextMenuRenderer from "./ContextMenuRenderer";
import ContextMenu from "../context/ContextMenu";
import TopBarRenderer from "./TopBarRenderer";
import ContextMenuInitiator from "./ContextMenuInitiator";
import ActionSource from "../action/ActionSource";
import SidebarRenderer from "./SidebarRenderer";
import {SidebarTabPosition} from "../sidebar/SidebarTabPosition";
import SidebarContainerRenderer from "./SidebarContainerRenderer";

export default class EditorLayout extends Component<Props, State> {
    private contextMenuClickHandler: (e: MouseEvent)=>void;
    constructor(props: Props) {
        super(props);
        this.state = {};
        this.contextMenuClickHandler = (e)=>{
            this.showContextMenu(undefined);
        };
    }

    componentDidMount() {
        addEventListener("click", this.contextMenuClickHandler);
    }

    componentWillUnmount() {
        removeEventListener("click", this.contextMenuClickHandler);
    }

    render() {
        return <div className="editor_layout">
            <SharedEditorLayout.Provider value={this}>
                <SharedEditorLayoutManager.Provider value={this.props.manager}>
                    <TopBarRenderer manager={this.props.manager} renderer={this} icon={this.props.editorIcon ?? ""}/>
                    <div className="content">
                        <SidebarContainerRenderer manager={this.props.manager} position={SidebarTabPosition.LEFT}/>
                        <div className="main_editors">
                            <ContextMenuInitiator menuProvider={(e) => {
                                console.log("Main Content Click");
                                let entry = this.props.manager.getTopBarEntry("edit")!;
                                let inlineAction = this.props.manager.createAction(() => {
                                    alert("helo inline action");
                                });
                                return [...entry.getActions(), inlineAction];
                            }}>
                                <div style={{
                                    backgroundColor: "red",
                                    position: "relative",
                                    top: "100px",
                                    left: "150px",
                                    width: "200px",
                                    height: "100px"
                                }}>
                                    <ContextMenuInitiator menuProvider={(e) => {
                                        let innerAction = this.props.manager.createAction(() => {
                                            alert("helo belső");
                                        }, {
                                            name: "Belső Action"
                                        });
                                        return [innerAction];
                                    }}/>
                                </div>
                            </ContextMenuInitiator>
                        </div>
                        <SidebarContainerRenderer manager={this.props.manager} position={SidebarTabPosition.RIGHT}/>
                    </div>
                    <div className="bottombar"></div>
                    {this.state.contextMenu ?
                        <ContextMenuRenderer renderer={this} menu={this.state.contextMenu}/> : null}
                </SharedEditorLayoutManager.Provider>
            </SharedEditorLayout.Provider>
        </div>;
    }

    showContextMenu(contextMenu: ContextMenu | undefined) {
        if (this.state.contextMenu) {
            this.state.contextMenu.setOpen(false);
        }

        contextMenu?.setOpen(true);
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