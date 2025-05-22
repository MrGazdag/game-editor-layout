import EditorAction from "../action/EditorAction";
import {SideBarTabPosition} from "./SideBarTabPosition";

export default class SideBarTabEntry {
	private readonly id: string;
	private readonly name: string;
	private readonly position: SideBarTabPosition;
	private readonly openIcon: string | null;
	private readonly closedIcon: string | null;
	private open: boolean;
	private stateCallback: (open: boolean) => void;

	constructor(id: string, name: string, options?: Partial<SideBarTabEntryOptions>) {
		this.id = id;
		this.name = name;
		this.position = options?.position ?? SideBarTabPosition.LEFT;
		this.open = options?.openByDefault ?? false;
		this.openIcon = options?.icons?.open ?? null;
		this.closedIcon = options?.icons?.closed ?? null;
		this.stateCallback = ()=>{};
	}

	setStateCallback(stateCallback: (open: boolean) => void) {
		this.stateCallback = stateCallback;
	}

	setTabState(state: boolean) {
		this.open = state;
		this.stateCallback(state);
	}

	getActiveIcon() {
		return (this.isOpen() ? this.getOpenIcon() : this.getClosedIcon());
	}

	isOpen() {
		return this.open;
	}

	getOpenIcon() {
		return this.openIcon ?? "";
	}

	getClosedIcon() {
		return this.closedIcon ?? "";
	}

	getId() {
		return this.id;
	}

	getName() {
		return this.name;
	}

	getPosition() {
		return this.position;
	}
}

export interface SideBarTabEntryOptions {
	position: SideBarTabPosition,
	openByDefault: boolean,
	icons: {
		open: string,
		closed: string
	}
}