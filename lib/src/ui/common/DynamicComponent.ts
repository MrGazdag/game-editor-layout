import ChangeHandler from "../../utils/ChangeHandler";
import React, {Component} from "react";

export default abstract class DynamicComponent<T extends {getChangeHandler(): ChangeHandler<T>}, Props> extends Component<Props, State> {
    protected readonly changeHandler: ()=>void;
    private readonly key: keyof Props;

    protected constructor(props: Props, k: {[K in keyof Props]: Props[K] extends T ? K : never}[keyof Props]) {
        super(props);
        this.key = k;
        this.changeHandler = ()=>{
            this.rerender();
        };
        this.state = {
            renderCount: 0
        };
    }

    public rerender() {
        this.setState({
            renderCount: this.state.renderCount+1
        });
    }

    private getValue() {
        return this.props[this.key] as T;
    }

    componentDidMount() {
        this.getValue().getChangeHandler().add(this.changeHandler);
    }

    componentWillUnmount() {
        this.getValue().getChangeHandler().remove(this.changeHandler);
    }

    protected abstract renderData(value: T): React.ReactNode;

    render() {
        let value = this.getValue();
        return this.renderData(value);
    }
}
interface State {
    renderCount: number;
}