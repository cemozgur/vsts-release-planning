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


    private _onGenerateReleasePlanClick(ev: React.MouseEvent<HTMLButtonElement>): void {
        this._setState(true, null);

        VSS.getService(VSS.ServiceIds.ExtensionData).then((dataService: ExtensionDataService) => {
            dataService.getDocuments(this.RPDSDocsName).then(
                (featuresDeailtDocument) => {

                    let algorithmService = container.getNamed<IReleasePlanningAlgorithm>(SERVICE_IDENTIFIER.IReleasePlanningAlgorithm, this.state.releasePlanGeneration.algorithmType);
                    let featuresVSTS = this.props.features.queryResult.workItems;
                    let algorithmConfig = this.state.releasePlanGeneration.config;

                    if (algorithmService.getFeatureData(featuresVSTS, featuresDeailtDocument)) {
                        let config = {
                            featureNumber: 5,
                            discountValue: 50,
                            teamCapability: 100,
                            totalRequiredEffort: 100,
                            numberOfSprint: 55,
                            sprintDuration: 2
                        };
                        algorithmService.testDataGeneration(config);

                        let releasePlanResult = algorithmService.getOptimalReleasePlan(algorithmConfig);


                        this._setState(false, releasePlanResult);
                    } else {
                        this._setStateError("The features information is not completed");
                    }

                });
        });
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
        return <div className="ifm-section">
            <Label>Discount Rate</Label>
            <TextField placeholder="(Min)" required={true} className="release-input" onChanged={this._onDiscountValueMinChange.bind(this)} />
            <TextField placeholder="(Expected)" required={true} className="release-input" onChanged={this._onDiscountValueExpectedChange.bind(this)} />
            <TextField placeholder="(Max)" required={true} className="release-input" onChanged={this._onDiscountValueMaxChange.bind(this)} />
        </div>;
    }

    /**
     * Create config key for a input value with min, expected and max
     */
    private setStateConfigKey(configKey): void {
        let releasePlanGenerationState = this.state.releasePlanGeneration;
        let update = false;
        let mock = {
            Min: null,
            Expected: null,
            Max: null
        };

        if (!releasePlanGenerationState.config) {
            releasePlanGenerationState.config = {};
            releasePlanGenerationState.config[configKey] = mock;
            update = true;
        } else {
            if (!releasePlanGenerationState.config[configKey]) {
                releasePlanGenerationState.config[configKey] = mock;
                update = true;
            }
        }

        if (update) {
            this.setState({ releasePlanGeneration: releasePlanGenerationState });
        }
    }

    private _onDiscountValueMinChange(value: string): void {
        let configKey = "discountRate";
        let releasePlanGenerationState = this.state.releasePlanGeneration;

        this.setStateConfigKey(configKey);
        releasePlanGenerationState.config[configKey].Min = value;

        this.setState({ releasePlanGeneration: releasePlanGenerationState });
        console.log("State");
        console.log(this.state.releasePlanGeneration);
    }
    private _onDiscountValueExpectedChange(value: string): void {
        let configKey = "discountRate";
        let releasePlanGenerationState = this.state.releasePlanGeneration;

        this.setStateConfigKey(configKey);
        releasePlanGenerationState.config[configKey].Expected = value;

        this.setState({ releasePlanGeneration: releasePlanGenerationState });
        console.log("State");
        console.log(this.state.releasePlanGeneration);
    }
    private _onDiscountValueMaxChange(value: string): void {
        let configKey = "discountRate";
        let releasePlanGenerationState = this.state.releasePlanGeneration;

        this.setStateConfigKey(configKey);
        releasePlanGenerationState.config[configKey].Max = value;

        this.setState({ releasePlanGeneration: releasePlanGenerationState });
        console.log("State");
        console.log(this.state.releasePlanGeneration);
    }

    private _getAlgorithmGenerationButton(): JSX.Element {
        return <div>
            <div className="actions">
                <Button onClick={this._onGenerateReleasePlanClick.bind(this)} buttonType={ButtonType.primary} disabled={!this._canGenerateReleasePlan(this.state)} className="action-button">Generate Release Plan</Button>
            </div>
        </div>
    }
    private _onChange(ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) {
        this._setStateAlgorithmType(option.key);
    }

}