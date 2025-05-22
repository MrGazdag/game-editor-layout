import React, {Component} from "react";
export default class Icon extends Component<IconProperties, IconProperties> {
    constructor(props: IconProperties) {
        super(props);
        this.state = {...props};
    }

    render() {
        return <div key={this.props.icon} className={"icon " + this.props.className}>
            <svg>
                <use xlinkHref={"#" + this.state.icon}></use>
            </svg>
        </div>;
    }
}

interface IconProperties {
    icon: string
    className?: string
}