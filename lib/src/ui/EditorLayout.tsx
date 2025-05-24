import React, {Component} from "react";
import EditorLayoutManager from "../EditorLayoutManager";
import ContextMenuRenderer from "./context/ContextMenuRenderer";
import ContextMenu from "../context/ContextMenu";
import TopBarRenderer from "./TopBarRenderer";
import ContextMenuInitiator from "./context/ContextMenuInitiator";
import ActionSource from "../action/ActionSource";
import EditorAction from "../action/EditorAction";
import TabSlotContainerRenderer from "./tab/TabSlotContainerRenderer";

export default class EditorLayout extends Component<Props, State> {
    private contextMenuClickHandler: (e: MouseEvent)=>void;
    private topBarRef: React.RefObject<TopBarRenderer>;
    constructor(props: Props) {
        super(props);
        this.state = {};
        this.contextMenuClickHandler = (e)=>{
            this.showContextMenu(undefined);
        };
        this.topBarRef = React.createRef();
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
                    <TopBarRenderer ref={this.topBarRef} manager={this.props.manager} renderer={this} icon={this.props.editorIcon ?? ""}/>
                    <div className="content">
                        <TabSlotContainerRenderer tab={this.props.manager.getLeftSideBar()} />
                        <div className="main_editors">
                            <TabSlotContainerRenderer tab={this.props.manager.getCenterSideBar()}/>
                            <ContextMenuInitiator menuProvider={(e) => {
                                let entry = this.props.manager.getTopBarEntry("edit")!;
                                let inlineAction = EditorAction.inline(() => {
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
                                        let innerAction = EditorAction.inline("Inner Action", () => {
                                            alert("hello inner");
                                        });
                                        return [innerAction];
                                    }}/>
                                </div>
                            </ContextMenuInitiator>
                        </div>
                        <TabSlotContainerRenderer tab={this.props.manager.getRightSideBar()} />
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
            if (this.state.contextMenu.getSource() == ActionSource.TOP_BAR) {
                this.topBarRef.current!.closeMenu(true);
            }
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