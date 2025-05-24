import React, {Component} from "react";
import TabSlot from "../../tab/TabSlot";
import Icon from "../Icon";
import ContextMenuRenderer from "../context/ContextMenuRenderer";
import ContextMenuInitiator from "../context/ContextMenuInitiator";
import EditorAction from "../../action/EditorAction";

export default class TabSlotRenderer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            renderCount: 0
        };
        props.slot.setChangeHandler(()=>{
            this.setState({
                renderCount: this.state.renderCount+1
            });
        });
    }

    render() {
        let slot = this.props.slot;
        let alwaysOpen = slot.getParent().isAlwaysOpen();
        let open = alwaysOpen || slot.isOpen();
        return <div className="tab_slot">
            <div className="_control_bar_row">
                {
                    alwaysOpen ? null : <div className="_opener" onClick={() => {
                        slot.setOpen(!slot.isOpen());
                    }}>
                        <Icon icon={open ? "chevron-down-solid" : "chevron-right-solid"}/>
                    </div>
                }
                <div className="_entries">
                    {slot.getTabs().map((tab, i) => {
                        let className = "_control_bar";
                        if (slot.getSelectedTab() == tab) className += " _selected";

                        return <ContextMenuInitiator key={tab.getId()} menuProvider={e=>{
                            return [EditorAction.inline("Close Tab", ()=>{
                                tab.getSlot()!.removeTab(tab);
                            })];
                        }}>
                            <div className={className} onClick={() => {
                                if (slot.getSelectedTab() == tab) {
                                    slot.setOpen(!slot.isOpen());
                                } else {
                                    slot.setSelectedTab(tab);
                                }
                            }}>
                                {tab.getIcon() ? <Icon icon={tab.getIcon()!}/> : null}
                                <div className="_name">{tab.getName()}</div>
                            </div>
                        </ContextMenuInitiator>;
                    })}
                </div>
                {alwaysOpen ? null
                    : <div className="_close" onClick={() => {
                        slot.getParent().removeSlot(slot);
                    }}>X</div>}
            </div>
            {open ? <div className="_content">
                {slot.getSelectedTab().render()}
            </div> : null}
        </div>;
    }
}

interface Props {
    slot: TabSlot,
}

interface State {
    renderCount: number;
}