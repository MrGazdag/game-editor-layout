import {Component} from "react";
import EditorLayoutManager from "../EditorLayoutManager";
import React from "react";
import SideBarTabEntry from "../sidebar/SideBarTabEntry";
import {SideBarTabPosition} from "../sidebar/SideBarTabPosition";

export default class SideBarRenderer extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {}
	}

	render() {
		return <div className={`side_bar ${this.props.position == SideBarTabPosition.LEFT ? "left_tabs" : "right_tabs"}`}>
			{this.getSideBarTabs().map(tab => {
				return <div key={tab.getId()} className={"_entry"}>
					<div className={"_control_bar"}>
						{/*up/down icon - state?*/}
						<div key={"_state"} className={"_state"}>{(tab.getId() ? "↓":"↑")}</div>
						<div key={"_name"} className={"_name"}>{tab.getName()}</div>
						<div key={"_separator"} className={"_separator"}></div>
						<div key={"_close"} className={"_close"}>X</div>
					</div>
					<div className={"_content"}>CONTENT</div>
				</div>;
			})}
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