import * as React from 'react';
import * as ReactDOM from 'react-dom';

import container from "../logic/config/inversify.config";
import IReleasePlanningAlgorithm from "../logic/interfaces/IReleasePlanningAlgorithm";
import SERVICE_IDENTIFIER from "../logic/constants/identifiers";
import ALGORITHM_TYPE from "../logic/constants/algorithmType"


import { IWorkItemSearchResult } from "../model/IWorkItemSearchResult";
import { ExtensionDataService } from 'VSS/SDK/Services/ExtensionData';
import { IReleasePlanGeneration } from "../model/IReleasePlanGeneration";



import { Button } from '../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button';
import { ButtonType } from '../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button.Props';
import { ChoiceGroup, IChoiceGroupOption } from '../../node_modules/office-ui-fabric-react/lib-amd/components/ChoiceGroup';
import { Label } from '../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';
import { TextField } from '../../node_modules/office-ui-fabric-react/lib-amd/components/TextField/TextField';


import { Header } from "./common/Header";
import { ReleasePlanResult } from "./releaseplanresult/ReleasePlanResult";
import { FeatureList } from "./features/FeatureList";


interface IReleasePlanningProps {
    description: string;
    features: IWorkItemSearchResult;
}

interface IReleasePlanningState {
    releasePlanGeneration: IReleasePlanGeneration;
}


export class ReleasePlanningComponent extends React.Component<IReleasePlanningProps, IReleasePlanningState> {
    private RPDSDocsName: string = "RPDS";
    private discountValue: string = "discountValue";
    private teamCapability: string = "teamCapability";
    private numberOfSprint: string = "numberOfSprint";
    private sprintDuration: string = "sprintDuration";


    constructor(props?: IReleasePlanningProps) {
        super(props);
        this.state = this._getDefaultState();
    }

    private _getDefaultState(): IReleasePlanningState {
        let releasePlanGenerationInitial: IReleasePlanGeneration = {
            processing: false,
            algorithmType: ALGORITHM_TYPE.IFM,
            config: null,
            result: null,
            error: null
        };
        return { releasePlanGeneration: releasePlanGenerationInitial };
    }

    public render(): JSX.Element {
        let featureSection: JSX.Element = null;
        let algorithmChoiceSection: JSX.Element = null;
        let algorithmGenerationSection: JSX.Element = null;
        let algorithmButtonSection: JSX.Element = null;

        featureSection = <FeatureList features={this.props.features.queryResult} />

        algorithmChoiceSection = this._getAlgorithmAlternatives();

        let releasePlanGenerationState = this.state.releasePlanGeneration;
        /**
         * To improve this part, to be a React component
         */
        switch (releasePlanGenerationState.algorithmType) {
            case ALGORITHM_TYPE.IFM:
                algorithmGenerationSection = this._getIFMGenerationSection();
                break;
            case ALGORITHM_TYPE.GA:
                algorithmGenerationSection = null;

        }
        algorithmButtonSection = this._getAlgorithmGenerationButton();

        let releasePlanResultSection: JSX.Element = null

        if (releasePlanGenerationState.result) {
            releasePlanResultSection = <ReleasePlanResult result={releasePlanGenerationState.result} algorithmType={releasePlanGenerationState.algorithmType} />;
        } else if (releasePlanGenerationState.processing) {
            releasePlanResultSection = <Label>Processing..</Label>
        } else if (releasePlanGenerationState.error) {
            releasePlanResultSection = <Label>{releasePlanGenerationState.error}</Label>
        }


        return <div>
            <Header description={this.props.description} />
            {featureSection}
            &nbsp;
            {algorithmChoiceSection}
            {algorithmGenerationSection}
            {algorithmButtonSection}
            &nbsp;
            {releasePlanResultSection}
        </div>;
    }

    private _canGenerateReleasePlan(state: IReleasePlanningState): boolean {
        return !state.releasePlanGeneration.processing;
    }

    private _setState(processing: boolean, releasePlanResult: any) {
        let releasePlanGenerationState = this.state.releasePlanGeneration;

        releasePlanGenerationState.processing = processing;
        releasePlanGenerationState.result = releasePlanResult;
        releasePlanGenerationState.error = null
        this.setState({ releasePlanGeneration: releasePlanGenerationState });
    }

    private _setStateError(error: string) {
        let releasePlanGenerationState = this.state.releasePlanGeneration;

        releasePlanGenerationState.processing = false;
        releasePlanGenerationState.result = null;
        releasePlanGenerationState.error = error;

        this.setState({ releasePlanGeneration: releasePlanGenerationState });
    }

    private _setStateAlgorithmType(algorithmType: string) {
        let releasePlanGenerationState = this.state.releasePlanGeneration;

        releasePlanGenerationState.algorithmType = algorithmType;
        releasePlanGenerationState.processing = false;
        releasePlanGenerationState.config = null;
        releasePlanGenerationState.result = null;
        releasePlanGenerationState.error = null;

        this.setState({ releasePlanGeneration: releasePlanGenerationState });
    }



    private _getAlgorithmAlternatives(): JSX.Element {
        return <div>
            <ChoiceGroup
                options={
                    [
                        {
                            key: ALGORITHM_TYPE.IFM,
                            text: 'IFM Algorithm, it maximize the cost.',
                            checked: true
                        },
                        {
                            key: ALGORITHM_TYPE.GA,
                            text: 'Genetic Algorithm'
                        }
                    ]}
                label='Select the release planning optimisation for your project.'
                onChange={this._onChange.bind(this)}
                required={true}
                disabled={!this._canGenerateReleasePlan(this.state)}
            />
        </div >;
    }

    private _getIFMGenerationSection(): JSX.Element {
        return <div>
            <div className="ifm-section">
                <Label>Number of Sprint</Label>
                <input placeholder="How many iterations for the project?" required={true} className="release-input" type="text" onChange={this._handleNumberOfSprintChange.bind(this)} />
            </div>
            <div className="ifm-section">
                <Label>Sprint Duration</Label>
                <input placeholder="How many weeks last each sprint?" required={true} className="release-input" type="text" onChange={this._handleSprintDurationChange.bind(this)} />
            </div>
            <div className="ifm-section">
                <Label>Team Capability</Label>
                <input placeholder="(Min) Available Hours" name="Min" required={true} className="release-input" type="text" onChange={this._handleTeamCapabilityChange.bind(this)} />
                <input placeholder="(Expected) Available Hours" name="Expected" required={true} className="release-input" type="text" onChange={this._handleTeamCapabilityChange.bind(this)} />
                <input placeholder="(Max) Available Hours" name="Max" required={true} className="release-input" type="text" onChange={this._handleTeamCapabilityChange.bind(this)} />
            </div>
            <div className="ifm-section">
                <Label>Discount Value</Label>
                <input placeholder="(Min)" name="Min" required={true} className="release-input" type="text" onChange={this._handleDiscountValueChange.bind(this)} />
                <input placeholder="(Expected)" name="Expected" required={true} className="release-input" type="text" onChange={this._handleDiscountValueChange.bind(this)} />
                <input placeholder="(Max)" name="Max" required={true} className="release-input" type="text" onChange={this._handleDiscountValueChange.bind(this)} />
            </div>
        </div>;
    }



    private _handleSprintDurationChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let releasePlanGenerationState = this.state.releasePlanGeneration;
        let configKey = this.sprintDuration;

        this.setStateConfigKey(configKey, false);
        releasePlanGenerationState.config[configKey] = value;
    }
    private _handleNumberOfSprintChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let releasePlanGenerationState = this.state.releasePlanGeneration;
        let configKey = this.numberOfSprint;

        this.setStateConfigKey(configKey, false);
        releasePlanGenerationState.config[configKey] = value;
    }
    private _handleDiscountValueChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let releasePlanGenerationState = this.state.releasePlanGeneration;
        let configKey = this.discountValue;

        this.setStateConfigKey(configKey, true);
        releasePlanGenerationState.config[configKey][name] = value;
    }
    private _handleTeamCapabilityChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let releasePlanGenerationState = this.state.releasePlanGeneration;
        let configKey = this.teamCapability;

        this.setStateConfigKey(configKey, true);
        releasePlanGenerationState.config[configKey][name] = value;
    }







    /**
     * Create config key for a input value with min, expected and max
     */
    private setStateConfigKey(configKey: string, triangular: boolean): void {
        let releasePlanGenerationState = this.state.releasePlanGeneration;
        let update = false;
        let mock = {
            Min: null,
            Expected: null,
            Max: null
        };

        if (!releasePlanGenerationState.config) {
            releasePlanGenerationState.config = {};
            triangular ? releasePlanGenerationState.config[configKey] = mock : releasePlanGenerationState.config[configKey] = null;
            update = true;
        } else {
            if (!releasePlanGenerationState.config[configKey]) {
                triangular ? releasePlanGenerationState.config[configKey] = mock : releasePlanGenerationState.config[configKey] = null;
                update = true;
            }
        }

        if (update) {
            this.setState({ releasePlanGeneration: releasePlanGenerationState });
        }
    }

    private _getAlgorithmGenerationButton(): JSX.Element {
        return <div>
            <div className="actions">
                <Button onClick={this._onGenerateReleasePlanClick.bind(this)} buttonType={ButtonType.primary} disabled={!this._canGenerateReleasePlan(this.state)} className="action-button">Generate Release Plan</Button>
            </div>
        </div>
    }

    private _onGenerateReleasePlanClick(ev: React.MouseEvent<HTMLButtonElement>): void {
        console.log("Configuration State");
        console.log(this.state.releasePlanGeneration.config);

        let algorithmService = container.getNamed<IReleasePlanningAlgorithm>(SERVICE_IDENTIFIER.IReleasePlanningAlgorithm, this.state.releasePlanGeneration.algorithmType);
        let config = this.state.releasePlanGeneration.config;
        if (algorithmService.validateConfigAlgorithm(config)) {
            this._setState(true, null);
            VSS.getService(VSS.ServiceIds.ExtensionData).then((dataService: ExtensionDataService) => {
                dataService.getDocuments(this.RPDSDocsName).then(
                    (featuresDeailtDocument) => {
                        let featuresVSTS = this.props.features.queryResult.workItems;
                        if (algorithmService.getFeatureData(featuresVSTS, featuresDeailtDocument)) {
                            let releasePlanResult = algorithmService.getOptimalReleasePlan(config);
                            this._setState(false, releasePlanResult);
                        } else {
                            this._setStateError("The features information is not completed");
                        }

                    });
            });
        } else {
            this._setStateError("Please fill all the fields on the above section.");
        }
    }
    private _onChange(ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) {
        this._setStateAlgorithmType(option.key);
    }

}