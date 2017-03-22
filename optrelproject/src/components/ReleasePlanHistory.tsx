import * as React from 'react';
import * as Q from 'q';
import { Link } from "react-router";

import VSTS_DOCUMENT from "../logic/constants/vstsDocumentID";
import { ExtensionDataService } from 'VSS/SDK/Services/ExtensionData';
import { WarningMessage } from "./common/WarningMessage";
import { Loader } from '../components/common/Loader';
import { ReleasePlanHistoryResult } from "./releaseplanhistory/ReleasePlanHistoryResult";

interface IReleasePlanHistoryState {
    features: any;
    error: string;
    processing: boolean;
    algorithm: string;
}

/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description React Component for Replease Plan History  Section
 */
export class ReleasePlanHistory extends React.Component<undefined, IReleasePlanHistoryState> {

    constructor() {
        super();
        this.state = this._getDefaultState();
    }

    /** 
     * @function _getDefaultState
     * @description It initialize the React Component status with empty values
     */
    private _getDefaultState(): IReleasePlanHistoryState {
        let releasePlanGenerationInitial: IReleasePlanHistoryState = {
            features: null,
            error: null,
            processing: false,
            algorithm: ""
        };
        return releasePlanGenerationInitial;
    }
    
    /** 
     * @function componentDidMount
     * @description This method belongs to React.Component class, this will be executed only once, this method
     * will recover the selected Release Plan Result Object from the VSTS JSON storage
     */
    private componentDidMount() {
        let state = this.state;
        state.processing = true;
        this.setState(state);

        //consult if the JSON storage contains any release plan result object
        VSS.getService(VSS.ServiceIds.ExtensionData).then((dataService: ExtensionDataService) => {
            Q.all(dataService.getDocument(VSTS_DOCUMENT.RELEASEPLANDOCUMENT, VSTS_DOCUMENT.RESULTID)).
                then(document => {
                    state.features = document["releasePlanResult"];
                    state.processing = false;
                    
                    if(Array.isArray(state.features)){
                        state.algorithm = state.features[0]["algorithmType"];
                    } else {
                        state.algorithm = state.features.algorithmType;
                    }

                    this.setState(state);
                })
                .catch(error => {
                    //in case there is nothing stored on the VSTS JSON storage, it shows a warning message
                    state.error = "Currently, you didn't generate an optimal release plane.";
                    state.processing = false;
                    this.setState(state);
                });
        });
    }

    /** 
     * @function render
     * @description This method belongs to React.Component class, this will be executed everytime the React Component State is updated,
     * this draw the following Label that contains the explanation of the release plan result and the Grid with the features order and data
     */
    public render(): JSX.Element {
        let releasePlanHistoryResult: JSX.Element = null;

        if (this.state.features) {
            //it renders the React Component ReleasePlanHistoryResult, it receives the release plan result object and the algorithm type as parameters
            releasePlanHistoryResult = <div>
                <h2>Release Plan History</h2>
                <ReleasePlanHistoryResult result={this.state.features} algorithmType={this.state.algorithm}/>
            </div>;
        } else if (this.state.processing) {
            //it renders a spinner while it is waiting for VSTS REST web service answer for JSON storage
            releasePlanHistoryResult = <Loader message="Collecting your previous optimal Release Plan." />
        } else if (this.state.error) {
            releasePlanHistoryResult = <WarningMessage message={this.state.error} />
        }

        return releasePlanHistoryResult;
    }
}
