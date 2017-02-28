import * as React from 'react';

import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';

import ALGORITHM_TYPE from "../../logic/constants/algorithmType"

interface IReleasePlanInputProps {
    algorithmType: string;
    updateStateConfig: any;
}

const CONFIG_KEY = {
    discountValue: "discountValue",
    teamCapability: "teamCapability",
    numberOfSprint: "numberOfSprint",
    sprintDuration: "sprintDuration"
};

export class ReleasePlanInput extends React.Component<IReleasePlanInputProps, undefined> {

    constructor(props?: IReleasePlanInputProps) {
        super(props);
    }

    public render() {
        let algorithmType = this.props.algorithmType;

        let inputSection: JSX.Element = null;
        switch (algorithmType) {
            case ALGORITHM_TYPE.IFM:
                inputSection = this._getIFMInputSection();
                break;
            case ALGORITHM_TYPE.GA:
                inputSection = null;
                break;
        }

        return <div>
            {inputSection}
        </div>;
    }

    private _getIFMInputSection(): JSX.Element {
        return <div>
            <div className="ifm-section">
                <Label>Number of Sprint</Label>
                <input type="number" placeholder="How many iterations for the project?" required={true} className="release-input" onChange={this._handleNumberOfSprintChange.bind(this)} />
            </div>
            <div className="ifm-section">
                <Label>Sprint Duration</Label>
                <input type="number" placeholder="How many weeks last each sprint?" required={true} className="release-input" onChange={this._handleSprintDurationChange.bind(this)} />
            </div>
            <div className="ifm-section">
                <Label>Team Capability</Label>
                <input type="number" placeholder="(Min) Available Hours" name="Min" required={true} className="release-input" onChange={this._handleTeamCapabilityChange.bind(this)} />
                <input type="number" placeholder="(Expected) Available Hours" name="Expected" required={true} className="release-input" onChange={this._handleTeamCapabilityChange.bind(this)} />
                <input type="number" placeholder="(Max) Available Hours" name="Max" required={true} className="release-input" onChange={this._handleTeamCapabilityChange.bind(this)} />
            </div>
            <div className="ifm-section">
                <Label>Discount Value</Label>
                <input type="number" placeholder="(Min)" name="Min" required={true} className="release-input" onChange={this._handleDiscountValueChange.bind(this)} />
                <input type="number" placeholder="(Expected)" name="Expected" required={true} className="release-input" onChange={this._handleDiscountValueChange.bind(this)} />
                <input type="number" placeholder="(Max)" name="Max" required={true} className="release-input" onChange={this._handleDiscountValueChange.bind(this)} />
            </div>


        </div>;
    }

    private _handleNumberOfSprintChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.props.updateStateConfig(CONFIG_KEY.numberOfSprint, null, value);
    }
    private _handleSprintDurationChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.props.updateStateConfig(CONFIG_KEY.sprintDuration, null, value);
    }
    private _handleTeamCapabilityChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.props.updateStateConfig(CONFIG_KEY.teamCapability, name, value);
    }
    private _handleDiscountValueChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.props.updateStateConfig(CONFIG_KEY.discountValue, name, value);
    }
}
