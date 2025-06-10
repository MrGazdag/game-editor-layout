import React from "react";
import TabSlotRenderer from "./TabSlotRenderer";
import DynamicComponent from "../common/DynamicComponent";
import TabSlotGroup, {TabSlotGroupEntry} from "../../tab/TabSlotGroup";

export default class TabSlotGroupRenderer extends DynamicComponent<TabSlotGroup, Props> {
    constructor(props: Props) {
        super(props,"group");
    }

    renderData(group: TabSlotGroup) {
        let first = group.getFirst();
        let second = group.getSecond();

        let split = group.getSplitPos();

        let firstPos = split;
        let secondPos = 1-split;

        if (first.isOpen() && !second.isOpen()) {
            firstPos = 1;
            secondPos = 0;
        } else if (!first.isOpen() && second.isOpen()) {
            firstPos = 0;
            secondPos = 1;
        } else if (!first.isOpen() && !second.isOpen()) {
            firstPos = 0;
            secondPos = 0;
        }
        return <div className={"tab_slot_group " + (group.isVertical() ? "_vertical" : "_horizontal")} style={{flexGrow: this.props.growOverride}}>
            {TabSlotGroupRenderer.renderEntry(first,  "first", firstPos)}
            {TabSlotGroupRenderer.renderEntry(second, "second",secondPos)}
        </div>;
    }

    static renderEntry(entry: TabSlotGroupEntry, key: string, growOverride?: number) {
        return entry instanceof TabSlotGroup
            ? <TabSlotGroupRenderer group={entry} key={key+"-group"} growOverride={growOverride}/>
            : <TabSlotRenderer       slot={entry} key={key+"-slot"} growOverride={growOverride}/>
    }
}
interface Props {
    group: TabSlotGroup,
    growOverride?: number
}
