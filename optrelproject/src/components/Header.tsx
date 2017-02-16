import * as React from 'react';


export interface HeaderProps { description: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Header extends React.Component<HeaderProps, undefined> {
    render() {
        return <p>{this.props.description}</p>;
    }
}