import EditorAction from "../action/EditorAction";
export default class TopBarEntry {
    private readonly id;
    private readonly name;
    private readonly actions;
    constructor(id: string, name: string);
    addAction(action: EditorAction): void;
    removeAction(action: EditorAction): void;
    getId(): string;
    getName(): string;
    getActions(): EditorAction[];
}
