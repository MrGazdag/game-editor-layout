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
const ActionSource_1 = __importDefault(require("../action/ActionSource"));
const Icon_1 = __importDefault(require("./Icon"));
class TopBarRenderer extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    openMenu(t, e) {
        e.stopPropagation();
        let rect = e.currentTarget.getBoundingClientRect();
        let contextMenu = new ContextMenu_1.default("Top Bar", rect.left, rect.bottom, t.getActions(), ActionSource_1.default.TOP_BAR);
        this.props.renderer.showContextMenu(contextMenu);
        this.setState(Object.assign(Object.assign({}, this.state), { open: {
                entry: t,
                menu: contextMenu
            } }));
    }
    closeMenu() {
        this.props.renderer.showContextMenu(undefined);
        this.setState(Object.assign(Object.assign({}, this.state), { open: undefined }));
    }
    render() {
        return react_1.default.createElement("div", { className: "top_bar" },
            react_1.default.createElement(Icon_1.default, { icon: this.props.icon, className: "_icon" }),
            this.props.manager.getTopBarEntries().map(t => {
                var _a;
                let className = "_entry";
                if (((_a = this.state.open) === null || _a === void 0 ? void 0 : _a.entry) == t)
                    className += " _open";
                return react_1.default.createElement("div", { className: className, key: t.getId(), onMouseOver: e => {
                        // Only open on hover, when there is another menu open
                        if (this.state.open && this.state.open.menu.isOpen() && this.state.open.entry != t)
                            this.openMenu(t, e);
                    }, onClick: e => {
                        // If this menu is already open, close it
                        if (this.state.open && this.state.open.menu.isOpen() && this.state.open.entry == t)
                            this.closeMenu();
                        else
                            this.openMenu(t, e);
                    } }, t.getName());
            }));
    }
}
exports.default = TopBarRenderer;
