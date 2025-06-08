import React, {Component} from "react";
import Icon from "game-editor-layout/ui/common/Icon";
import TabManager from "game-editor-layout/tab/TabManager";

export default class AllIconRenderer extends Component<Props, any> {
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

	constructor(props: Props) {
		super(props);
		this.state = {}
	}

	render() {
		//icon + undefined because it uses className, but it was null
		return <div className={"_all_icons"}>
			{this.icons.map(icon => <Icon icon={icon} key={icon} onClick={()=>{
				this.props.manager.openEditorTab("test-icon-tabs://" + icon);
			}} className={"_entry"}/>)}
		</div>
	}
}
interface Props {
	manager: TabManager
}