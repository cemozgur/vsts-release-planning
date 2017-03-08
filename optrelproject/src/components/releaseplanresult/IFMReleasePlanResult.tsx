import * as React from 'react';

import { DetailsList, CheckboxVisibility } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/DetailsList';
import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';


export interface IFMReleasePlanResultProps { result: any; }


export class IFMReleasePlanResult extends React.Component<IFMReleasePlanResultProps, undefined> {

    public render() {
        let releasePlanExplanation: JSX.Element = null;
        let moreSprint: JSX.Element = null;
        let featureOrder: JSX.Element = null;

        let releasePlan = this.props.result
        featureOrder = this._getReleasePlanFeatures(releasePlan);

        if (releasePlan.additional) {
            moreSprint = <Label>Considering the amount of required effort to finish all features, it is required to increase
                the capacity of the team per sprint, or increment the number of the sprints.
            </Label>
        }
        releasePlanExplanation = <div>
            <Label>The release plan was generated considering a discount value of {releasePlan.discountValue}%. </Label>
            <Label>All {releasePlan.featureList.length} features are placed in {releasePlan.numberOfSprint} sprints, where
                    each sprint last {releasePlan.sprintDuration} weeks. Additionally, per sprint the whole team can
                    work {releasePlan.teamCapability} hours.
                </Label>
            {moreSprint}

        </div>;
        return <div>
            {releasePlanExplanation}
            {featureOrder}
        </div>;
    }


    private _getReleasePlanFeatures(releasePlan: any): JSX.Element {

        let _minWidths = [50, 50, 400, 100, 100, 100, 100, 100];
        let _maxWidths = [50, 50, 500, 100, 100, 100, 100, 100];

        let columnsReleasePlan = [
            {
                name: "Sprint",
                referenceName: "sprint"
            },
            {
                name: "ID",
                referenceName: "workItemId"
            },
            {
                name: "Feature Name",
                referenceName: "feature"
            },
            {
                name: "Business Value",
                referenceName: "bussinesValue"
            },
            {
                name: "Cost",
                referenceName: "cost"
            },
            {
                name: "Effort",
                referenceName: "effort"
            },
            {
                name: "Time Critically",
                referenceName: "timeCriticality"
            },
            {
                name: "Dependency",
                referenceName: "dependencyWorkItemId"
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