import ChangeHandler, {ChangeHandlerFunction} from "../../utils/ChangeHandler";
import React, {Component} from "react";

export default abstract class DynamicComponent<T extends {getChangeHandler(): ChangeHandler<T>}, Props> extends Component<Props, State> {
    private readonly changeHandler: ChangeHandlerFunction<T>;
    private readonly key: keyof Props;

    protected constructor(props: Props, k: keyof Props) {
        super(props);
        this.key = k;
        this.changeHandler = ()=>{
            this.setState({
                renderCount: this.state.renderCount+1
            });
        };
        this.state = {
            renderCount: 0
        };
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