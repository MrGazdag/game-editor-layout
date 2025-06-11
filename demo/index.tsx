import {createRoot} from "react-dom/client";
import EditorLayoutManager from "game-editor-layout/EditorLayoutManager";
import React, {StrictMode} from "react";
import "game-editor-layout/defaultStyle";
import "game-editor-layout/defaultTheme";
import "game-editor-layout/defaultIcons";
import "./index.scss";
import {registerActions, registerMenuBar} from "./menuBarActions";
import {loadSvgIcons} from "./IconTypes";
import {registerLeftSideTabs, registerRightSideTabs} from "./sidebarTabs";
import MenuBarWindowExtension from "game-editor-layout/extensions/MenuBarWindowExtension";
import EditorTabEntry from "game-editor-layout/tab/editor/EditorTabEntry";
import EditorTabController from "game-editor-layout/tab/editor/EditorTabController";
import Icon from "game-editor-layout/ui/common/Icon";
import EditorLayoutRenderer from "game-editor-layout/ui/EditorLayoutRenderer";

// For debugging purposes where the devtools is not possible
window.onerror = function(message, source, lineno, colno, error) {
    document.body.innerHTML += `<div style="position:fixed;bottom:0;left:0;background:red;color:white;padding:10px;z-index:9999">
      ${message}<br>${source}:${lineno}:${colno}
    </div>`;
};

let manager = new EditorLayoutManager({
    tab: {
        editorTabOpener: (m,uri)=>{
            if (uri.startsWith("test-icon-tabs://")) {
                let icon = uri.substring("test-icon-tabs://".length);
                return new EditorTabEntry(m, new EditorTabController({
                    uri: uri,
                    icon: icon,
                    name: "Icon: " + icon,
                    renderer: ()=>{
                        return <div><Icon icon={icon}/></div>
                    }
                }));
            }
            return null;
        }
    }
});

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
        <EditorLayoutRenderer manager={manager} editorIcon={"test-logo"} dev={true}/>
    </StrictMode>
);