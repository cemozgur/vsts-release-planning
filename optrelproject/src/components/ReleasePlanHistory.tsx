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
export class ReleasePlanHistory extends React.Component<undefined, IReleasePlanHistoryState> {

    constructor() {
        super();
        this.state = this._getDefaultState();
    }

    private _getDefaultState(): IReleasePlanHistoryState {
        let releasePlanGenerationInitial: IReleasePlanHistoryState = {
            features: null,
            error: null,
            processing: false,
            algorithm: ""
        };
        return releasePlanGenerationInitial;
    }
    private componentDidMount() {
        let state = this.state;
        state.processing = true;
        this.setState(state);

        VSS.getService(VSS.ServiceIds.ExtensionData).then((dataService: ExtensionDataService) => {
            Q.all(dataService.getDocument(VSTS_DOCUMENT.RELEASEPLANDOCUMENT, VSTS_DOCUMENT.RESULTID)).
                then(document => {
                    console.log(document);
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
                    console.log(error);
                    state.error = "Currently, you didn't generate an optimal release plane.";
                    state.processing = false;
                    this.setState(state);
                });
        });
    }

    public render(): JSX.Element {
        let releasePlanHistoryResult: JSX.Element = null;

        if (this.state.features) {
            releasePlanHistoryResult = <div>
                <h2>Release Plan History</h2>
                <ReleasePlanHistoryResult result={this.state.features} algorithmType={this.state.algorithm}/>
            </div>;
        } else if (this.state.processing) {
            releasePlanHistoryResult = <Loader message="Collecting your previous optimal Release Plan." />
        } else if (this.state.error) {
            releasePlanHistoryResult = <WarningMessage message={this.state.error} />
        }

        return releasePlanHistoryResult;
    }
}
