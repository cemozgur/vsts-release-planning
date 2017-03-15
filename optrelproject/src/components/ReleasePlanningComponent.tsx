import * as React from 'react';
import * as Q from 'q';

import container from "../logic/config/inversify.config";
import IReleasePlanningAlgorithm from "../logic/interfaces/IReleasePlanningAlgorithm";
import SERVICE_IDENTIFIER from "../logic/constants/identifiers";
import ALGORITHM_TYPE from "../logic/constants/algorithmType";
import VSTS_DOCUMENT from "../logic/constants/vstsDocumentID";


import { IWorkItemSearchResult } from "../model/IWorkItemSearchResult";
import { ExtensionDataService } from 'VSS/SDK/Services/ExtensionData';
import { IReleasePlanGeneration } from "../model/IReleasePlanGeneration";

import { Button } from '../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button';
import { ButtonType } from '../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button.Props';
import { IChoiceGroupOption } from '../../node_modules/office-ui-fabric-react/lib-amd/components/ChoiceGroup';
import { Spinner, SpinnerType } from '../../node_modules/office-ui-fabric-react/lib-amd/components/Spinner';
import { MessageBar, MessageBarType } from '../../node_modules/office-ui-fabric-react/lib-amd/components/MessageBar';

import { FeatureList } from "./features/FeatureList";
import { AlgorithmChoice } from "./releaseplan/AlgorithmChoice";
import { ReleasePlanInput } from "./releaseplan/ReleasePlanInput";
import { ReleasePlanResult } from "./releaseplanresult/ReleasePlanResult";
import { Loader } from '../components/common/Loader';

import { WarningMessage } from "./common/WarningMessage";

import { IFeatureService } from "../logic/interfaces/IFeatureService";

interface IReleasePlanningState {
    releasePlanGeneration: IReleasePlanGeneration;
}

export class ReleasePlanningComponent extends React.Component<undefined, IReleasePlanningState> {

    constructor() {
        super();
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

    private componentDidMount() {
        let featureService = container.get<IFeatureService>(SERVICE_IDENTIFIER.IFeatureService);
        let vstsProjectId = VSS.getWebContext().project.id;
        let state = this.state;

        featureService.getAllFeatureByProjectResult(vstsProjectId).then(
            (features: IWorkItemSearchResult) => {
                state.releasePlanGeneration.features = features;
                this.setState(state);
            }
        );

    }

    public render(): JSX.Element {
        let featureSection: JSX.Element = null;
        let algorithmChoiceSection: JSX.Element = null;
        let algorithmGenerationSection: JSX.Element = null;
        let algorithmButtonSection: JSX.Element = null;
        let releasePlanInputSection: JSX.Element = null;

        let workingReleasePlanGeneration: JSX.Element = null;
        let featuresVSTS = this.state.releasePlanGeneration.features;
        if (featuresVSTS) {
            if (featuresVSTS.queryResult.workItems.length > 0) {
                featureSection = <FeatureList features={this.state.releasePlanGeneration.features.queryResult} />
                algorithmChoiceSection = <AlgorithmChoice updateAlgorithmState={this._onChange.bind(this)} disabled={!this._canGenerateReleasePlan(this.state)} />;
                algorithmGenerationSection = <ReleasePlanInput algorithmType={this.state.releasePlanGeneration.algorithmType} updateStateConfig={this.updateConfigState.bind(this)} />
                algorithmButtonSection = this._getAlgorithmButtonSection();

                releasePlanInputSection = <div id="releaseplaninput">
                    <h3>Release Plan Configuration</h3>
                    {algorithmChoiceSection}
                    {algorithmGenerationSection}
                    &nbsp;
                        {algorithmButtonSection}
                </div>;


                let releasePlanResultSection: JSX.Element = null
                let releasePlanGenerationState = this.state.releasePlanGeneration;

                if (releasePlanGenerationState.result) {
                    releasePlanResultSection = <div id="releaseplanresult">
                        <ReleasePlanResult result={releasePlanGenerationState.result} />
                        <div className="actions">
                            <Button onClick={this._onSaveReleasePlanClick.bind(this)} buttonType={ButtonType.primary} className="button-save-release">Save Release Plan</Button>
                            <Button onClick={this._onCancelReleasePlanClick.bind(this)} buttonType={ButtonType.primary} className="button-save-release">Cancel Release Plan</Button>
                        </div>
                    </div>;
                } else if (releasePlanGenerationState.processing) {
                    releasePlanResultSection = <Spinner label='Processing...' />
                } else if (releasePlanGenerationState.error) {
                    releasePlanResultSection = <MessageBar className="release-input-error" messageBarType={MessageBarType.error}>
                            {releasePlanGenerationState.error}</MessageBar>;
                }

                workingReleasePlanGeneration = <div>
                    <h2>Release Plan Generation</h2>
                    {featureSection}
                    {releasePlanInputSection}
                    {releasePlanResultSection}
                </div>;
            } else {
                workingReleasePlanGeneration = <WarningMessage message="The project does not contains features with New or Active State." />;
            }

        } else {
            workingReleasePlanGeneration = <Loader message="Collecting the Project features." />;
        }

        return workingReleasePlanGeneration;
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
        let mockTriangular = {
            Min: null,
            Expected: null,
            Max: null
        };

        if (!releasePlanGenerationState.config) {
            releasePlanGenerationState.config = {};
            triangular ? releasePlanGenerationState.config[configKey] = mockTriangular : releasePlanGenerationState.config[configKey] = null;
            update = true;
        } else {
            if (!releasePlanGenerationState.config[configKey]) {
                triangular ? releasePlanGenerationState.config[configKey] = mockTriangular : releasePlanGenerationState.config[configKey] = null;
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

        let configStatus = algorithmService.validateConfigAlgorithm(config);
        if (configStatus.success) {
            this._setState(true, null);
            VSS.getService(VSS.ServiceIds.ExtensionData).then((dataService: ExtensionDataService) => {
                dataService.getDocuments(VSTS_DOCUMENT.RPDS).then(
                    (featuresDeailtDocument) => {
                        let featuresVSTS = this.state.releasePlanGeneration.features.queryResult.workItems;
                        if (algorithmService.getFeatureData(featuresVSTS, featuresDeailtDocument)) {
                            let releasePlanResult = algorithmService.getOptimalReleasePlan(config);
                            this._setState(false, releasePlanResult);
                            window.location.hash = '#releaseplanresult';
                        } else {
                            this._setStateError("The provided features information is not completed.");
                        }

                    });
            });
        } else {
            this._setStateError(configStatus.error);
        }
    }

    private _onSaveReleasePlanClick(ev: React.MouseEvent<HTMLButtonElement>): void {
        let releasePlan = this.state.releasePlanGeneration.result;
        let messageSuccess = "The optimal ReleasePlan was stored successfully.";
        VSS.getService(VSS.ServiceIds.ExtensionData).then((dataService: ExtensionDataService) => {
            Q.all(dataService.getDocument(VSTS_DOCUMENT.RELEASEPLANDOCUMENT, VSTS_DOCUMENT.RESULTID)).
                then(document => {
                    console.log("GET");
                    console.log(document);
                    document["releasePlanResult"] = releasePlan;
                    dataService.updateDocument(VSTS_DOCUMENT.RELEASEPLANDOCUMENT, document).then(
                        result => {
                            console.log("UPDATE");
                            console.log(result);
                            alert(messageSuccess);
                        }
                    );
                })
                .catch(error => {
                    let createDocument = {
                        id: VSTS_DOCUMENT.RESULTID,
                        releasePlanResult: releasePlan
                    };
                    dataService.createDocument(VSTS_DOCUMENT.RELEASEPLANDOCUMENT, createDocument).then(
                        result => {
                            console.log("CREATE");
                            console.log(result);
                            alert(messageSuccess);
                        }
                    );
                });
        });
    }
    private _onCancelReleasePlanClick(ev: React.MouseEvent<HTMLButtonElement>): void {
        let releasePlanGenerationState = this.state.releasePlanGeneration;

        releasePlanGenerationState.processing = false;
        releasePlanGenerationState.result = null;
        releasePlanGenerationState.error = null;

        this.setState({ releasePlanGeneration: releasePlanGenerationState });
        window.location.hash = '#releaseplaninput';
    }


    private _onChange(ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) {
        this._setStateAlgorithmType(option.key);
    }

}