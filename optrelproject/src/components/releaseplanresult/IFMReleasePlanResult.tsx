import * as React from 'react';

import { DetailsList, CheckboxVisibility } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/DetailsList';
import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';


export interface IFMReleasePlanResultProps { result: any; }


export class IFMReleasePlanResult extends React.Component<IFMReleasePlanResultProps, undefined> {

    public render() {
        let featureOrder: JSX.Element = null;
        let releasePlan = this.props.result
        featureOrder = this._getReleasePlanFeatures(releasePlan);

        return <div>
            <h2>Release Plan:</h2>
            <div>
                <Label>Cumulated Discount Value: {releasePlan.cumulatedDiscountValue}</Label>
                <Label>Discount Value: {releasePlan.discountValue}</Label>
                <Label>Number of Sprint: {releasePlan.numberOfSprint}</Label>
                <Label>Sprint Duration: {releasePlan.sprintDuration}</Label>
                <Label>Team Capability: {releasePlan.teamCapability}</Label>
                <Label>Total Required Effort: {releasePlan.totalRequiredEffort}</Label>
            </div>
            {featureOrder}
        </div>;
    }


    private _getReleasePlanFeatures(releasePlan: any): JSX.Element {

        let _minWidths = [50, 50, 400, 100, 100, 100, 100, 100];
        let _maxWidths = [50, 50, 500, 100, 100, 100, 100, 100];

        let columnsReleasePlan = [
            {
                name: "Order",
                referenceName: "order"
            },
            {
                name: "Id",
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