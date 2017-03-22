import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MessageBar, MessageBarType } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/MessageBar';

export interface IWarningMessageProps { message: string; }

/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description React Component for any warning message
 */
export class WarningMessage extends React.Component<IWarningMessageProps, undefined> {
    /** 
     * @function render
     * @description it draws a Office UI Fabric message bar in warning mode with any message received from props
     */
    public render(): JSX.Element {
        return <MessageBar
            messageBarType={MessageBarType.warning}>
            {this.props.message}</MessageBar>;
    }
}
