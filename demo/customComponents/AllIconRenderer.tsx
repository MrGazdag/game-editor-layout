import React from "react";
import {Component} from "react";
import IconTypes from "../IconTypes";
import Icon from "game-editor-layout/ui/common/Icon";

export default class AllIconRenderer extends Component<any, any> {
	private readonly icons: string[] = [
		"arrow-down",
		"arrow-up",
		"clipboard-regular",
		"copy-regular",
		"scissors-solid",
		"screwdriver-wrench-solid",
		"test-logo",
		"x"
	];

	constructor(props: any) {
		super(props);
		this.state = {}
	}

	render() {
		//icon + undefined because it uses className but it was null
		return <div className={"_all_icons"}>
			{this.icons.map(icon => <Icon icon={icon} className={"_entry"}/>)}
		</div>
	}
}