import EditorAction from "../action/EditorAction";
import {SideBarTabPosition} from "./SideBarTabPosition";

export default class SideBarTabEntry {
	private readonly id: string;
	private readonly name: string;
	private readonly position: SideBarTabPosition;
	private readonly actions: EditorAction[];

	constructor(id: string, name: string, position: SideBarTabPosition) {
		this.id = id;
		this.name = name;
		this.actions = [];
		this.position = position;
	}

	addAction(action: EditorAction) {
		this.actions.push(action);
	}
	removeAction(action: EditorAction) {
		let index = this.actions.indexOf(action);
		if (index > -1) {
			this.actions.splice(index, 1);
		}
	}

	getId() {
		return this.id;
	}

	getName() {
		return this.name;
	}

	getActions() {
		return this.actions;
	}

	getPosition() {
		return this.position;
	}
}