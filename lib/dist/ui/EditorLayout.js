"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedEditorLayoutManager = exports.SharedEditorLayout = void 0;
const react_1 = __importStar(require("react"));
const ContextMenuRenderer_1 = __importDefault(require("./ContextMenuRenderer"));
const TopBarRenderer_1 = __importDefault(require("./TopBarRenderer"));
const ContextMenuInitiator_1 = __importDefault(require("./ContextMenuInitiator"));
const SidebarTabPosition_1 = require("../sidebar/SidebarTabPosition");
const SidebarContainerRenderer_1 = __importDefault(require("./SidebarContainerRenderer"));
class EditorLayout extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.contextMenuClickHandler = (e) => {
            this.showContextMenu(undefined);
        };
    }
    componentDidMount() {
        addEventListener("click", this.contextMenuClickHandler);
    }
    componentWillUnmount() {
        removeEventListener("click", this.contextMenuClickHandler);
    }
    render() {
        var _a;
        return react_1.default.createElement("div", { className: "editor_layout" },
            react_1.default.createElement(exports.SharedEditorLayout.Provider, { value: this },
                react_1.default.createElement(exports.SharedEditorLayoutManager.Provider, { value: this.props.manager },
                    react_1.default.createElement(TopBarRenderer_1.default, { manager: this.props.manager, renderer: this, icon: (_a = this.props.editorIcon) !== null && _a !== void 0 ? _a : "" }),
                    react_1.default.createElement("div", { className: "content" },
                        react_1.default.createElement(SidebarContainerRenderer_1.default, { manager: this.props.manager, position: SidebarTabPosition_1.SidebarTabPosition.LEFT }),
                        react_1.default.createElement("div", { className: "main_editors" },
                            react_1.default.createElement(ContextMenuInitiator_1.default, { menuProvider: (e) => {
                                    console.log("Main Content Click");
                                    let entry = this.props.manager.getTopBarEntry("edit");
                                    let inlineAction = this.props.manager.createAction(() => {
                                        alert("helo inline action");
                                    });
                                    return [...entry.getActions(), inlineAction];
                                } },
                                react_1.default.createElement("div", { style: {
                                        backgroundColor: "red",
                                        position: "relative",
                                        top: "100px",
                                        left: "150px",
                                        width: "200px",
                                        height: "100px"
                                    } },
                                    react_1.default.createElement(ContextMenuInitiator_1.default, { menuProvider: (e) => {
                                            let innerAction = this.props.manager.createAction(() => {
                                                alert("helo belső");
                                            }, {
                                                name: "Belső Action"
                                            });
                                            return [innerAction];
                                        } })))),
                        react_1.default.createElement(SidebarContainerRenderer_1.default, { manager: this.props.manager, position: SidebarTabPosition_1.SidebarTabPosition.RIGHT })),
                    react_1.default.createElement("div", { className: "bottombar" }),
                    this.state.contextMenu ?
                        react_1.default.createElement(ContextMenuRenderer_1.default, { renderer: this, menu: this.state.contextMenu }) : null)));
    }
    showContextMenu(contextMenu) {
        if (this.state.contextMenu) {
            this.state.contextMenu.setOpen(false);
        }
        contextMenu === null || contextMenu === void 0 ? void 0 : contextMenu.setOpen(true);
        this.setState(Object.assign(Object.assign({}, this.state), { contextMenu: contextMenu }));
    }
}
exports.default = EditorLayout;
exports.SharedEditorLayout = react_1.default.createContext(null);
exports.SharedEditorLayoutManager = react_1.default.createContext(null);
