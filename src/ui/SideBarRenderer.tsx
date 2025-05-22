import {Component} from "react";
import EditorLayoutManager from "../EditorLayoutManager";
import React from "react";
import SideBarTabEntry from "../sidebar/SideBarTabEntry";
import {SideBarTabPosition} from "../sidebar/SideBarTabPosition";
import Icon from "./Icon";
import ContextMenuInitiator from "./ContextMenuInitiator";
import ContextMenu from "../context/ContextMenu";
import ActionSource from "../action/ActionSource";

export default class SideBarRenderer extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			open: props.tab.isOpen()
		};
		props.tab.setStateCallback((open)=>{
			this.setState({
				...this.state,
				open: open
			});
		});
	}

	render() {
		let tab = this.props.tab;
		return <div className={`sidebar_entry`}>
			<div className={"_control_bar"}>
				<Icon icon={tab.getActiveIcon()}/>
				<div key={"_name"} className={"_name"} onClick={() => {
					tab.setTabState(!tab.isOpen());
				}}>{tab.getName()}</div>
				<div key={"_separator"} className={"_separator"}></div>
				<div key={"_close"} className={"_close"}>X</div>
			</div>
			<div className={`_content ${(tab.isOpen() ? "" : " _closed")}`}>
				CONTENT
			</div>
		</div>;
	}
}

interface Props {
	tab: SideBarTabEntry
}

interface State {
	open: boolean
}