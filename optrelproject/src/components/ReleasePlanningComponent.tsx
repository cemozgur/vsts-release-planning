import * as React from 'react';

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
import { AlgorithmChoice } from "./releaseplan/AlgorithmChoice";
import { ReleasePlanInput } from "./releaseplan/ReleasePlanInput";


import { FeatureList } from "./features/FeatureList";


interface IReleasePlanningProps {
    description: string;
    features: IWorkItemSearchResult;
}

interface IReleasePlanningState {
    releasePlanGeneration: IReleasePlanGeneration;
}

const VSTS_DOCUMENT = {
    RPDS: "RPDS"
}

export class ReleasePlanningComponent extends React.Component<IReleasePlanningProps, IReleasePlanningState> {

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
        algorithmChoiceSection = <AlgorithmChoice updateAlgorithmState={this._onChange.bind(this)} disabled={!this._canGenerateReleasePlan(this.state)} />;
        algorithmGenerationSection = <ReleasePlanInput algorithmType={this.state.releasePlanGeneration.algorithmType} updateStateConfig={this.updateConfigState.bind(this)} />
        algorithmButtonSection = this._getAlgorithmButtonSection();

        let releasePlanResultSection: JSX.Element = null
        let releasePlanGenerationState = this.state.releasePlanGeneration;

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
            &nbsp;
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

    private updateConfigState(configKey, name, value) {
        if (name) {
            this.setStateConfigKey(configKey, true);
            this.state.releasePlanGeneration.config[configKey][name] = value;
        } else {
            this.setStateConfigKey(configKey, false);
            this.state.releasePlanGeneration.config[configKey] = value;
        }
    }

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

    private _getAlgorithmButtonSection(): JSX.Element {
        return <div>
            <div className="actions">
                <Button onClick={this._onGenerateReleasePlanClick.bind(this)} buttonType={ButtonType.primary} disabled={!this._canGenerateReleasePlan(this.state)} className="action-button">Generate Release Plan</Button>
            </div>
        </div>
    }

    private _onGenerateReleasePlanClick(ev: React.MouseEvent<HTMLButtonElement>): void {
        let algorithmService = container.getNamed<IReleasePlanningAlgorithm>(SERVICE_IDENTIFIER.IReleasePlanningAlgorithm, this.state.releasePlanGeneration.algorithmType);
        let config = this.state.releasePlanGeneration.config;

        if (algorithmService.validateConfigAlgorithm(config)) {
            this._setState(true, null);
            VSS.getService(VSS.ServiceIds.ExtensionData).then((dataService: ExtensionDataService) => {
                dataService.getDocuments(VSTS_DOCUMENT.RPDS).then(
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