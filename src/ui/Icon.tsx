import React, {Component} from "react";
export default class Icon extends Component<IconProperties> {
    constructor(props: IconProperties) {
        super(props);
    }

    render() {
        return <div className={"icon " + this.props.className}>
            <svg>
                <use xlinkHref={"#" + this.props.icon}></use>
            </svg>
        </div>;
    }
}

interface IconProperties {
    icon: string
    className?: string
}