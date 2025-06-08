import TabController, {TabData, TabInitData} from "../TabController";

export default class EditorTabController extends TabController {
    private readonly uri: string;
    constructor(options: EditorTabInitData) {
        super(DefaultEditorTabData, {
            ...options
        });
        this.uri = options.uri;
    }

    getURI() {
        return this.uri;
    }

    getUniqueIdentifier() {
        return this.uri;
    }

}
const DefaultEditorTabData: TabData = {
    name: "Editor Tab",
    description: "",
    icon: null
}
export interface EditorTabInitData extends TabInitData {
    uri: string,
}