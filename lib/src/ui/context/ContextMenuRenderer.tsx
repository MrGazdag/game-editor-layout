import React, {Component, RefObject} from "react";
import ContextMenu from "../../context/ContextMenu";
import EditorLayout from "../EditorLayout";
import Icon from "../Icon";
import ActionSource from "../../action/ActionSource";

export default class ContextMenuRenderer extends Component<Props, any> {
    private resizeHandler: (e: Event)=>void;
    private ref: RefObject<HTMLDivElement>;
    constructor(props: Props) {
        super(props);
        this.ref = React.createRef();
        this.resizeHandler = (e)=>{
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
        if (!this.ref.current) return;

        let menu = this.props.menu;
        let x = menu.getPosX();
        let y = menu.getPosY();

        // Reset height clipping (for top bar)
        this.ref.current!.style.maxHeight = "none";
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
            if (menu.getSource() == ActionSource.MENU_BAR) {
                // Cannot move further up, limit height
                this.ref.current.style.maxHeight = (ih - y) + "px";
            } else {
                y = Math.max(ih - h, 0);
                this.ref.current.style.top = y + "px";
            }
        }
    }

    render() {
        let className = "context_menu";
        let menu = this.props.menu;
        if (!menu.isOpen()) return;
        if (menu.getSource() == ActionSource.CONTEXT_MENU) className += " _context";
        if (menu.getSource() == ActionSource.MENU_BAR) className += " _top";
        requestAnimationFrame(()=>{
            this.recalculatePos();
        });
        return <div ref={this.ref} className={className} style={{top: menu.getPosY(), left: menu.getPosX()}}>
            {
                menu.getActions().map((action,i)=>{
                    let className = "_action";
                    // TODO enabled, submenus, etc
                    let icon = action.getIcon();
                    return <div className={className} key={i} onClick={async e => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.props.renderer.showContextMenu(undefined);
                        await action.runAction(menu.getSource());
                    }}>
                        {icon ? <Icon className="_icon" icon={icon}/> : <span className="_icon"/>}
                        <span className="_name">{action.getName()}</span>
                        <span className="_binds">{action.getKeybinds().map((e,i)=>{
                            return <span className={e.isUnsafe() ? "_unsafe" : ""} key={i}>{e.toString()}</span>
                        })}</span>
                    </div>;
                })
            }
        </div>;
    }
}
interface Props {
    menu: ContextMenu,
    renderer: EditorLayout
}