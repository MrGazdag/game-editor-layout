import EditorAction from "../action/EditorAction";
import {SidebarTabPosition} from "./SidebarTabPosition";
import EditorLayoutManager from "../EditorLayoutManager";
import SidebarTabController from "./SidebarTabController";

export default class SidebarTabEntry {
	#manager: EditorLayoutManager;
	#controller: SidebarTabController;
	private position: SidebarTabPosition;
	private open: boolean;
	private stateCallback: (open: boolean) => void;

	constructor(manager: EditorLayoutManager, controller: SidebarTabController) {
		this.#manager = manager;
		this.#controller = controller;

		this.position = this.#controller.getPreferredPosition();
		this.open = false;
		this.stateCallback = ()=>{};
	}

	setStateCallback(stateCallback: (open: boolean) => void) {
		this.stateCallback = stateCallback;
	}

	setTabState(state: boolean) {
		this.open = state;
		this.stateCallback(state);
	}

	isOpen() {
		return this.open;
	}

	getIcon() {
		return this.#controller.getIcon();
	}

	getId() {
		return this.#controller.getId();
	}

	getName() {
		return this.#controller.getName();
	}

	getPosition() {
		return this.position;
	}

	render() {
		return this.#controller.render();
	}
}