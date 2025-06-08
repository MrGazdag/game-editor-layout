import {createRoot} from "react-dom/client";
import EditorLayoutManager from "game-editor-layout/EditorLayoutManager";
import React, {StrictMode} from "react";
import "game-editor-layout/defaultStyle";
import "game-editor-layout/defaultTheme";
import "game-editor-layout/defaultIcons";
import EditorLayout from "game-editor-layout/ui/EditorLayout";
import "./index.scss";
import {registerActions, registerMenuBar} from "./menuBarActions";
import {loadSvgIcons} from "./IconTypes";
import {registerLeftSideTabs, registerRightSideTabs} from "./sidebarTabs";
import MenuBarWindowExtension from "game-editor-layout/extensions/MenuBarWindowExtension";

// For debugging purposes where the devtools is not possible
window.onerror = function(message, source, lineno, colno, error) {
    document.body.innerHTML += `<div style="position:fixed;bottom:0;left:0;background:red;color:white;padding:10px;z-index:9999">
      ${message}<br>${source}:${lineno}:${colno}
    </div>`;
};

let manager = new EditorLayoutManager();

loadSvgIcons();
//top
registerMenuBar(manager);
registerActions(manager);
//left
registerLeftSideTabs(manager);
registerRightSideTabs(manager);

MenuBarWindowExtension.enable(manager);

// For debugging purposes
(window as any)["manager"] = manager;

// Render with React
const root = createRoot(document.getElementById("root")!);
root.render(
    <StrictMode>
        <EditorLayout manager={manager} editorIcon={"test-logo"} dev={true}/>
    </StrictMode>
);