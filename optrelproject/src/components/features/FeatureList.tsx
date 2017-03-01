import * as React from 'react';

import { DetailsList, CheckboxVisibility, ConstrainMode } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/DetailsList';
import { Button } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button';
import { ButtonType } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button.Props';
import { ChoiceGroup, IChoiceGroupOption } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/ChoiceGroup';
import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';
import { TextField } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/TextField/TextField';

import { IWiqlQueryResult } from "../../model/IWiqlQueryResult";
import { IWorkItemSearchResult } from "../../model/IWorkItemSearchResult";



import { WorkItemFormNavigationService } from "TFS/WorkItemTracking/Services";


export interface FeatureListProps { features: IWiqlQueryResult; }


export class FeatureList extends React.Component<FeatureListProps, undefined> {

    public render() {
        let featureSection: JSX.Element = null;

        featureSection = this._getProjectFeaturesList(this.props.features);

        return <div>
            {featureSection}
        </div>;
    }

    private _getProjectFeaturesList(queryResult: IWiqlQueryResult): JSX.Element {
        let _minWidths = [50, 400, 100];
        let _maxWidths = [50, 500, 100];
        let columns = queryResult.columns.map((c, i) => {
            return {
                key: c.referenceName,
                name: c.name,
                fieldName: c.referenceName,
                minWidth: _minWidths[i],
                maxWidth: _maxWidths[i],
                isResizable: true
            }
        });
        let items = queryResult.workItems.map(wi => wi.fields);

        return <div>
            <DetailsList
                columns={columns}
                items={items}
                checkboxVisibility={CheckboxVisibility.hidden}
                constrainMode={ConstrainMode.horizontalConstrained}
                setKey='set'
                className="features-list-table"
                onItemInvoked={(item) => {
                    WorkItemFormNavigationService.getService().then(svc => {
                        svc.openWorkItem(item["System.Id"]);
                    });
                }}
            />
        </div>;
    }

}