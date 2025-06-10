import SidebarTabController from "./SidebarTabController";
import TabEntry from "../TabEntry";
import TabManager from "../TabManager";

export default class SidebarTabEntry extends TabEntry<SidebarTabController> {
	private readonly manager: TabManager;
	constructor(manager: TabManager, controller: SidebarTabController) {
		super(controller);
		this.manager = manager;
	}

	public getManager() {
		return this.manager;
	}

	show() {
		let slot = this.getSlot();
		if (slot !== null) {
			// Tab is already visible, focus it
			// TODO properly focus tab
			slot.setSelectedTab(this);
		} else {
			let preferred = this.controller.getPreferredPosition();
			let defaultWindow = this.manager.getParent().getWindowManager().getDefaultWindow();
			let sidebar = defaultWindow.getSidebarTabContainerOrFallback(preferred);
			sidebar.addTabs(this);
			this.getSlot()!.setSelectedTab(this);
		}
	}
}