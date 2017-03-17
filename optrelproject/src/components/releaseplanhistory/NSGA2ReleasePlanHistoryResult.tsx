import * as React from 'react';

import { DetailsList, CheckboxVisibility } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/DetailsList';
import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';


export interface NSGA2ReleasePlanHistoryResultProps { result: any; }


export class NSGA2ReleasePlanHistoryResult extends React.Component<NSGA2ReleasePlanHistoryResultProps, undefined> {
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
            <hr/>
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

        let _minWidths = [100, 100, 300, 100, 100, 100, 100];
        let _maxWidths = [100, 100, 400, 100, 100, 100, 100];

        let columnsReleasePlan = [
            {
                name: "Sprint #",
                referenceName: "sprint"
            },
            {
                name: "Feature ID",
                referenceName: "workItemId"
            },
            {
                name: "Feature",
                referenceName: "feature"
            },
            {
                name: "Business Value (£)",
                referenceName: "businessValue"
            },
            {
                name: "Cost (£)",
                referenceName: "cost"
            },
            {
                name: "Effort (hours)",
                referenceName: "effort"
            },
            {
                name: "Depends on (By Feature ID)",
                referenceName: "dependsOnWorkItemId"
            }
        ];

        let columns = columnsReleasePlan.map((c, i) => {
            return {
                key: c.referenceName,
                name: c.name,
                fieldName: c.referenceName,
                minWidth: _minWidths[i],
                maxWidth: _maxWidths[i],
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