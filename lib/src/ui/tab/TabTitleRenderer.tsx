import DynamicComponent from "../common/DynamicComponent";
import TabEntry from "../../tab/TabEntry";
import ContextMenuInitiator from "../context/ContextMenuInitiator";
import EditorAction, {ActionEntryInput} from "../../action/EditorAction";
import Icon from "../common/Icon";
import React from "react";
import TabSlotGroup from "../../tab/TabSlotGroup";

export default class TabTitleRenderer extends DynamicComponent<TabEntry, Props> {
    private readonly ref: React.RefObject<HTMLDivElement>;
    private wasSelected: boolean;
    constructor(props: Props) {
        super(props, "tab");
        this.ref = React.createRef();
        this.wasSelected = false;
    }
    protected renderData(tab: TabEntry) {
        let slot = tab.getSlot();
        if (!slot) return null;
        let className = "tab_title";

        let isSelected = slot.getSelectedTab() == tab;
        if (isSelected) className += " _selected";

        if (!this.wasSelected && isSelected) {
            if (this.ref.current) {
                this.ref.current.scrollIntoView({
                    behavior: "smooth"
                });
            } else {
                requestAnimationFrame(()=>{
                    this.ref.current!.scrollIntoView({
                        behavior: "smooth"
                    });
                });
            }
        }
        this.wasSelected = isSelected;

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
            <div className={className} ref={this.ref} onClick={(e) => {
                if (slot.getSelectedTab() == tab) {
                    slot.setOpen(!slot.isOpen());
                } else {
                    slot.setSelectedTab(tab);
                }
            }} onMouseUp={(e) => {
                if (e.button == 1) {
                    e.preventDefault();
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