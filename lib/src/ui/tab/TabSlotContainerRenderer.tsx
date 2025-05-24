import React, {Component} from "react";
import TabSlotContainer from "../../tab/TabSlotContainer";
import TabSlotRenderer from "./TabSlotRenderer";

export default class TabSlotContainerRenderer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            renderCount: 0
        };

        props.tab.setChangeHandler(()=>{
            this.setState({
                renderCount: this.state.renderCount+1
            });
        })
    }

    render() {
        let container = this.props.tab;
        return <div className={`tab_slot_container ${container.getId()}`}>
            {container.getSlots().map(slot => <TabSlotRenderer key={slot.getId()} slot={slot}/>)}
        </div>;
    }
}
interface Props {
    tab: TabSlotContainer
}
interface State {
    renderCount: number;
}