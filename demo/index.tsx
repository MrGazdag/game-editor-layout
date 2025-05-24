import {createRoot} from "react-dom/client";
import EditorLayoutManager from "game-editor-layout/EditorLayoutManager";
import {StrictMode} from "react";
import "game-editor-layout/defaultStyle";
import "game-editor-layout/defaultTheme";
import "game-editor-layout/defaultIcons";
import EditorLayout from "game-editor-layout/ui/EditorLayout";
import "./index.scss";
import {registerActions, registerMenuBar} from "./menuBarActions";
import {loadSvgIcons} from "./IconTypes";
import {registerLeftSideTabs, registerRightSideTabs} from "./leftSideTabs";
import React from "react";

let manager = new EditorLayoutManager();

loadSvgIcons();
//top
registerMenuBar(manager);
registerActions(manager);
//left
registerLeftSideTabs(manager);
registerRightSideTabs(manager);

const root = createRoot(document.getElementById("root")!);
root.render(
    <StrictMode>
        <EditorLayout manager={manager} editorIcon={"test-logo"}/>
    </StrictMode>
);