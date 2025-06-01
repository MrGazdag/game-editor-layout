import EditorLayoutManager from "game-editor-layout/EditorLayoutManager";
import Keybind from "game-editor-layout/keybinds/Keybind";
import ActionController from "game-editor-layout/action/ActionController";
import EditorAction from "game-editor-layout/action/EditorAction";
import {registerClock} from "./clock";

export function registerMenuBar(manager: EditorLayoutManager) {
    let menuBar = manager.getMenuBarManager();
    menuBar.createMenuBarEntry("file", "File");
    menuBar.createMenuBarEntry("edit", "Edit");
    menuBar.createMenuBarEntry("view", "View");
}

export function registerActions(manager: EditorLayoutManager) {
    let actions = manager.getActionManager();
    let menuBar = manager.getMenuBarManager();
    let fileBar = menuBar.getMenuBarEntry("file")!;
    fileBar.addEntry(actions.createAction({
        id: "new",
        name:"New",
        description: "What is this?",
        action: () => {
            alert("New File Dialog");
        }
    }));
    fileBar.addEntry(actions.createAction({
        id: "open",
        name: "Open",
        description: "What is this?",
        action: () => {
            alert("Open File Dialog");
        }
    }));

    fileBar.addEntry(actions.createAction({
        id: "save",
        name: "Save",
        description: "What is this?",
        action: () => {
            alert("Save File Dialog");
        }
    }));

    let editBar = menuBar.getMenuBarEntry("edit")!;
    editBar.addEntry([
        actions.createAction({
            id: "cut",
            name: "Cut",
            description: "What is this?",
            icon: "scissors-solid",
            action: () => {
                alert("Cut Action");
            }
        }),
        actions.createAction({
            id: "copy",
            name: "Copy",
            description: "What is this?",
            icon: "copy-regular",
            action: () => {
                alert("Copy Action");
            }
        }),
        actions.createAction({
            id: "paste",
            name: "Paste",
            description: "What is this?",
            icon: "clipboard-regular",
            subMenu: [
                actions.createAction({
                    id: "paste-no-format",
                    name: "Paste without formatting",
                    description: "What is this?",
                    icon: "clipboard-regular",
                    action: () => {
                        alert("Paste No Format Action");
                    }
                })
            ],
            action: () => {
                alert("Paste Action");
            }
        })
    ]);
    editBar.addEntry(actions.createAction({
        id: "delete",
        name: "Delete",
        description: "What is this?",
        icon: "x",
        action: () => {
            alert("Delete Action");
        }
    }));
    let keybinds = manager.getKeybindManager();
    keybinds.addBind(new Keybind("KeyN", "new", true));
    keybinds.addBind(new Keybind("KeyO", "open", true));
    keybinds.addBind(new Keybind("KeyS", "save", true));

    keybinds.addBind(new Keybind("KeyX", "cut", true));
    keybinds.addBind(new Keybind("KeyC", "copy", true));
    keybinds.addBind(new Keybind("KeyV", "paste", true));
    keybinds.addBind(new Keybind("KeyV", "paste-no-format", true, true));
    keybinds.addBind(new Keybind("Delete", "delete"));

    let viewBar = menuBar.getMenuBarEntry("view")!;
    viewBar.addEntry(actions.createAction({
        id: "nothing",
        name: "Nothing here",
        description: "",
        action: () => {
            alert("szis");
        }
    }));
    keybinds.addBind(new Keybind("KeyG", "nothing", true, true, true, true));
    //testBar.addAction(testAction);
    let controller = new ActionController({
        id: "time",
        name: "Dynamic Action",
        action: ()=>{
            alert("The time has not been set yet.");
        }
    });
    viewBar.addEntry(actions.createAction(controller));
    registerClock((icon,time)=>{
        controller.updateData({
            name: "Dynamic Action - " + time,
            icon: icon,
            action: ()=>{
                alert("The time is: " + time);
            }
        })
    });

    viewBar.addEntry(actions.createAction({
        id: "nothing",
        name: "Nothing action",
        icon: "arrow-up"
    }));
    viewBar.addEntry(actions.createAction({
        id: "submenu",
        name: "Sub Menu",
        icon: "arrow-down",
        subMenu: [
            EditorAction.inline("One", ()=>{alert("sub 1!")}),
            EditorAction.inline({
                name: "Disabled Two",
                action: ()=>{alert("sub 2!")},
                enabled: false
            }),
            EditorAction.inline("Nothing Three"),
            EditorAction.inline({
                name: "Long Sub Menu Test 1",
                action: ()=>{alert("long sub 1")},
                subMenu: [EditorAction.inline("Dummy"),EditorAction.inline({
                    name: "Long Sub Menu Test 2",
                    action: ()=>{alert("long sub 2")},
                    subMenu: [EditorAction.inline("Dummy"),EditorAction.inline("Dummy"),EditorAction.inline({
                        name: "Long Sub Menu Test 3",
                        action: ()=>{alert("long sub 3")},
                        subMenu: [EditorAction.inline("Dummy"),EditorAction.inline("Dummy"),EditorAction.inline("Dummy"),EditorAction.inline({
                            name: "Long Sub Menu Test 4",
                            action: ()=>{alert("long sub 4")},
                            subMenu: [EditorAction.inline("Dummy"),EditorAction.inline("Dummy"),EditorAction.inline("Dummy"),EditorAction.inline("Dummy"),EditorAction.inline({
                                name: "Long Sub Menu Test 5",
                                action: ()=>{alert("long sub 5")},
                                subMenu: [EditorAction.inline("Dummy"),EditorAction.inline("Dummy"),EditorAction.inline("Dummy"),EditorAction.inline("Dummy"),EditorAction.inline("Dummy"),EditorAction.inline({
                                    name: "Long Sub Menu Test 6",
                                    action: ()=>{alert("long sub 6")},
                                    subMenu: [EditorAction.inline("Dummy"), EditorAction.inline("Dummy"), EditorAction.inline("Dummy"), EditorAction.inline("Dummy"), EditorAction.inline("Dummy"), EditorAction.inline("Dummy"), EditorAction.inline({
                                        name: "Long Sub Menu Test 7",
                                        action: ()=>{alert("long sub 7")},
                                    })]
                                }),EditorAction.inline("Dummy")],
                            }),EditorAction.inline("Dummy"),EditorAction.inline("Dummy")],
                        }),EditorAction.inline("Dummy"),EditorAction.inline("Dummy"),EditorAction.inline("Dummy")],
                    }),EditorAction.inline("Dummy"),EditorAction.inline("Dummy"),EditorAction.inline("Dummy"),EditorAction.inline("Dummy")],
                }),EditorAction.inline("Dummy"),EditorAction.inline("Dummy"),EditorAction.inline("Dummy"),EditorAction.inline("Dummy"),EditorAction.inline("Dummy")],
            }),
        ]
    }));
    
}