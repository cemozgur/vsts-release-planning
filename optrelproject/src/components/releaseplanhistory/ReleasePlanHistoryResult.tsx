import * as React from 'react';

import ALGORITHM_TYPE from "../../logic/constants/algorithmType"

import { IFMReleasePlanHistoryResult } from "./IFMReleasePlanHistoryResult";
import { NSGA2ReleasePlanHistoryResult } from "./NSGA2ReleasePlanHistoryResult";
import { Button } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button';
import { ButtonType } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button.Props';

import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';


export interface ReleasePlanHistoryResultProps { result: any; algorithmType: string;}


/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description React Component for drawing the Release Plan Result that is obtained from VSTS JSON storage
 */
export class ReleasePlanHistoryResult extends React.Component<ReleasePlanHistoryResultProps, undefined> {
    /**
     * @function render
     * @description It read the props parameters, according to the algorithmType attribute it will invoke the React component
     * to draw the result of the optimal release plan according to the algorithm type.
     */
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