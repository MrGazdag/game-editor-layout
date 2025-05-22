"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
const SidebarTabPosition_1 = require("../sidebar/SidebarTabPosition");
const SidebarRenderer_1 = __importDefault(require("./SidebarRenderer"));
class SidebarContainerRenderer extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return react_2.default.createElement("div", { className: `side_bar ${this.props.position == SidebarTabPosition_1.SidebarTabPosition.LEFT ? "left_tabs" : "right_tabs"}` }, this.getSideBarTabs().map(tab => react_2.default.createElement(SidebarRenderer_1.default, { key: tab.getId(), tab: tab })));
    }
    getSideBarTabs() {
        return this.props.manager.getSideBarTabEntries(this.props.position);
    }
}
exports.default = SidebarContainerRenderer;
