import EditorLayoutManager from "game-editor-layout/EditorLayoutManager";
import Keybind from "game-editor-layout/keybinds/Keybind";

export function registerTopBar(manager: EditorLayoutManager) {
    manager.createTopBarEntry("file", "File");
    manager.createTopBarEntry("edit", "Edit");
    manager.createTopBarEntry("view", "View");
}

export function registerActions(manager: EditorLayoutManager) {
    let fileBar = manager.getTopBarEntry("file")!;
    fileBar.addAction(manager.createAction({
        id: "new",
        name:"New",
        description: "What is this?",
        action: () => {
            alert("New File Dialog");
        }
    }));
    fileBar.addAction(manager.createAction({
        id: "open",
        name: "Open",
        description: "What is this?",
        action: () => {
            alert("Open File Dialog");
        }
    }));

    fileBar.addAction(manager.createAction({
        id: "save",
        name: "Save",
        description: "What is this?",
        action: () => {
            alert("Save File Dialog");
        }
    }));

    let editBar = manager.getTopBarEntry("edit")!;
    editBar.addAction(manager.createAction({
        id: "cut",
        name: "Cut",
        description: "What is this?",
        icon: "scissors-solid",
        action: () => {
            alert("Cut Action");
        }
    }));

    editBar.addAction(manager.createAction({
        id: "copy",
        name: "Copy",
        description: "What is this?",
        icon: "copy-regular",
        action: () => {
            alert("Copy Action");
        }
    }));

    editBar.addAction(manager.createAction({
        id: "paste",
        name: "Paste",
        description: "What is this?",
        icon: "clipboard-regular",
        action: () => {
            alert("Paste Action");
        }
    }));
    manager.getKeybindManager().addBind(new Keybind("KeyN", "new", true));
    manager.getKeybindManager().addBind(new Keybind("KeyO", "open", true));
    manager.getKeybindManager().addBind(new Keybind("KeyS", "save", true));

    manager.getKeybindManager().addBind(new Keybind("KeyX", "cut", true));
    manager.getKeybindManager().addBind(new Keybind("KeyC", "copy", true));
    manager.getKeybindManager().addBind(new Keybind("KeyV", "paste", true));

    let viewBar = manager.getTopBarEntry("view")!;
    viewBar.addAction(manager.createAction({
        id: "nothing",
        name: "Nothing here",
        description: "",
        action: () => {
            alert("szis");
        }
    }));
    manager.getKeybindManager().addBind(new Keybind("KeyG", "nothing", true, true, true, true));
    //testBar.addAction(testAction);
}