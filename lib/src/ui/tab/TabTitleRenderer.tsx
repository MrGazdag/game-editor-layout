import DynamicComponent from "../common/DynamicComponent";
import TabEntry from "../../tab/TabEntry";
import ContextMenuInitiator from "../context/ContextMenuInitiator";
import EditorAction from "../../action/EditorAction";
import Icon from "../common/Icon";
import React from "react";

export default class TabTitleRenderer extends DynamicComponent<TabEntry, Props> {
    constructor(props: Props) {
        super(props, "tab");
    }
    protected renderData(tab: TabEntry) {
        let slot = tab.getSlot();
        if (!slot) return null;
        let className = "_control_bar";
        if (slot.getSelectedTab() == tab) className += " _selected";

        return <ContextMenuInitiator menuProvider={()=>{
            return [EditorAction.inline("Close Tab", ()=>{
                tab.getSlot()!.removeTab(tab);
            }), EditorAction.inline("Move Tab to new Slot", ()=>{
                let slot = tab.getSlot()!;
                if (slot.getTabs().length == 1) return;
                let container = slot.getParent();
                container.createSlot(tab);
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
    }
}
interface Props {
    tab: TabEntry
}