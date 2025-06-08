import TabEntry from "../TabEntry";
import TabManager from "../TabManager";
import EditorTabController from "./EditorTabController";

export default class EditorTabEntry extends TabEntry<EditorTabController> {
	private readonly manager: TabManager;
	constructor(manager: TabManager, controller: EditorTabController) {
		super(controller);
		this.manager = manager;
	}

	public getManager() {
		return this.manager;
	}

	public getURI() {
		return this.controller.getURI();
	}

	show() {
		this.manager.showEditorTab(this.getURI());
	}
}