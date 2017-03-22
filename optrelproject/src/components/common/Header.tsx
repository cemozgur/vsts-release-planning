import * as React from 'react';


export interface HeaderProps { description: string; }

/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description React Component for simple paragrhap information
 */
export class Header extends React.Component<HeaderProps, undefined> {
    /** 
     * @function render
     * @description it draws a simple paragrahps with a message received from props.
     */
    render() {
        return <p>{this.props.description}</p>;
    }
}