import {Component} from "react";
import EditorLayoutManager from "../EditorLayoutManager";
import React from "react";
import SideBarTabEntry from "../sidebar/SideBarTabEntry";
import {SideBarTabPosition} from "../sidebar/SideBarTabPosition";
import Icon from "./Icon";
import SideBarRenderer from "./SideBarRenderer";

export default class SideBarContainerRenderer extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {}
	}

	render() {
		return <div className={`side_bar ${this.props.position == SideBarTabPosition.LEFT ? "left_tabs" : "right_tabs"}`}>
			{this.getSideBarTabs().map(tab => <SideBarRenderer key={tab.getId()} tab={tab}/>)}
		</div>;
	}

	getSideBarTabs(): SideBarTabEntry[] {
		return this.props.manager.getSideBarTabEntries(this.props.position);
	}
}

interface Props {
	manager: EditorLayoutManager,
	position: SideBarTabPosition
}

interface State {

}