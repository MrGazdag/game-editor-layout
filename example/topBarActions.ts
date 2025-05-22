import EditorLayoutManager from "game-editor-layout/EditorLayoutManager";
import Keybind from "game-editor-layout/keybinds/Keybind";

export function registerTopBar(manager: EditorLayoutManager) {
    manager.createTopBarEntry("file", "File");
    manager.createTopBarEntry("edit", "Edit");
    manager.createTopBarEntry("view", "View");
}

export function registerActions(manager: EditorLayoutManager) {
    let fileBar = manager.getTopBarEntry("file")!;
    fileBar.addAction(manager.createAction(() => {
        alert("New File Dialog");
    }, "new", {name:"New", description: "What is this?"}));
    fileBar.addAction(manager.createAction(() => {
        alert("Open File Dialog");
    }, "open", {name:"Open", description: "What is this?"}));
    fileBar.addAction(manager.createAction(() => {
        alert("Save File Dialog");
    }, "save", {name:"Save", description: "What is this?"}));

    let editBar = manager.getTopBarEntry("edit")!;
    editBar.addAction(manager.createAction(() => {
        alert("Cut Action");
    }, "cut", {name:"Cut", description: "What is this?", icon: "scissors-solid"}));
    editBar.addAction(manager.createAction(() => {
        alert("Copy Action");
    }, "copy", {name:"Copy", description: "What is this?", icon: "copy-regular"}));
    editBar.addAction(manager.createAction(() => {
        alert("Paste Action");
    }, "paste", {name:"Paste", description: "What is this?", icon: "clipboard-regular"}));
    manager.getKeybindManager().addBind(new Keybind("KeyN", "new", true));
    manager.getKeybindManager().addBind(new Keybind("KeyO", "open", true));
    manager.getKeybindManager().addBind(new Keybind("KeyS", "save", true));

    manager.getKeybindManager().addBind(new Keybind("KeyX", "cut", true));
    manager.getKeybindManager().addBind(new Keybind("KeyC", "copy", true));
    manager.getKeybindManager().addBind(new Keybind("KeyV", "paste", true));

    let viewBar = manager.getTopBarEntry("view")!;
    viewBar.addAction(manager.createAction(() => {
        alert("szis");
    }, "nothing", {name: "Nothing here", description: ""}))
    manager.getKeybindManager().addBind(new Keybind("KeyG", "nothing", true, true, true, true));
    //testBar.addAction(testAction);
}