import EditorLayoutManager from "game-editor-layout/EditorLayoutManager";
import Keybind from "game-editor-layout/keybinds/Keybind";

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
    fileBar.addAction(actions.createAction({
        id: "new",
        name:"New",
        description: "What is this?",
        action: () => {
            alert("New File Dialog");
        }
    }));
    fileBar.addAction(actions.createAction({
        id: "open",
        name: "Open",
        description: "What is this?",
        action: () => {
            alert("Open File Dialog");
        }
    }));

    fileBar.addAction(actions.createAction({
        id: "save",
        name: "Save",
        description: "What is this?",
        action: () => {
            alert("Save File Dialog");
        }
    }));

    let editBar = menuBar.getMenuBarEntry("edit")!;
    editBar.addAction(actions.createAction({
        id: "cut",
        name: "Cut",
        description: "What is this?",
        icon: "scissors-solid",
        action: () => {
            alert("Cut Action");
        }
    }));

    editBar.addAction(actions.createAction({
        id: "copy",
        name: "Copy",
        description: "What is this?",
        icon: "copy-regular",
        action: () => {
            alert("Copy Action");
        }
    }));

    editBar.addAction(actions.createAction({
        id: "paste",
        name: "Paste",
        description: "What is this?",
        icon: "clipboard-regular",
        action: () => {
            alert("Paste Action");
        }
    }));
    let keybinds = manager.getKeybindManager();
    keybinds.addBind(new Keybind("KeyN", "new", true));
    keybinds.addBind(new Keybind("KeyO", "open", true));
    keybinds.addBind(new Keybind("KeyS", "save", true));

    keybinds.addBind(new Keybind("KeyX", "cut", true));
    keybinds.addBind(new Keybind("KeyC", "copy", true));
    keybinds.addBind(new Keybind("KeyV", "paste", true));

    let viewBar = menuBar.getMenuBarEntry("view")!;
    viewBar.addAction(actions.createAction({
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
        name: "Dynamic Action - " + getTime(),
        action: ()=>{
            alert("The time is: " + getTime());
        }
    });
    viewBar.addAction(actions.createAction(controller));
    setInterval(()=>{
        controller.updateData({
            name: "Dynamic Action - " + getTime()
        });
    }, 1000);
    
}
function getTime() {
    let date = new Date();
    return date.getHours().padStart(2, "0")
         + ":"
         date.getMinutes().padStart(2, "0")
         + ":"
         date.getSeconds().padStart(2, "0");
}