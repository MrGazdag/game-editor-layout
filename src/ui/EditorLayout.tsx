import React, {Component} from "react";
import EditorLayoutManager from "../EditorLayoutManager";
import ContextMenuRenderer from "./ContextMenuRenderer";
import ContextMenu from "../context/ContextMenu";
import TopBarRenderer from "./TopBarRenderer";
import ContextMenuInitiator from "./ContextMenuInitiator";
import ActionSource from "../action/ActionSource";

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
                    <TopBarRenderer manager={this.props.manager} renderer={this}/>
                    <div className="content">
                        <div className="left_tabs"></div>
                        <div className="main_editors">
                            <ContextMenuInitiator menuProvider={(e)=>{
                                let entry = this.props.manager.getTopBarEntry("edit")!;
                                return new ContextMenu("Context Menu", e.clientX, e.clientY, entry.getActions(), ActionSource.CONTEXT_MENU);
                            }}/>
                        </div>
                        <div className="right_tabs"></div>
                    </div>
                    <div className="bottombar"></div>
                    {this.state.contextMenu ? <ContextMenuRenderer renderer={this} menu={this.state.contextMenu}/> : null}
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
    manager: EditorLayoutManager
}

interface State {
    contextMenu?: ContextMenu
}

export const SharedEditorLayout = React.createContext<EditorLayout>(null as any);
export const SharedEditorLayoutManager = React.createContext<EditorLayoutManager>(null as any);