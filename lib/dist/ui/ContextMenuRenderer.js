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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Icon_1 = __importDefault(require("./Icon"));
const ActionSource_1 = __importDefault(require("../action/ActionSource"));
class ContextMenuRenderer extends react_1.Component {
    constructor(props) {
        super(props);
        this.ref = react_1.default.createRef();
        this.resizeHandler = (e) => {
            this.recalculatePos();
        };
    }
    componentDidMount() {
        addEventListener("resize", this.resizeHandler);
    }
    componentWillUnmount() {
        removeEventListener("resize", this.resizeHandler);
    }
    recalculatePos() {
        if (!this.ref.current)
            return;
        let menu = this.props.menu;
        let x = menu.getPosX();
        let y = menu.getPosY();
        // Reset height clipping (for top bar)
        this.ref.current.style.maxHeight = "none";
        let clip = this.ref.current.getBoundingClientRect();
        let w = clip.width;
        let h = clip.height;
        // TODO scroll?
        let iw = window.innerWidth;
        let ih = window.innerHeight;
        if (x + w > iw) {
            x = Math.max(iw - w, 0);
            this.ref.current.style.left = x + "px";
        }
        if (y + h > ih) {
            if (menu.getSource() == ActionSource_1.default.TOP_BAR) {
                // Cannot move further up, limit height
                this.ref.current.style.maxHeight = (ih - y) + "px";
            }
            else {
                y = Math.max(ih - h, 0);
                this.ref.current.style.top = y + "px";
            }
        }
    }
    render() {
        let className = "context_menu";
        let menu = this.props.menu;
        if (!menu.isOpen())
            return;
        if (menu.getSource() == ActionSource_1.default.CONTEXT_MENU)
            className += " _context";
        if (menu.getSource() == ActionSource_1.default.TOP_BAR)
            className += " _top";
        requestAnimationFrame(() => {
            this.recalculatePos();
        });
        return react_1.default.createElement("div", { ref: this.ref, className: className, style: { top: menu.getPosY(), left: menu.getPosX() } }, menu.getActions().map((action, i) => {
            let className = "_action";
            // TODO enabled, submenus, etc
            let icon = action.getIcon();
            return react_1.default.createElement("div", { className: className, key: i, onClick: (e) => __awaiter(this, void 0, void 0, function* () {
                    e.preventDefault();
                    e.stopPropagation();
                    this.props.renderer.showContextMenu(undefined);
                    yield action.runAction(menu.getSource());
                }) },
                icon ? react_1.default.createElement(Icon_1.default, { className: "_icon", icon: icon }) : react_1.default.createElement("span", { className: "_icon" }),
                react_1.default.createElement("span", { className: "_name" }, action.getName()),
                react_1.default.createElement("span", { className: "_binds" }, action.getKeybinds().map((e, i) => {
                    return react_1.default.createElement("span", { className: e.isUnsafe() ? "_unsafe" : "", key: i }, e.toString());
                })));
        }));
    }
}
exports.default = ContextMenuRenderer;
