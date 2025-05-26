import EditorLayoutManager from "../EditorLayoutManager";
import ActionGroup from "../action/ActionGroup";
import ActionGroupController from "../action/ActionGroupController";
import TabManager from "../tab/TabManager";
import EditorAction from "../action/EditorAction";

export default class MenuBarWindowExtension {
    private static updateList(controller: ActionGroupController, manager: EditorLayoutManager) {
        let sidebarTabs = manager.getTabManager().getSidebarTabs();
        sidebarTabs.sort((a,b)=>a.getName().localeCompare(b.getName()));

        // TODO listen for updates on tab changes, maybe don't rebuild the entire list
        //      every time something changes? better event handlers?
        controller.set(...sidebarTabs.map(t=>EditorAction.inline({
            name: t.getName(),
            icon: t.getIcon(),
            action: ()=>t.show()
        })));
    }
    public static create(manager: EditorLayoutManager) {
        let controller = new ActionGroupController();
        let group = new ActionGroup(controller);
        manager.getTabManager().getChangeHandler().add(()=>{
            this.updateList(controller, manager);
        });
        this.updateList(controller, manager);
        return group;
    }
    public static enable(manager: EditorLayoutManager) {
        let entry = manager.getMenuBarManager().createMenuBarEntry("window", "Window");
        entry.addEntry(this.create(manager));
    }
}