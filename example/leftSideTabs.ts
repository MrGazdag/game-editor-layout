import EditorLayoutManager from "game-editor-layout/EditorLayoutManager";
import {SideBarTabPosition} from "game-editor-layout/sidebar/SideBarTabPosition";

export function registerLeftSideTabs(manager: EditorLayoutManager) {
	manager.createSideBarTabEntry("tools", "Tools", {
		position: SideBarTabPosition.LEFT,
		openByDefault: true,
		icons: {open: "arrow-up", closed: "arrow-down"}
	});
	manager.createSideBarTabEntry("settings", "Settings", {
		position: SideBarTabPosition.LEFT,
		openByDefault: false,
		icons: {open: "arrow-up", closed: "arrow-down"}
	});
}

export function registerRightSideTabs(manager: EditorLayoutManager) {
	manager.createSideBarTabEntry("testing", "Testing", {
		position: SideBarTabPosition.RIGHT,
	});
	manager.createSideBarTabEntry("colors", "Colors", {
		position: SideBarTabPosition.RIGHT,
	});
	manager.createSideBarTabEntry("clipboard", "Clipboard", {
		position: SideBarTabPosition.RIGHT,
	});
}