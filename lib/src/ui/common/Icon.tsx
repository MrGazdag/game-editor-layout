import React, {Component, MouseEventHandler} from "react";

export default class Icon extends Component<IconProperties> {
    constructor(props: IconProperties) {
        super(props);
    }

    render() {
        return <div className={"icon " + this.props.className} onClick={this.props.onClick}>
            <svg>
                <use xlinkHref={"#" + this.props.icon}></use>
            </svg>
        </div>;
    }
}

interface IconProperties {
    icon: string
    className?: string,
    onClick?: MouseEventHandler<HTMLDivElement>
}