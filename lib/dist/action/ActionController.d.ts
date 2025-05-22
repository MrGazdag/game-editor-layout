import ActionSource from "./ActionSource";
import Controller from "../controller/Controller";
export default class ActionController extends Controller<ActionData> {
    private readonly id;
    private callback;
    constructor(id: string | null, options: Partial<ActionData> | undefined, action: (source: ActionSource) => void | Promise<void>);
    getId(): string | null;
    getName(): string;
    getDescription(): string;
    getIcon(): string | null;
    runAction(source: ActionSource): Promise<void>;
}
export interface ActionData {
    name: string;
    description: string;
    icon: string | null;
}
