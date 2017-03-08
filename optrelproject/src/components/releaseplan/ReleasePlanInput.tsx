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
        return <div className="ms-Grid">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                    <Label>Number of Sprint (How many iterations for the project?)</Label>
                    <input type="number" className="release-input" required={true} onChange={this._handleNumberOfSprintChange.bind(this)} />
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                    <Label>Sprint Duration (How many weeks last each sprint?)</Label>
                    <input type="number" className="release-input" required={true} onChange={this._handleSprintDurationChange.bind(this)} />
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                    <Label>Team Capability (How many hours is the team available to work per sprint?)</Label>
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                    <Label>Mininum</Label>
                    <input type="number" name="Min" required={true} className="release-input" onChange={this._handleTeamCapabilityChange.bind(this)} />
                </div>
                <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                    <Label>Expected</Label>
                    <input type="number" name="Expected" required={true} className="release-input" onChange={this._handleTeamCapabilityChange.bind(this)} />
                </div>
                <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                    <Label>Maximum</Label>
                    <input type="number" name="Max" required={true} className="release-input" onChange={this._handleTeamCapabilityChange.bind(this)} />
                </div>
            </div>

            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                    <Label>Discount Value (What is the discount rate in percentage % for the project?)</Label>
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                    <Label>Mininum</Label>
                    <input type="number" name="Min" required={true} className="release-input" onChange={this._handleDiscountValueChange.bind(this)} />
                </div>
                <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                    <Label>Expected</Label>
                    <input type="number" name="Expected" required={true} className="release-input" onChange={this._handleDiscountValueChange.bind(this)} />
                </div>
                <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                    <Label>Maximum</Label>
                    <input type="number" name="Max" required={true} className="release-input" onChange={this._handleDiscountValueChange.bind(this)} />
                </div>
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
