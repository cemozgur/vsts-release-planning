import * as React from 'react';
import * as Q from 'q';

import container from "../logic/config/inversify.config";
import IReleasePlanningAlgorithm from "../logic/interfaces/IReleasePlanningAlgorithm";
import SERVICE_IDENTIFIER from "../logic/constants/identifiers";
import ALGORITHM_TYPE from "../logic/constants/algorithmType";
import VSTS_DOCUMENT from "../logic/constants/vstsDocumentID";
import { Util } from "../logic/entities/Util";


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

/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description React Component for Replease Plan Generation Section
 */
export class ReleasePlanningComponent extends React.Component<undefined, IReleasePlanningState> {

    constructor() {
        super();
        this.state = this._getDefaultState();
    }

    /** 
     * @function _getDefaultState
     * @description It initialize the React Component status with empty values and the algorithm type for IFM by default
     */
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

    /** 
     * @function componentDidMount
     * @description This method belongs to React.Component class, this will be executed only once, this method
     * will use the FeatureService to obtain the Features with New and Active state
     */
    private componentDidMount() {
        //Dependecy Injection for FeatureService
        let featureService = container.get<IFeatureService>(SERVICE_IDENTIFIER.IFeatureService);
        //VSTS project ID
        let vstsProjectId = VSS.getWebContext().project.id;
        let state = this.state;

        featureService.getAllFeatureByProjectResult(vstsProjectId).then(
            (features: IWorkItemSearchResult) => {
                state.releasePlanGeneration.features = features;
                this.setState(state);
            }
        );

    }

    /** 
     * @function render
     * @description This method belongs to React.Component class, this will be executed everytime the React Component State is updated,
     * this draw the following React Components, Features, Algorithm Choise, Release Plan Input, Release Plan Result
     */
    public render(): JSX.Element {
        let featureSection: JSX.Element = null;
        let algorithmChoiceSection: JSX.Element = null;
        let algorithmGenerationSection: JSX.Element = null;
        let algorithmButtonSection: JSX.Element = null;
        let releasePlanInputSection: JSX.Element = null;

        let workingReleasePlanGeneration: JSX.Element = null;
        let featuresVSTS = this.state.releasePlanGeneration.features;
        if (featuresVSTS) {
            //if there is more than 0 VSTS features
            if (featuresVSTS.queryResult.workItems.length > 0) {
                //FeatureList component is rendered, it receives the VSTS features data as a parameter
                featureSection = <FeatureList features={this.state.releasePlanGeneration.features.queryResult} />
                //AlgorithmChoice component is rendered, it receives the function _onChange as a parameter
                algorithmChoiceSection = <AlgorithmChoice updateAlgorithmState={this._onChange.bind(this)} disabled={!this._canGenerateReleasePlan(this.state)} />;
                //ReleasePlanInput component is rendered, it receives the algorithmType selected and the function updateConfigState as parameters
                algorithmGenerationSection = <ReleasePlanInput algorithmType={this.state.releasePlanGeneration.algorithmType} updateStateConfig={this.updateConfigState.bind(this)} />
                //It renders the button for Generate Release Plan
                algorithmButtonSection = this._getAlgorithmButtonSection();

                //Put together previous components into a div
                releasePlanInputSection = <div id="releaseplaninput">
                    <h3>Release Plan Optimisation Configuration</h3>
                    {algorithmChoiceSection}
                    {algorithmGenerationSection}
                    &nbsp;
                        {algorithmButtonSection}
                </div>;


                let releasePlanResultSection: JSX.Element = null
                let releasePlanGenerationState = this.state.releasePlanGeneration;

                //Verify if the state has been updated with the release plans result
                if (releasePlanGenerationState.result) {
                    //Creates the React component ReleasePlanResult, it receives as parameters the release plan result object and the algorithm type
                    releasePlanResultSection = <div id="releaseplanresult">
                        <ReleasePlanResult result={releasePlanGenerationState.result} algorithmType={releasePlanGenerationState.algorithmType} />
                        <div className="actions">
                            <Button onClick={this._onSaveReleasePlanClick.bind(this)} buttonType={ButtonType.primary} className="button-save-release">Save Release Plan</Button>
                            <Button onClick={this._onCancelReleasePlanClick.bind(this)} buttonType={ButtonType.primary} className="button-save-release">Cancel Release Plan</Button>
                        </div>
                    </div>;
                } else if (releasePlanGenerationState.processing) {
                    //while the Release Planning Approach is processing the features information, it renders a spinner to provide feedback to the user
                    releasePlanResultSection = <Spinner label='Processing...' />
                } else if (releasePlanGenerationState.error) {
                    //in case the state contains error, it renders the message
                    releasePlanResultSection = <MessageBar className="release-input-error" messageBarType={MessageBarType.error}>
                        {releasePlanGenerationState.error}</MessageBar>;
                }
                //it renders previous React components
                workingReleasePlanGeneration = <div>
                    <h2>Release Plan Generation</h2>
                    {featureSection}
                    {releasePlanInputSection}
                    {releasePlanResultSection}
                </div>;
            } else {
                //when there is no features on the project, it renders a warning message
                workingReleasePlanGeneration = <WarningMessage message="The project does not contains features with New or Active State." />;
            }

        } else {
            //when there is invoking the rest web services from VSTS to obtain the features data, it will show a spinner
            workingReleasePlanGeneration = <Loader message="Collecting the Project features." />;
        }

        return workingReleasePlanGeneration;
    }

    /**
     * @function _canGenerateReleasePlan
     * @param state React Component state
     * @description Return false when the Release Planning is processing the feature data
     */
    private _canGenerateReleasePlan(state: IReleasePlanningState): boolean {
        return !state.releasePlanGeneration.processing;
    }

    /**
     * @function _setState
     * @param processing indicates if it is processing the release plan
     * @param releasePlanResult contains the release plan result
     * @description Update the React Component State according to the above parameters
     */
    private _setState(processing: boolean, releasePlanResult: any) {
        let releasePlanGenerationState = this.state.releasePlanGeneration;

        releasePlanGenerationState.processing = processing;
        releasePlanGenerationState.result = releasePlanResult;
        releasePlanGenerationState.error = null
        this.setState({ releasePlanGeneration: releasePlanGenerationState });
    }

    /**
     * @function _setStateError
     * @param error 
     * @description Update the attribute error from the React Component State with the parameter erro
     */
    private _setStateError(error: string) {
        let releasePlanGenerationState = this.state.releasePlanGeneration;

        releasePlanGenerationState.processing = false;
        releasePlanGenerationState.result = null;
        releasePlanGenerationState.error = error;

        this.setState({ releasePlanGeneration: releasePlanGenerationState });
    }

    /**
     * @function _setStateAlgorithmType
     * @param algorithmType 
     * @description Update the attribute algorithm from the React Component State with the parameter algorithmType
     */
    private _setStateAlgorithmType(algorithmType: string) {
        let releasePlanGenerationState = this.state.releasePlanGeneration;

        releasePlanGenerationState.algorithmType = algorithmType;
        releasePlanGenerationState.processing = false;
        releasePlanGenerationState.config = null;
        releasePlanGenerationState.result = null;
        releasePlanGenerationState.error = null;

        this.setState({ releasePlanGeneration: releasePlanGenerationState });
    }

    /**
     * @function updateConfigState
     * @param configKey
     * @param name
     * @param value
     * @description Update the attribute config from the React Component State with the and object with attribute name equals to configKey,
     * name is used when it is a triangular distribution, and value is the value for the attribute just created
     */
    private updateConfigState(configKey, name, value) {
        if (name) {//verify if the config is a triangular distribution
            this.setStateConfigKey(configKey, true);
            this.state.releasePlanGeneration.config[configKey][name] = value;
        } else {
            this.setStateConfigKey(configKey, false);
            this.state.releasePlanGeneration.config[configKey] = value;
        }
    }

    /**
     * @function setStateConfigKey
     * @param configKey
     * @param triangular
     * @description Update the attribute config from the React Component State with the and object with attribute name equals to configKey,
     * name is used when it is a triangular distribution, and value is the value for the attribute just created
     */
    private setStateConfigKey(configKey: string, triangular: boolean): void {
        let releasePlanGenerationState = this.state.releasePlanGeneration;
        let update = false;
        //structure for a config object with triangular distribution
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

    /**
     * @function _getAlgorithmButtonSection
     * @description It renders the React Button for Generate Release Plan
     */
    private _getAlgorithmButtonSection(): JSX.Element {
        return <div>
            <div className="actions">
                <Button onClick={this._onGenerateReleasePlanClick.bind(this)} buttonType={ButtonType.primary} disabled={!this._canGenerateReleasePlan(this.state)} className="action-button">Generate Release Plan</Button>
            </div>
        </div>
    }

    /**
     * @function _onGenerateReleasePlanClick
     * @param ev
     * @description contains the logic for obtaining the release plans result according to the selected algorithm type 
     */
    private _onGenerateReleasePlanClick(ev: React.MouseEvent<HTMLButtonElement>): void {
        //Dependency Injection for Release Planning Algorithm (can be IFM or NSGA2)
        let algorithmService = container.getNamed<IReleasePlanningAlgorithm>(SERVICE_IDENTIFIER.IReleasePlanningAlgorithm, this.state.releasePlanGeneration.algorithmType);
        let config = this.state.releasePlanGeneration.config;

        //Validate if the user input for the release plan generation is correct
        let configStatus = algorithmService.validateConfigAlgorithm(config);
        if (configStatus.success) {
            this._setState(true, null);
            VSS.getService(VSS.ServiceIds.ExtensionData).then((dataService: ExtensionDataService) => {
                //obtain the addtional information from the Feature Template extension
                dataService.getDocuments(VSTS_DOCUMENT.RPDS).then(
                    (featuresDeailtDocument) => {
                        let featuresVSTS = this.state.releasePlanGeneration.features.queryResult.workItems;
                        //Process the VSTS features information, return true if the information is correct, otherwise is false
                        if (algorithmService.getFeatureData(featuresVSTS, featuresDeailtDocument)) {
                            //Invokes the method to obtain the release plans result
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

    /**
     * @function isCorrectAlternative
     * @param alternative
     * @param options
     * @description verify if the alternative ID release plan result is correct according to the Release Plans result
     */
    private isCorrectAlternative(alternative: any, options: number) {
        if (Util.isNumber(alternative)) {
            let optionTarget = parseInt(alternative);
            if (optionTarget > 0 && optionTarget <= options) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    
    /**
     * @function storeReleasePlan
     * @param releasePlan contains the Release Plan Object
     * @description it stores the selected release plan into VSTS JSON storage
     */
    private storeReleasePlan(releasePlan: any) {
        let messageSuccess = "The optimal ReleasePlan was stored successfully.";
        //obtain the VSTS service to storage information
        VSS.getService(VSS.ServiceIds.ExtensionData).then((dataService: ExtensionDataService) => {
            Q.all(dataService.getDocument(VSTS_DOCUMENT.RELEASEPLANDOCUMENT, VSTS_DOCUMENT.RESULTID)).
                then(document => {
                    //the document exists, it means it has to be updated
                    document["releasePlanResult"] = releasePlan;
                    //update the document with the new release plan
                    dataService.updateDocument(VSTS_DOCUMENT.RELEASEPLANDOCUMENT, document).then(
                        result => {
                            alert(messageSuccess);
                        }
                    );
                })
                .catch(error => {
                    //it means that the result plan was never stored before
                    let createDocument = {
                        id: VSTS_DOCUMENT.RESULTID,
                        releasePlanResult: releasePlan
                    };
                    //it creates the VSTS JSON storage with the release plan result object
                    dataService.createDocument(VSTS_DOCUMENT.RELEASEPLANDOCUMENT, createDocument).then(
                        result => {
                            alert(messageSuccess);
                        }
                    );
                });
        });
    }
        
    /**
     * @function _onSaveReleasePlanClick
     * @param ev
     * @description it verify if the release plan result object is an array (if it contains more than one solution), then invokes the method
     * to store it on the VSTS platform
     */
    private _onSaveReleasePlanClick(ev: React.MouseEvent<HTMLButtonElement>): void {
        let releasePlan = this.state.releasePlanGeneration.result;

        if (Array.isArray(releasePlan)) {
            //ask the user which alternative wants to store
            let alternative = prompt("Which release plan alternative would you like to apply? Please insert only the number of the alternative.", "1");
            //verify if the alternative inputted is correct
            if(this.isCorrectAlternative(alternative, releasePlan.length)){
                //call method to store the release plan object
                this.storeReleasePlan(releasePlan[parseInt(alternative) - 1]);
            } else {
                alert("You have selected a wrong release plan alternative.");
            }
        } else {
            this.storeReleasePlan(releasePlan);
        }
    }
            
    /**
     * @function _onCancelReleasePlanClick
     * @param ev
     * @description it clean the state for a new generation of an optimal release plan
     */
    private _onCancelReleasePlanClick(ev: React.MouseEvent<HTMLButtonElement>): void {
        let releasePlanGenerationState = this.state.releasePlanGeneration;

        releasePlanGenerationState.processing = false;
        releasePlanGenerationState.result = null;
        releasePlanGenerationState.error = null;

        this.setState({ releasePlanGeneration: releasePlanGenerationState });
        window.location.hash = '#releaseplaninput';
    }

    /**
     * @function _onChange
     * @param ev
     * @description it updates the React Component state with the selected algorithmType
     */
    private _onChange(ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) {
        this._setStateAlgorithmType(option.key);
    }

}