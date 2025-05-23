import EditorLayoutManager from "game-editor-layout/EditorLayoutManager";
import { SidebarTabPosition } from "game-editor-layout/sidebar/SidebarTabPosition";
import React from "react";
import TextInput from "./customComponents/TextInput";
import AllIconRenderer from "./customComponents/AllIconRenderer";

export function registerLeftSideTabs(manager: EditorLayoutManager) {
	manager.createSidebarTabEntry({
		id: "tools",
		name: "Tools",
		icon: "screwdriver-wrench-solid",
		preferredPosition: SidebarTabPosition.LEFT,
		renderer: () => {
			return <TextInput placeholder={"írjá valamit"} onChange={(e) => {
				console.log(e.target.value);
			}}/>
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
		id: "all_icons",
		name: "All Icons",
		preferredPosition: SidebarTabPosition.RIGHT,

		renderer: ()=>{
			return <AllIconRenderer/>;
		}
		//because blud removed openByDefault
	}).setTabState(true);
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
		id: "video_player",
		name: "Video Player",
		preferredPosition: SidebarTabPosition.RIGHT,
		renderer: ()=> {
			return <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dEQOo5lpb0M?si=3KtTdIhO9n7I4Qy3"
			               title="YouTube video player"
			               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			               referrerPolicy="strict-origin-when-cross-origin"
			               allowFullScreen></iframe>
		}
	});
}