import * as React from 'react';

import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';
import { IFMReleasePlanInput } from './IFMReleasePlanInput';
import { NSGA2ReleasePlanInput } from './NSGA2ReleasePlanInput';

import ALGORITHM_TYPE from "../../logic/constants/algorithmType"

interface IReleasePlanInputProps {
    algorithmType: string;
    updateStateConfig: any;
}

export class ReleasePlanInput extends React.Component<IReleasePlanInputProps, undefined> {

    constructor(props?: IReleasePlanInputProps) {
        super(props);
    }

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
