import * as React from 'react';

import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';
import INPUT_CONFIG_KEY from '../../logic/constants/releasePlanInputConfigKey';

interface INSGA2ReleasePlanInputProps {
    updateStateConfig: any;
}
/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description React Component that draws the inputs required for NSGA2 release planning approach, this component will update the 
 * ReleasePlanningComponent State, the attribute for configuration object
 */
export class NSGA2ReleasePlanInput extends React.Component<INSGA2ReleasePlanInputProps, undefined> {

    constructor(props?: INSGA2ReleasePlanInputProps) {
        super(props);
    }
    /** 
     * @function render
     * @description It renders the following inputs: number of sprints, sprint duration, team capability (triangular distribution), 
     * discount value (triangular distribution)
     */
    public render() {
        let NSGA2Input: JSX.Element = null;
        NSGA2Input = <div id="inputNSGA2" className="ms-Grid">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
                    <Label>Number of Sprints (How many iterations for the project?)</Label>
                    <input type="number" className="release-input" required={true} onChange={this._handleNumberOfSprintChange.bind(this)} />
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
        return NSGA2Input;
    }
     /** 
     * @function _handleNumberOfSprintChange
     * @param event
     * @description It update the ReleasePlanningComponent State, config object, the attribute number of sprint with the user input
     */
    private _handleNumberOfSprintChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.props.updateStateConfig(INPUT_CONFIG_KEY.numberOfSprint, null, value);
    }
    /** 
     * @function _handleSprintDurationChange
     * @param event
     * @description It update the ReleasePlanningComponent State, config object, the attribute sprint duration with the user input
     */
    private _handleSprintDurationChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.props.updateStateConfig(INPUT_CONFIG_KEY.sprintDuration, null, value);
    }
    /** 
     * @function _handleTeamCapabilityChange
     * @param event
     * @description It update the ReleasePlanningComponent State, config object, the attribute team capability with the user input
     */
    private _handleTeamCapabilityChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.props.updateStateConfig(INPUT_CONFIG_KEY.teamCapability, name, value);
    }
    /** 
     * @function _handleDiscountValueChange
     * @param event
     * @description It update the ReleasePlanningComponent State, config object, the attribute discount value with the user input
     */
    private _handleDiscountValueChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.props.updateStateConfig(INPUT_CONFIG_KEY.discountValue, name, value);
    }
}
