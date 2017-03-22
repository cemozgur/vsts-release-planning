import * as React from 'react';
import { Link } from "react-router";
import { CommandBar } from '../../node_modules/office-ui-fabric-react/lib-amd/components/CommandBar/CommandBar';

/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description React Component for Navigation layout
 */
export class Layout extends React.Component<undefined, undefined> {

    /** 
     * @function render
     * @description It renders the navigation menu
     */
    public render(): JSX.Element {
        return <div>
            <ul className="ul-nav">
                <li className="li-nav"><Link className="li-element" to="/">Release Plan Generation</Link></li>
                <li className="li-nav"><Link className="li-element" to="releaseplanhistory">Release Plan History</Link></li>
            </ul>
            {this.props.children}
        </div>;
    }
}
