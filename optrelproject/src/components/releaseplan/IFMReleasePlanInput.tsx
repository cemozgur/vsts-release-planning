import * as React from 'react';

import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';
import INPUT_CONFIG_KEY from '../../logic/constants/releasePlanInputConfigKey';

interface IIFMReleasePlanInputProps {
    updateStateConfig: any;
}

export class IFMReleasePlanInput extends React.Component<IIFMReleasePlanInputProps, undefined> {
    constructor(props?: IIFMReleasePlanInputProps) {
        super(props);
    }

    public render() {
        let IFMInput: JSX.Element = null;

        IFMInput = <div id="inputIFM" className="ms-Grid">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                    <Label>Number of Sprints (How many iterations for the project?)</Label>
                    <input className="release-input" type="number" required={true} onChange={this._handleNumberOfSprintChange.bind(this)} />
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                    <Label>Sprint Duration (How many weeks does each sprint take?)</Label>
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

        return IFMInput;
    }

    private _handleNumberOfSprintChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.props.updateStateConfig(INPUT_CONFIG_KEY.numberOfSprint, null, value);
    }
    private _handleSprintDurationChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.props.updateStateConfig(INPUT_CONFIG_KEY.sprintDuration, null, value);
    }
    private _handleTeamCapabilityChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.props.updateStateConfig(INPUT_CONFIG_KEY.teamCapability, name, value);
    }
    private _handleDiscountValueChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.props.updateStateConfig(INPUT_CONFIG_KEY.discountValue, name, value);
    }
}