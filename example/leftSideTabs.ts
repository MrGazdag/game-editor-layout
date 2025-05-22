import EditorLayoutManager from "game-editor-layout/EditorLayoutManager";
import { SidebarTabPosition } from "game-editor-layout/sidebar/SidebarTabPosition";

export function registerLeftSideTabs(manager: EditorLayoutManager) {
	manager.createSidebarTabEntry({
		id: "tools",
		name: "Tools",
		icon: "screwdriver-wrench-solid",
		preferredPosition: SidebarTabPosition.LEFT,
	});
	manager.createSidebarTabEntry({
		id: "settings",
		name: "Settings",
		preferredPosition: SidebarTabPosition.LEFT
	});
}

export function registerRightSideTabs(manager: EditorLayoutManager) {
	manager.createSidebarTabEntry({
		id: "testing",
		name: "Testing",
		preferredPosition: SidebarTabPosition.RIGHT
	});
	manager.createSidebarTabEntry({
		id: "colors",
		name: "Colors",
		preferredPosition: SidebarTabPosition.RIGHT,
	});
	manager.createSidebarTabEntry({
		id: "clipboard",
		name: "Clipboard",
		preferredPosition: SidebarTabPosition.RIGHT,
	});
}