import * as React from 'react';

import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';
import { IFMReleasePlanInput } from './IFMReleasePlanInput';
import { NSGA2ReleasePlanInput } from './NSGA2ReleasePlanInput';

import ALGORITHM_TYPE from "../../logic/constants/algorithmType"

interface IReleasePlanInputProps {
    algorithmType: string;
    updateStateConfig: any;
}
/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description React Component for algorithm configuration input, it renders according the algorithm type selected
 */
export class ReleasePlanInput extends React.Component<IReleasePlanInputProps, undefined> {

    constructor(props?: IReleasePlanInputProps) {
        super(props);
    }

    /** 
     * @function render
     * @description It renders a form with the required configuration input according to the selected algorithm type
     */
    public render() {
        let algorithmType = this.props.algorithmType;

        let inputSection: JSX.Element = null;
        switch (algorithmType) {
            case ALGORITHM_TYPE.IFM:
                inputSection = <IFMReleasePlanInput updateStateConfig={this.props.updateStateConfig.bind(this)} />
                break;
            case ALGORITHM_TYPE.GA:
                inputSection = <NSGA2ReleasePlanInput updateStateConfig={this.props.updateStateConfig.bind(this)} />;
                break;
        }

        return <div>
            {inputSection}
        </div>;
    }
}
