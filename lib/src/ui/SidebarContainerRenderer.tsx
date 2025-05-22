import {Component} from "react";
import EditorLayoutManager from "../EditorLayoutManager";
import React from "react";
import SidebarTabEntry from "../sidebar/SidebarTabEntry";
import {SidebarTabPosition} from "../sidebar/SidebarTabPosition";
import Icon from "./Icon";
import SidebarRenderer from "./SidebarRenderer";

export default class SidebarContainerRenderer extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {}
	}

	render() {
		return <div className={`side_bar ${this.props.position == SidebarTabPosition.LEFT ? "left_tabs" : "right_tabs"}`}>
			{this.getSideBarTabs().map(tab => <SidebarRenderer key={tab.getId()} tab={tab}/>)}
		</div>;
	}

	getSideBarTabs(): SidebarTabEntry[] {
		return this.props.manager.getSideBarTabEntries(this.props.position);
	}
}

interface Props {
	manager: EditorLayoutManager,
	position: SidebarTabPosition
}

interface State {

}