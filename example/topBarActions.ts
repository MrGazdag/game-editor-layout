import EditorLayoutManager from "game-editor-layout/EditorLayoutManager";
import Keybind from "game-editor-layout/keybinds/Keybind";

export function registerTopBar(manager: EditorLayoutManager) {
    manager.createTopBarEntry("file", "File");
    manager.createTopBarEntry("edit", "Edit");
    manager.createTopBarEntry("view", "View");
}

export function registerActions(manager: EditorLayoutManager) {
    let fileBar = manager.getTopBarEntry("file");
    fileBar.addAction(manager.createAction("new", {name:"New", description: "What is this?"}, () => {
       alert("New File Dialog");
    }));
    fileBar.addAction(manager.createAction("open", {name:"Open", description: "What is this?"}, () => {
        alert("Open File Dialog");
    }));
    fileBar.addAction(manager.createAction("save", {name:"Save", description: "What is this?"}, () => {
        alert("Save File Dialog");
    }));

    let editBar = manager.getTopBarEntry("edit");
    editBar.addAction(manager.createAction("cut", {name:"Cut", description: "What is this?", icon: "scissors-solid"}, () => {
        alert("Cut Action");
    }));
    editBar.addAction(manager.createAction("copy", {name:"Copy", description: "What is this?", icon: "copy-regular"}, () => {
        alert("Copy Action");
    }));
    editBar.addAction(manager.createAction("paste", {name:"Paste", description: "What is this?", icon: "clipboard-regular"}, () => {
        alert("Paste Action");
    }));
    manager.getKeybindManager().addBind(new Keybind("KeyN", "new", true));
    manager.getKeybindManager().addBind(new Keybind("KeyO", "open", true));
    manager.getKeybindManager().addBind(new Keybind("KeyS", "save", true));

    manager.getKeybindManager().addBind(new Keybind("KeyX", "cut", true));
    manager.getKeybindManager().addBind(new Keybind("KeyC", "copy", true));
    manager.getKeybindManager().addBind(new Keybind("KeyV", "paste", true));

    let viewBar = manager.getTopBarEntry("view");

    //testBar.addAction(testAction);
}