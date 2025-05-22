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
const react_1 = __importStar(require("react"));
const ContextMenu_1 = __importDefault(require("../context/ContextMenu"));
const EditorLayout_1 = require("./EditorLayout");
const ContextMenuMode_1 = __importDefault(require("../context/ContextMenuMode"));
const ActionSource_1 = __importDefault(require("../action/ActionSource"));
class ContextMenuInitiator extends react_1.Component {
    constructor(props) {
        super(props);
        this.parent = null;
    }
    openContextMenu(e, childActions) {
        var _a;
        let mode = (_a = this.props.mode) !== null && _a !== void 0 ? _a : ContextMenuMode_1.default.ADDITIVE;
        let actions = this.props.menuProvider(e);
        if (childActions)
            actions.push(...childActions);
        if (this.parent && mode == ContextMenuMode_1.default.ADDITIVE) {
            this.parent.openContextMenu(e, actions);
        }
        else {
            this.layout.showContextMenu(new ContextMenu_1.default("Context Menu", e.clientX, e.clientY, actions, ActionSource_1.default.CONTEXT_MENU));
        }
    }
    render() {
        return react_1.default.createElement(EditorLayout_1.SharedEditorLayout.Consumer, null, layout => {
            this.layout = layout;
            return react_1.default.createElement(ParentContextMenu.Consumer, null, parent => {
                this.parent = parent;
                return react_1.default.createElement(ParentContextMenu.Provider, { value: this },
                    react_1.default.createElement("div", { className: "context_menu_initiator", onContextMenu: e => {
                            e.preventDefault();
                            e.stopPropagation();
                            this.openContextMenu(e);
                        } }, this.props.children));
            });
        });
    }
}
exports.default = ContextMenuInitiator;
const ParentContextMenu = react_1.default.createContext(null);
