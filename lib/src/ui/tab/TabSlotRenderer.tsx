import React from "react";
import TabSlot from "../../tab/TabSlot";
import Icon from "../common/Icon";
import ContextMenuInitiator from "../context/ContextMenuInitiator";
import EditorAction from "../../action/EditorAction";
import DynamicComponent from "../common/DynamicComponent";

export default class TabSlotRenderer extends DynamicComponent<TabSlot, Props> {
    constructor(props: Props) {
        super(props, "slot");
    }

    renderData(slot: TabSlot) {
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
                    {slot.getTabs().map((tab) => {
                        let className = "_control_bar";
                        if (slot.getSelectedTab() == tab) className += " _selected";

                        return <ContextMenuInitiator key={tab.getId()} menuProvider={()=>{
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
                    }}><Icon icon={"x"}/></div>}
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
