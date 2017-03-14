import * as React from 'react';
import { Link } from "react-router";
import { CommandBar } from '../../node_modules/office-ui-fabric-react/lib-amd/components/CommandBar/CommandBar';


export class Layout extends React.Component<undefined, undefined> {
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
