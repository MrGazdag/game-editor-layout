import {Component} from "react";

export default class TextInput extends Component<Props, any> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}

	render() {
		return <input type={"text"} placeholder={this.props.placeholder}/>
	}
}

interface Props {
	placeholder: string;
}