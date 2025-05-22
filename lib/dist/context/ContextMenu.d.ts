import EditorAction from "../action/EditorAction";
import ActionSource from "../action/ActionSource";
export default class ContextMenu {
    private readonly name;
    private readonly posX;
    private readonly posY;
    private readonly actions;
    private readonly source;
    private open;
    constructor(name: string, posX: number, posY: number, actions: EditorAction[], source: ActionSource);
    getName(): string;
    getPosX(): number;
    getPosY(): number;
    getActions(): EditorAction[];
    getSource(): ActionSource;
    isOpen(): boolean;
    setOpen(open: boolean): void;
    appendChild(childMenu: ContextMenu): void;
}
