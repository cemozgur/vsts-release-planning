import * as React from 'react';

import { DetailsList, CheckboxVisibility } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/DetailsList';
import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';
import { _minIFMWidths, _maxIFMWidths, columnsIFMReleasePlan, IFM_Approach_message } from '../../logic/constants/algorithmViewSection';

import { WorkItemFormNavigationService } from "TFS/WorkItemTracking/Services";


export interface IFMReleasePlanHistoryResultProps { result: any; }


export class IFMReleasePlanHistoryResult extends React.Component<IFMReleasePlanHistoryResultProps, undefined> {

    public render() {
        let releasePlanData = this.props.result;//i am receiving an array of release plan.

        return <div>
            {this._getReleasePlanInformation(releasePlanData)}
        </div>;
    }

    private _getReleasePlanInformation(releasePlan: any): JSX.Element {
        let releasePlanExplanation: JSX.Element = null;
        let featureOrder: JSX.Element = null;
        releasePlanExplanation = this._getReleasePlanFeedback(releasePlan);
        featureOrder = this._getReleasePlanFeatures(releasePlan);
        return <div>
            {releasePlanExplanation}
            {featureOrder}
            <hr />
        </div>;
    }


    private _getReleasePlanFeedback(releasePlan: any): JSX.Element {
        let releasePlanExplanation: JSX.Element = null;
        let moreSprint: JSX.Element = null;

        if (releasePlan.additional) {
            moreSprint = <Label>Considering the amount of required effort to finish all features, it is required to increase
                the capacity of the team per sprint, or increment the number of the sprints.
            </Label>
        }
        releasePlanExplanation = <div >
            <Label>Release Planning Approach: {IFM_Approach_message}. </Label>
            <Label>The release plan was generated considering a discount value of {releasePlan.discountValue}%. </Label>
            <Label>All {releasePlan.featureList.length} features are placed in {releasePlan.numberOfSprint} sprints, where
                    each sprint last {releasePlan.sprintDuration} weeks. Additionally, per sprint the whole team can
                    work {releasePlan.teamCapability} hours.
                </Label>
            {moreSprint}
        </div >;
        return releasePlanExplanation;
    }


    private _getReleasePlanFeatures(releasePlan: any): JSX.Element {

        let columns = columnsIFMReleasePlan.map((c, i) => {
            return {
                key: c.referenceName,
                name: c.name,
                fieldName: c.referenceName,
                minWidth: _minIFMWidths[i],
                maxWidth: _maxIFMWidths[i],
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