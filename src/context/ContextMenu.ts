import EditorAction from "../action/EditorAction";
import ActionSource from "../action/ActionSource";

export default class ContextMenu {
    private readonly name: string;
    private readonly posX: number;
    private readonly posY: number;
    private readonly actions: EditorAction[];
    private readonly source: ActionSource;
    private open: boolean;

    constructor(name: string, posX: number, posY: number, actions: EditorAction[], source: ActionSource) {
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.actions = actions;
        this.source = source;
        this.open = false;
    }

    getName() {
        return this.name;
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    getActions() {
        return this.actions;
    }

    getSource() {
        return this.source;
    }

    isOpen() {
        return this.open;
    }

    setOpen(open: boolean) {
        this.open = open;
    }
}