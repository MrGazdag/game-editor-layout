import EditorLayoutManager from "game-editor-layout/EditorLayoutManager";
import Keybind from "game-editor-layout/keybinds/Keybind";
import {SideBarTabPosition} from "game-editor-layout/sidebar/SideBarTabPosition";

export function registerLeftSideTabs(manager: EditorLayoutManager) {
	manager.createSideBarTabEntry("tools", "Tools", SideBarTabPosition.LEFT);
	manager.createSideBarTabEntry("settings", "Settings", SideBarTabPosition.LEFT);
}

export function registerRightSideTabs(manager: EditorLayoutManager) {
	manager.createSideBarTabEntry("testing", "Testing", SideBarTabPosition.RIGHT);
	manager.createSideBarTabEntry("colors", "Colors", SideBarTabPosition.RIGHT);
	manager.createSideBarTabEntry("clipboard", "Clipboard", SideBarTabPosition.RIGHT);
}