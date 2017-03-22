import * as React from 'react';

import { DetailsList, CheckboxVisibility } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/DetailsList';
import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';
import { _minNSGA2Widths, _maxNSGA2Widths, columnsNSGA2ReleasePlan, NSGA2_Approach_message } from '../../logic/constants/algorithmViewSection';
import { WorkItemFormNavigationService } from "TFS/WorkItemTracking/Services";
import { Util } from '../../logic/entities/Util';


export interface NSGA2ReleasePlanHistoryResultProps { result: any; }

/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description React Component for drawing the Release Plan Result for only NSGA2 Approach 
 */
export class NSGA2ReleasePlanHistoryResult extends React.Component<NSGA2ReleasePlanHistoryResultProps, undefined> {
    /**
     * @function render
     * @description It read the props parameters, according to the algorithmType attribute it will invoke the React component
     * to draw the result of the NSGA2 optimal alternatives release plan. Keep it mind that it is going to be only once release plan 
     * as the user only select one from all alternatives
     */
    public render() {
        let releasePlanData = this.props.result;

        return <div>
            {this._getReleasePlanInformation(releasePlanData)}
        </div>;
    }
    /** _getReleasePlanInformation
     * @param releasePlan
     * @param index
     * @description it will obtain the release plan information for a release plan result
     */
    private _getReleasePlanInformation(releasePlan: any): JSX.Element {
        let featureOrder: JSX.Element = null;


        let releasePlanFeedback = Util.getReleasePlanExplanationHistory(releasePlan);
        let releasePlanFeednackView = [];
        releasePlanFeedback.map(message => {
            releasePlanFeednackView.push(<Label>{message}</Label>);
        });

        featureOrder = this._getReleasePlanFeatures(releasePlan);
        return <div>
            {releasePlanFeednackView}
            {featureOrder}
            <hr />
        </div>;
    }


    /** _getReleasePlanFeatures
     * @param releasePlan
     * @description It will return a Fabric React Component: DeatilList with the features information for the release plan,
     * additionally per row, the user can open the VSTS information for each features.
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
            onItemInvoked={(item) => {
                WorkItemFormNavigationService.getService().then(svc => {
                    svc.openWorkItem(item["workItemId"]);
                });
            }}
        />
    }

}