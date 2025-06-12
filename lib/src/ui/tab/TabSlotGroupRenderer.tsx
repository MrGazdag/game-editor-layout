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
        return <div className={"tab_slot_group " + (group.isVertical() ? "_vertical" : "")} style={{
            minWidth: this.props.widthOverride,
            width:    this.props.widthOverride,
            maxWidth: this.props.widthOverride,

            minHeight: this.props.heightOverride,
            height:    this.props.heightOverride,
            maxHeight: this.props.heightOverride
        }}>
            {TabSlotGroupRenderer.renderEntry(first,  "first",  group.isVertical(), firstPos)}
            {TabSlotGroupRenderer.renderEntry(second, "second", group.isVertical(), secondPos)}
        </div>;
    }

    static renderEntry(entry: TabSlotGroupEntry, key: string, vertical: boolean, growOverride?: number) {
        let percent = growOverride === undefined ? undefined : (growOverride * 100) + "%";
        return entry instanceof TabSlotGroup
            ? <TabSlotGroupRenderer group={entry} key={key+"-group"} widthOverride={vertical ? undefined : percent} heightOverride={vertical ? percent : undefined}/>
            : <TabSlotRenderer       slot={entry} key={key+"-slot"} widthOverride={vertical ? undefined : percent} heightOverride={vertical ? percent : undefined}/>
    }
}
interface Props {
    group: TabSlotGroup,
    widthOverride?: string
    heightOverride?: string
}
