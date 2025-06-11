import React, {Component, RefObject} from "react";
import ContextMenu from "../../context/ContextMenu";
import EditorLayoutRenderer from "../EditorLayoutRenderer";
import ActionSource from "../../action/ActionSource";
import EditorActionRenderer from "./EditorActionRenderer";
import ActionGroup from "../../action/ActionGroup";

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
        let pos = menu.getPositionCandidates();
        for (let i = 0; i < pos.length; i++) {
            let candidate = pos[i];

            let x = candidate.horizontal;
            let y = candidate.vertical;

            // Reset height clipping (for top bar)
            this.ref.current!.style.maxHeight = "none";
            let clip = this.ref.current.getBoundingClientRect();
            let w = clip.width;
            let h = clip.height;

            if (candidate.align === "right") {
                x -= w;
            }
            // TODO scroll?
            let iw = window.innerWidth;
            let ih = window.innerHeight;

            if (x + w > iw) {
                if (i < pos.length-1) {
                    // Pick the next position candidate if this does not fit
                    continue;
                }
                x = Math.max(iw - w, 0);
            }
            if (y + h > ih) {
                if (menu.getSource() == ActionSource.MENU_BAR && menu.getParent() == null) {
                    // Cannot move further up, limit height
                    this.ref.current.style.maxHeight = (ih - y) + "px";
                } else {
                    y = Math.max(ih - h, 0);
                }
            }
            this.ref.current.style.left = x + "px";
            this.ref.current.style.top = y + "px";
            break;
        }
    }

    render() {
        let className = "context_menu";
        let menu = this.props.menu;
        if (!menu.isOpen()) return;
        if (menu.getSource() == ActionSource.CONTEXT_MENU) className += " _context";
        if (menu.getSource() == ActionSource.MENU_BAR) className += " _top";

        if (menu.getParent() != null) className += " _sub";
        requestAnimationFrame(()=>{
            this.recalculatePos();
        });

        let content: React.ReactNode[] = [];
        for (let index = 0; index < menu.getEntries().length; index++){
            let prev = index == 0 ? null : menu.getEntries()[index-1];
            let entry = menu.getEntries()[index];
            // Separator between groups, but not before the first (when prev is null)
            if (prev !== null && (prev instanceof ActionGroup || entry instanceof ActionGroup)) {
                content.push(<hr key={"hr_" + index}/>);
            }
            if (entry instanceof ActionGroup) {
                for (let childIndex = 0; childIndex < entry.getActions().length; childIndex++){
                    let action = entry.getActions()[childIndex];
                    content.push(<EditorActionRenderer key={index + "_" + childIndex} action={action} menu={menu}/>);
                }
            } else {
                content.push(<EditorActionRenderer key={index} action={entry} menu={menu}/>);
            }
        }
        return <div ref={this.ref} className={className} style={{top: menu.getPositionCandidates()[0].vertical, left: menu.getPositionCandidates()[0].horizontal}}>
            {content}
        </div>;
    }
}
interface Props {
    menu: ContextMenu,
    renderer: EditorLayoutRenderer
}