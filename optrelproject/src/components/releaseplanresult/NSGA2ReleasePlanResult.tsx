import * as React from 'react';

import { DetailsList, CheckboxVisibility } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/DetailsList';
import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';
import { _minNSGA2Widths, _maxNSGA2Widths, columnsNSGA2ReleasePlan } from '../../logic/constants/algorithmViewSection';
import { Util } from '../../logic/entities/Util';


export interface NSGA2ReleasePlanResultProps { result: any; }

/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description React Component for drawing the Release Plan Result for only NSGA2 Approach 
 */
export class NSGA2ReleasePlanResult extends React.Component<NSGA2ReleasePlanResultProps, undefined> {

    /**
     * @function render
     * @description It read the props parameters, according to the algorithmType attribute it will invoke the React component
     * to draw the result of the NSGA2 optimal alternatives release plan. Keep it mind that NSGA2 will generate from 1 to 3 alternatives
     */
    public render() {
        var releasePlanOption = [];
        let releasePlanData = this.props.result;//i am receiving an array of release plan.

        releasePlanData.map((releasePlanInformation, index) => {
            releasePlanOption.push(this._getReleasePlanInformation(releasePlanInformation, index));
        });


        return <div>
            {releasePlanOption}
        </div>;


    }

    /** _getReleasePlanInformation
     * @param releasePlan
     * @param index
     * @description it will obtain the release plan information for a release plan result
     */
    private _getReleasePlanInformation(releasePlan: any, index: number): JSX.Element {
        let featureOrder: JSX.Element = null;

        let releasePlanFeedback = Util.getReleasePlanExplanation(releasePlan);
        let releasePlanFeednackView = []
        releasePlanFeedback.map(message => {
            releasePlanFeednackView.push(<Label>{message}</Label>);
        });


        featureOrder = this._getReleasePlanFeatures(releasePlan);
        return <div>
            <h4>Alternative Solution {index + 1}</h4>
            {releasePlanFeednackView}
            {featureOrder}
            <hr />
        </div>;
    }

    /** _getReleasePlanFeatures
     * @param releasePlan
     * @description It will return a Fabric React Component: DeatilList with the features information for the release plan
     */
    private _getReleasePlanFeatures(releasePlan: any): JSX.Element {

        let columns = columnsNSGA2ReleasePlan.map((c, i) => {
            return {
                key: c.referenceName,
                name: c.name,
                fieldName: c.referenceName,
                minWidth: _minNSGA2Widths[i],
                maxWidth: _maxNSGA2Widths[i],
                isResizable: false
            }
        });
        let items = releasePlan.featureList.map(wi => wi);

        return <DetailsList
            columns={columns}
            items={items}
            checkboxVisibility={CheckboxVisibility.hidden}
            setKey='set'
        />
    }

}