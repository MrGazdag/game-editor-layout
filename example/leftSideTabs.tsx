import EditorLayoutManager from "game-editor-layout/EditorLayoutManager";
import { SidebarTabPosition } from "game-editor-layout/sidebar/SidebarTabPosition";
import React from "react";

export function registerLeftSideTabs(manager: EditorLayoutManager) {
	manager.createSidebarTabEntry({
		id: "tools",
		name: "Tools",
		icon: "screwdriver-wrench-solid",
		preferredPosition: SidebarTabPosition.LEFT,
		renderer: ()=>{
			return <div>tyű de sok túl</div>;
		}
	});
	manager.createSidebarTabEntry({
		id: "settings",
		name: "Settings",
		preferredPosition: SidebarTabPosition.LEFT,
		renderer: ()=>{
			return <div>beállok mingyá</div>;
		}
	});
}

export function registerRightSideTabs(manager: EditorLayoutManager) {
	manager.createSidebarTabEntry({
		id: "testing",
		name: "Testing",
		preferredPosition: SidebarTabPosition.RIGHT,
		renderer: ()=>{
			return <div>teszting e he?</div>;
		}
	});
	manager.createSidebarTabEntry({
		id: "colors",
		name: "Colors",
		preferredPosition: SidebarTabPosition.RIGHT,
		renderer: ()=>{
			return <div>szép
				<span style={{color: "#ff0000"}}>s</span>
				<span style={{color: "#fffb00"}}>z</span>
				<span style={{color: "#00ff04"}}>í</span>
				<span style={{color: "#00bbff"}}>n</span>
				<span style={{color: "#a100ff"}}>e</span>
				<span style={{color: "#ff00dd"}}>s</span>
			</div>;
		}
	});
	manager.createSidebarTabEntry({
		id: "clipboard",
		name: "Clipboard",
		preferredPosition: SidebarTabPosition.RIGHT,
		renderer: ()=>{
			return <div>klippentyű</div>
		}
	});
}