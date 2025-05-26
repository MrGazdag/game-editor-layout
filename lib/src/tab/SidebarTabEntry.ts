import SidebarTabController from "./SidebarTabController";
import TabEntry from "./TabEntry";
import TabManager from "./TabManager";
import {SidebarTabPosition} from "./SidebarTabPosition";
import TabSlotContainer from "./TabSlotContainer";

export default class SidebarTabEntry extends TabEntry<SidebarTabController> {
	constructor(manager: TabManager, controller: SidebarTabController) {
		super(manager, controller);
	}

	getId() {
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
					sidebar = this.getManager().getLeftSideBar();
					break;
				case SidebarTabPosition.RIGHT:
					sidebar = this.getManager().getRightSideBar();
					break;
			}
			sidebar.createSlot(this)?.setOpen(true);
		}
	}
}