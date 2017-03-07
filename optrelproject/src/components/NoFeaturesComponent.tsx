import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MessageBar, MessageBarType } from '../../node_modules/office-ui-fabric-react/lib-amd/components/MessageBar';

export class NoFeaturesComponent extends React.Component<undefined, undefined> {
    public render(): JSX.Element {
        return <MessageBar
            messageBarType={MessageBarType.warning}>
            The project does not contains features with New or Active State.</MessageBar>;
    }
}
