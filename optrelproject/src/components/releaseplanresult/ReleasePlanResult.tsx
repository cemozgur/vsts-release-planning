import * as React from 'react';

import ALGORITHM_TYPE from "../../logic/constants/algorithmType"

import { IFMReleasePlanResult } from "./IFMReleasePlanResult";
import { NSGA2ReleasePlanResult } from "./NSGA2ReleasePlanResult";
import { Button } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button';
import { ButtonType } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button.Props';

import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';


export interface ReleasePlanResultProps { result: any; algorithmType: string;}


export class ReleasePlanResult extends React.Component<ReleasePlanResultProps, undefined> {

    public render() {
        let releasePlanResult: JSX.Element = null;

        switch (this.props.algorithmType) {
            case ALGORITHM_TYPE.IFM:
                releasePlanResult = <IFMReleasePlanResult result={this.props.result} />
                break;
            case ALGORITHM_TYPE.GA:
                releasePlanResult = <NSGA2ReleasePlanResult result={this.props.result} />;
                break;
        }

        return <div>
            <h3>Release Plan Result</h3>
            {releasePlanResult}
        </div>;
    }
}