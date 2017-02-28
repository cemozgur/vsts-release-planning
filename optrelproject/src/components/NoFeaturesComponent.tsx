import * as React from 'react';
import * as ReactDOM from 'react-dom';


export class NoFeaturesComponent extends React.Component<undefined, undefined> {
    public render(): JSX.Element {
        return <div>
            <span>There is no feature available to process.</span>
        </div>;
    }
}
