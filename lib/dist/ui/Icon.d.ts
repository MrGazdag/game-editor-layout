import React, { Component } from "react";
export default class Icon extends Component<IconProperties> {
    constructor(props: IconProperties);
    render(): React.JSX.Element;
}
interface IconProperties {
    icon: string;
    className?: string;
}
export {};
