import React from "react";
import {Component} from "react";

export default class TextInput extends Component<Props, any> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}

	render() {
		return <input type={"text"} placeholder={this.props.placeholder} onChange={(e) => this.props.onChange(e)}/>
	}
}

interface Props {
	placeholder: string;
	onChange: (e: any) => void;
}