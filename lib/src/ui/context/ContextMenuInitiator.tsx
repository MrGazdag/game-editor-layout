import React, {Component} from "react";
import ContextMenu from "../../context/ContextMenu";
import EditorLayout, {SharedEditorLayout} from "../EditorLayout";
import ContextMenuMode from "../../context/ContextMenuMode";
import EditorAction from "../../action/EditorAction";
import ActionSource from "../../action/ActionSource";

export default class ContextMenuInitiator extends Component<Props,any> {
    private layout!: EditorLayout;
    private parent: ContextMenuInitiator | null;
    constructor(props: Props) {
        super(props);
        this.parent = null;
    }

    openContextMenu(e: React.MouseEvent, childActions?: EditorAction[]) {
        let mode = this.props.mode ?? ContextMenuMode.ADDITIVE;
        let actions = this.props.menuProvider(e);

        if (childActions) actions.push(...childActions);
        if (this.parent && mode == ContextMenuMode.ADDITIVE) {
            this.parent.openContextMenu(e, actions);
        } else {
            this.layout.showContextMenu(new ContextMenu(null, "Context Menu", e.clientX, e.clientY, actions, ActionSource.CONTEXT_MENU));
        }
    }

    render() {
        return <SharedEditorLayout.Consumer>
            {layout => {
                this.layout = layout;
                return <ParentContextMenu.Consumer>
                    {parent => {
                        this.parent = parent;
                        return <ParentContextMenu.Provider value={this}>
                            <div className="context_menu_initiator" onContextMenu={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.openContextMenu(e);
                            }}>
                                {this.props.children}
                            </div>
                        </ParentContextMenu.Provider>;
                    }}
                </ParentContextMenu.Consumer>;
            }}
        </SharedEditorLayout.Consumer>
    }
}

interface Props {
    mode?: ContextMenuMode;
    menuProvider: (e: React.MouseEvent) => EditorAction[];
    children?: React.ReactNode;
}
const ParentContextMenu = React.createContext<ContextMenuInitiator|null>(null);