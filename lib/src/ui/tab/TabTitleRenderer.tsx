import DynamicComponent from "../common/DynamicComponent";
import TabEntry from "../../tab/TabEntry";
import ContextMenuInitiator from "../context/ContextMenuInitiator";
import EditorAction, {ActionEntryInput} from "../../action/EditorAction";
import Icon from "../common/Icon";
import React from "react";
import TabSlotGroup from "../../tab/TabSlotGroup";

export default class TabTitleRenderer extends DynamicComponent<TabEntry, Props> {
    constructor(props: Props) {
        super(props, "tab");
    }
    protected renderData(tab: TabEntry) {
        let slot = tab.getSlot();
        if (!slot) return null;
        let className = "tab_title";
        if (slot.getSelectedTab() == tab) className += " _selected";

        return <ContextMenuInitiator menuProvider={()=>{
            let actions: ActionEntryInput[] = [];
            actions.push(EditorAction.inline({
                name: "Close Tab",
                icon: "x",
                action: ()=>{
                    tab.close();
                }
            }));

            let slot = tab.getSlot()!;
            let group = slot.getGroup();
            let groupActions: EditorAction[] = [];
            if (slot.getTabs().length > 1) groupActions.push(EditorAction.inline({
                name: "Split and Move Right",
                action: ()=>{
                    let slot = tab.getSlot();
                    if (slot) TabSlotGroup.splitSlot(slot, false, false, tab);
                }
            }),EditorAction.inline({
                name: "Split and Move Down",
                action: ()=>{
                    let slot = tab.getSlot();
                    if (slot) TabSlotGroup.splitSlot(slot, true, false, tab);
                }
            }));
            if (group && TabSlotGroup.canUnsplit(group)) groupActions.push(EditorAction.inline({
                name: "Unsplit",
                action: ()=>{
                    let g = tab.getSlot()?.getGroup();
                    if (g) TabSlotGroup.unsplit(g);
                }
            }));
            if (group) groupActions.push(EditorAction.inline({
                name: "Change Splitter Orientation",
                action: ()=>{
                    let g = tab.getSlot()?.getGroup();
                    if (g) g.setVertical(!g.isVertical());
                }
            }));
            actions.push(groupActions);
            return actions;
        }}>
            <div className={className} onClick={(e) => {
                if (slot.getSelectedTab() == tab) {
                    slot.setOpen(!slot.isOpen());
                } else {
                    slot.setSelectedTab(tab);
                }
            }} onMouseUp={(e) => {
                if (e.button == 1) {
                    tab.close();
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