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
                        return <TabTitleRenderer tab={tab} key={tab.getUniqueIdentifier()}/>
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
