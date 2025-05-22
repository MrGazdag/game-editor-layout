"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = __importDefault(require("../controller/Controller"));
class SidebarTabController extends Controller_1.default {
    constructor(id, options) {
        super(DefaultSidebarTabData, Object.assign(Object.assign({}, (id !== null ? { name: id } : null)), options));
        this.id = id;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.data.name;
    }
    getDescription() {
        return this.data.description;
    }
    getIcon() {
        return this.data.icon;
    }
}
exports.default = SidebarTabController;
const DefaultSidebarTabData = {
    name: "Sidebar Tab",
    description: "",
    icon: null
};
