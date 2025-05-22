"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
const Icon_1 = __importDefault(require("./Icon"));
class SidebarRenderer extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.tab.isOpen()
        };
        props.tab.setStateCallback((open) => {
            this.setState(Object.assign(Object.assign({}, this.state), { open: open }));
        });
    }
    render() {
        let tab = this.props.tab;
        return react_2.default.createElement("div", { className: `sidebar_entry` },
            react_2.default.createElement("div", { className: "_control_bar" },
                react_2.default.createElement(Icon_1.default, { icon: tab.getActiveIcon() }),
                react_2.default.createElement("div", { key: "_name", className: "_name", onClick: () => {
                        tab.setTabState(!tab.isOpen());
                    } }, tab.getName()),
                react_2.default.createElement("div", { key: "_separator", className: "_separator" }),
                react_2.default.createElement("div", { key: "_close", className: "_close" }, "X")),
            react_2.default.createElement("div", { className: `_content ${(tab.isOpen() ? "" : " _closed")}` }, "CONTENT"));
    }
}
exports.default = SidebarRenderer;
