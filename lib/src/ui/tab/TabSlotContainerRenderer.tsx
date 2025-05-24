import React from "react";
import TabSlotContainer from "../../tab/TabSlotContainer";
import TabSlotRenderer from "./TabSlotRenderer";
import DynamicComponent from "../common/DynamicComponent";

export default class TabSlotContainerRenderer extends DynamicComponent<TabSlotContainer, Props> {
    constructor(props: Props) {
        super(props,"tab");
    }

    renderData(container: TabSlotContainer) {
        return <div className={`tab_slot_container ${container.getId()}`}>
            {container.getSlots().map(slot => <TabSlotRenderer key={slot.getId()} slot={slot}/>)}
        </div>;
    }
}
interface Props {
    tab: TabSlotContainer
}