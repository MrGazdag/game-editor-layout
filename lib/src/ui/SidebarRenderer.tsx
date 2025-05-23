import {Component} from "react";
import EditorLayoutManager from "../EditorLayoutManager";
import React from "react";
import SidebarTabEntry from "../tab/SidebarTabEntry";
import {SidebarTabPosition} from "../tab/SidebarTabPosition";
import Icon from "./Icon";
import ContextMenuInitiator from "./ContextMenuInitiator";
import ContextMenu from "../context/ContextMenu";
import ActionSource from "../action/ActionSource";

export default class SidebarRenderer extends Component<Props, State> {
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
			<div className={"_control_bar_row"}>
				<div className={"_icon"} onClick={() => {
					tab.setTabState(!tab.isOpen());
				}}>
					<Icon icon={tab.isOpen() ? "chevron-down-solid" : "chevron-right-solid"} />
				</div>
				<div className={"_control_bar"} onClick={() => {
					tab.setTabState(!tab.isOpen());
				}}>
					{tab.getIcon() ? <Icon icon={tab.getIcon()!}/> : null}
					<div key={"_name"} className={"_name"}>{tab.getName()}</div>
				</div>
				<div key={"_separator"} className={"_separator"}></div>
				<div key={"_close"} className={"_close"}>X</div>
			</div>
			<div className={`_content ${(tab.isOpen() ? "" : " _closed")}`}>
				{tab.render()}
			</div>
		</div>;
	}
}

interface Props {
	tab: SidebarTabEntry
}

interface State {
	open: boolean
}