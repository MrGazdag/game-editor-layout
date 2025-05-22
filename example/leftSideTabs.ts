import EditorLayoutManager from "game-editor-layout/EditorLayoutManager";
import { SidebarTabPosition } from "game-editor-layout/sidebar/SidebarTabPosition";

export function registerLeftSideTabs(manager: EditorLayoutManager) {
	manager.createSideBarTabEntry("tools", "Tools", {
		position: SidebarTabPosition.LEFT,
		openByDefault: true,
		icons: {open: "arrow-up", closed: "arrow-down"}
	});
	manager.createSideBarTabEntry("settings", "Settings", {
		position: SidebarTabPosition.LEFT,
		openByDefault: false,
		icons: {open: "arrow-up", closed: "arrow-down"}
	});
}

export function registerRightSideTabs(manager: EditorLayoutManager) {
	manager.createSideBarTabEntry("testing", "Testing", {
		position: SidebarTabPosition.RIGHT,
	});
	manager.createSideBarTabEntry("colors", "Colors", {
		position: SidebarTabPosition.RIGHT,
	});
	manager.createSideBarTabEntry("clipboard", "Clipboard", {
		position: SidebarTabPosition.RIGHT,
	});
}