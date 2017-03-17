import * as React from 'react';

import ALGORITHM_TYPE from "../../logic/constants/algorithmType"

import { IFMReleasePlanHistoryResult } from "./IFMReleasePlanHistoryResult";
import { NSGA2ReleasePlanHistoryResult } from "./NSGA2ReleasePlanHistoryResult";
import { Button } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button';
import { ButtonType } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button.Props';

import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';


export interface ReleasePlanHistoryResultProps { result: any; algorithmType: string;}


export class ReleasePlanHistoryResult extends React.Component<ReleasePlanHistoryResultProps, undefined> {

    public render() {
        let releasePlanResult: JSX.Element = null;

        switch (this.props.algorithmType) {
            case ALGORITHM_TYPE.IFM:
                releasePlanResult = <IFMReleasePlanHistoryResult result={this.props.result} />
                break;
            case ALGORITHM_TYPE.GA:
                releasePlanResult = <NSGA2ReleasePlanHistoryResult result={this.props.result} />;
                break;
        }

        return <div>
            <h3>Release Plan Result</h3>
            {releasePlanResult}
        </div>;
    }
}