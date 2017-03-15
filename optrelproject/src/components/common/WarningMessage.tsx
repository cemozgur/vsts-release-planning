import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MessageBar, MessageBarType } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/MessageBar';

export interface IWarningMessageProps { message: string; }


export class WarningMessage extends React.Component<IWarningMessageProps, undefined> {
    public render(): JSX.Element {
        return <MessageBar
            messageBarType={MessageBarType.warning}>
            {this.props.message}</MessageBar>;
    }
}
