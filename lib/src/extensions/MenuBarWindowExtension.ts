import EditorLayoutManager from "../EditorLayoutManager";
import ActionGroup from "../action/ActionGroup";
import ActionGroupController from "../action/ActionGroupController";
import EditorAction from "../action/EditorAction";
import ActionController from "../action/ActionController";
import SidebarTabEntry from "../tab/sidebar/SidebarTabEntry";

export default class MenuBarWindowExtension {
    private static updateList(controller: ActionGroupController, manager: EditorLayoutManager, map: Map<SidebarTabEntry,Entry>) {
        let sidebarTabs = manager.getTabManager().getSidebarTabs();
        let oldKeys = [...map.keys()];
        for (let oldKey of oldKeys) {
            if (!sidebarTabs.includes(oldKey)) {
                let entry = map.get(oldKey)!;
                controller.remove(entry.entry);
                oldKey.getChangeHandler().remove(entry.handler);
                map.delete(oldKey);
            }
        }
        for (let tab of sidebarTabs) {
            if (map.has(tab)) continue;

            let actionController = new ActionController({
                id: "open_tab/" + tab.getUniqueIdentifier(),
                name: tab.getName(),
                icon: tab.getIcon(),
                action: ()=>tab.show()
            });
            let entry = EditorAction.inline(actionController);
            let result: Entry = {
                entry: entry,
                controller: actionController,
                handler: ()=>{actionController.updateData({
                    name: tab.getName(),
                    icon: tab.getIcon(),
                })}
            };

            tab.getChangeHandler().add(result.handler);
            controller.add(result.entry);
            controller.setSort();
            map.set(tab, result);
        }

        /*
        // TODO listen for updates on tab changes, maybe don't rebuild the entire list
        //      every time something changes? better event handlers?
        controller.set(...sidebarTabs.map(t=>EditorAction.inline({
            name: t.getName(),
            icon: t.getIcon(),
            action: ()=>t.show()
        })));
        */
    }
    public static create(manager: EditorLayoutManager) {
        let controller = new ActionGroupController();
        let group = new ActionGroup(controller);
        let map = new Map<SidebarTabEntry, Entry>();
        manager.getTabManager().getChangeHandler().add(()=>{
            this.updateList(controller, manager, map);
        });
        this.updateList(controller, manager, map);
        return group;
    }
    public static enable(manager: EditorLayoutManager) {
        let entry = manager.getMenuBarManager().createMenuBarEntry("window", "Window");
        entry.addEntry(this.create(manager));
    }
}
interface Entry {
    controller: ActionController,
    entry: EditorAction,
    handler: ()=>void
}