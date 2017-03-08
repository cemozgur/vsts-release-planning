import * as React from 'react';

import { ChoiceGroup, IChoiceGroupOption } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/ChoiceGroup';
import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label';


import ALGORITHM_TYPE from "../../logic/constants/algorithmType"

interface IAlgorithmChoiceProps {
    updateAlgorithmState: any;
    disabled: boolean;
}

export class AlgorithmChoice extends React.Component<IAlgorithmChoiceProps, undefined> {

    constructor(props?: IAlgorithmChoiceProps) {
        super(props);
    }

    public render() {
        return <div className="ms-Grid">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                    <Label>Select the release planning optimisation for your project.</Label>
                    <ChoiceGroup
                        options={
                            [
                                {
                                    key: ALGORITHM_TYPE.IFM,
                                    text: 'Release Planning that maximises the Net Present Value of the project.',
                                    checked: true
                                },
                                {
                                    key: ALGORITHM_TYPE.GA,
                                    text: 'Release Planning that maximises Net Present Value and minimises Time Criticality of the Project.'
                                }
                            ]}
                        onChange={this.props.updateAlgorithmState.bind(this)}
                        required={true}
                        disabled={this.props.disabled}
                    />
                </div >
            </div >
        </div >;
    }

}
