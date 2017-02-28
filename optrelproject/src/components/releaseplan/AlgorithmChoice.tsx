import * as React from 'react';

import { ChoiceGroup, IChoiceGroupOption } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/ChoiceGroup';

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
        return <div>
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
                label='Select the release planning optimisation for your project.'
                onChange={this.props.updateAlgorithmState.bind(this)}
                required={true}
                disabled={this.props.disabled}
            />
        </div >;
    }

}
