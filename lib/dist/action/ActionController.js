"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = __importDefault(require("../controller/Controller"));
class ActionController extends Controller_1.default {
    constructor(id, options, action) {
        super(DefaultActionData, Object.assign({ name: id !== null ? id : "Inline Action" }, options));
        this.id = id;
        this.callback = action;
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
    runAction(source) {
        let p = this.callback(source);
        if (p === undefined)
            return Promise.resolve();
        return p;
    }
}
exports.default = ActionController;
const DefaultActionData = {
    name: "Action",
    description: "",
    icon: null
};
