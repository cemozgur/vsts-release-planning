import * as React from 'react';
import { Spinner, SpinnerType } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Spinner';


export interface LoaderProps { message: string; }

/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description React Component for spinner
 */
export class Loader extends React.Component<LoaderProps, undefined> {
    /** 
     * @function render
     * @description it draws a Office UI Fabric spinner with any message
     */
    render() {
        return <Spinner type={SpinnerType.large} label={this.props.message} />;
    }
}