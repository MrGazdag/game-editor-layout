import React from "react";
import TabSlotContainer from "../../tab/TabSlotContainer";
import DynamicComponent from "../common/DynamicComponent";
import TabSlotGroupRenderer from "./TabSlotGroupRenderer";

export default class TabSlotContainerRenderer extends DynamicComponent<TabSlotContainer, Props> {
    constructor(props: Props) {
        super(props,"tab");
    }

    renderData(container: TabSlotContainer) {
        return <div className={`tab_slot_container`}>
            {TabSlotGroupRenderer.renderEntry(container.getRootEntry(), "root", false)}
        </div>;
    }
}
interface Props {
    tab: TabSlotContainer
}