import SidebarTabController from "./SidebarTabController";
import TabEntry from "../TabEntry";
import TabManager from "../TabManager";
import {SidebarTabPosition} from "./SidebarTabPosition";
import TabSlotContainer from "../TabSlotContainer";

export default class SidebarTabEntry extends TabEntry<SidebarTabController> {
	private readonly manager: TabManager;
	constructor(manager: TabManager, controller: SidebarTabController) {
		super(controller);
		this.manager = manager;
	}

	public getManager() {
		return this.manager;
	}

	getUniqueIdentifier() {
		return this.controller.getId();
	}

	show() {
		let slot = this.getSlot();
		if (slot !== null) {
			// Tab is already visible, focus it
			// TODO properly focus tab
			slot.setSelectedTab(this);
		} else {
			let preferred = this.controller.getPreferredPosition();
			let sidebar: TabSlotContainer;
			switch (preferred) {
				case SidebarTabPosition.LEFT:
					sidebar = this.manager.getLeftSideBar();
					break;
				case SidebarTabPosition.RIGHT:
					sidebar = this.manager.getRightSideBar();
					break;
			}
			sidebar.createSlot(this)?.setOpen(true);
		}
	}
}