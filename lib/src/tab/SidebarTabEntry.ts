import {SidebarTabPosition} from "./SidebarTabPosition";
import EditorLayoutManager from "../EditorLayoutManager";
import SidebarTabController from "./SidebarTabController";
import TabEntry from "./TabEntry";

export default class SidebarTabEntry extends TabEntry<SidebarTabController> {
	private position: SidebarTabPosition;

	constructor(manager: EditorLayoutManager, controller: SidebarTabController) {
		super(manager, controller);
		this.position = this.controller.getPreferredPosition();
	}

	getId() {
		return this.controller.getId();
	}

	getPosition() {
		return this.position;
	}
}