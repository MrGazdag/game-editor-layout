import React from "react";
import TabSlotRenderer from "./TabSlotRenderer";
import DynamicComponent from "../common/DynamicComponent";
import TabSlotGroup, {TabSlotGroupEntry} from "../../tab/TabSlotGroup";

export default class TabSlotGroupRenderer extends DynamicComponent<TabSlotGroup, Props> {
    private first: TabSlotGroupEntry | null;
    private second: TabSlotGroupEntry | null;
    constructor(props: Props) {
        super(props,"group");
        this.first = null;
        this.second = null;
    }

    componentDidMount() {
        super.componentDidMount();
        this.first = this.props.group.getFirst();
        this.first.getChangeHandler().add(this.changeHandler);
        this.second = this.props.group.getSecond();
        this.second.getChangeHandler().add(this.changeHandler);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.first?.getChangeHandler().remove(this.changeHandler);
        this.second?.getChangeHandler().remove(this.changeHandler);
    }

    renderData(group: TabSlotGroup) {
        let first = group.getFirst();
        let second = group.getSecond();

        if (this.first !== first) {
            this.first?.getChangeHandler().remove(this.changeHandler);
            this.first = first;
            this.first.getChangeHandler().add(this.changeHandler);
        }
        if (this.second !== second) {
            this.second?.getChangeHandler().remove(this.changeHandler);
            this.second = second;
            this.second.getChangeHandler().add(this.changeHandler);
        }

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
