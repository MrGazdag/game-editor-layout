import EditorLayoutManager from "game-editor-layout/EditorLayoutManager";

export function registerTopBar(manager: EditorLayoutManager) {
    manager.createTopBarEntry("file", "File");
    manager.createTopBarEntry("edit", "Edit");
    manager.createTopBarEntry("view", "View");
}

export function registerActions(manager: EditorLayoutManager) {
    let fileBar = manager.getTopBarEntry("file");
    fileBar.addAction(manager.createAction("new", {name:"New", description: "What is this?"}, () => {
       alert("Szi");
    }));
    fileBar.addAction(manager.createAction("open", {name:"Open", description: "What is this?"}, () => {
        alert("Szi");
    }));
    fileBar.addAction(manager.createAction("save", {name:"Save", description: "What is this?"}, () => {
        alert("Szi");
    }));

    let editBar = manager.getTopBarEntry("edit");
    editBar.addAction(manager.createAction("cut", {name:"Cut", description: "What is this?", icon: "scissors-solid"}, () => {
        alert("Szi");
    }));
    editBar.addAction(manager.createAction("copy", {name:"Copy", description: "What is this?", icon: "copy-regular"}, () => {
        alert("Szi");
    }));
    editBar.addAction(manager.createAction("paste", {name:"Paste", description: "What is this?", icon: "clipboard-regular"}, () => {
        alert("Szi");
    }));
    manager.addKeybind("cut", "Ctrl+X");

    let viewBar = manager.getTopBarEntry("view");

    //testBar.addAction(testAction);
}