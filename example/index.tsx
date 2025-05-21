import {createRoot} from "react-dom/client";
import EditorLayoutManager from "game-editor-layout/EditorLayoutManager";
import {StrictMode} from "react";
import "game-editor-layout/defaultStyle";
import "game-editor-layout/defaultTheme";
import EditorLayout from "game-editor-layout/ui/EditorLayout";
import "./index.scss";
import {registerActions, registerTopBar} from "./topBarActions";
import {loadSvgIcons} from "./IconTypes";

let manager = new EditorLayoutManager();

loadSvgIcons();
registerTopBar(manager);
registerActions(manager);

const root = createRoot(document.getElementById("root")!);
root.render(
    <StrictMode>
        <EditorLayout manager={manager}/>
    </StrictMode>
);