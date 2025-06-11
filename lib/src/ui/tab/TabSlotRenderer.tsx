import React from "react";
import TabSlot from "../../tab/TabSlot";
import Icon from "../common/Icon";
import DynamicComponent from "../common/DynamicComponent";
import TabTitleRenderer from "./TabTitleRenderer";

export default class TabSlotRenderer extends DynamicComponent<TabSlot, Props> {
    constructor(props: Props) {
        super(props, "slot");
    }

    renderData(slot: TabSlot) {
        let cannotCollapse = slot.getContainer().hasUncollapsableSlots();
        let open = cannotCollapse || slot.isOpen();
        return <div className="tab_slot" style={{flexGrow: this.props.growOverride}}>
            <div className="_control_bar_row">
                {
                    cannotCollapse ? null : <div className="_opener" onClick={() => {
                        slot.setOpen(!slot.isOpen());
                    }}>
                        <Icon icon={open ? "chevron-down-solid" : "chevron-right-solid"}/>
                    </div>
                }
                <div className="_entries" onWheel={e=>{
                    // noinspection JSSuspiciousNameCombination
                    e.currentTarget.scrollLeft += e.deltaY;
                }}>
                    {slot.getTabs().map((tab) => {
                        return <TabTitleRenderer tab={tab} key={tab.getUniqueIdentifier()}/>
                    })}
                </div>
                {cannotCollapse ? null
                    : <div className="_close" onClick={() => {
                        slot.closeAll();
                    }}><Icon icon={"x"}/></div>}
            </div>
            {open ? <div className="_content" key={slot.getSelectedTab() !== null ? "content" : "empty"}>
                {slot.getSelectedTab()?.render()}
            </div> : null}
        </div>;
    }
}

interface Props {
    slot: TabSlot,
    growOverride?: number
}
