import * as React from 'react';
import { Spinner, SpinnerType } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Spinner';


export interface LoaderProps { message: string; }


export class Loader extends React.Component<LoaderProps, undefined> {
    render() {
        return <Spinner type={SpinnerType.large} label={this.props.message} />;
    }
}