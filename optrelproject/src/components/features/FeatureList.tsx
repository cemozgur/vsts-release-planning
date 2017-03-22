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

/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description React Component for VSTS Features to be considered on the release planning 
 */
export class FeatureList extends React.Component<FeatureListProps, undefined> {
    private description = "Only features with New or Active state will be considered in the generation of a release plan.";

    /** 
     * @function render
     * @description This method belongs to React.Component class
     * this draw the features list that is received through the props
     */
    public render() {
        let featureSection: JSX.Element = null;

        featureSection = this._getProjectFeaturesList(this.props.features);

        return <div>
            {featureSection}
        </div>;
    }

    /** 
     * @function _getProjectFeaturesList
     * @param queryResult
     * @description it return a Office UI Frabric React Component: DeatilsList with the features information, only the title, feature name and state is shown
     */
    private _getProjectFeaturesList(queryResult: IWiqlQueryResult): JSX.Element {
        let _minWidths = [50, 400, 100];
        let _maxWidths = [50, 500, 120];
        let columns = queryResult.columns.map((c, i) => {
            return {
                key: c.referenceName,
                name: c.name,
                fieldName: c.referenceName,
                minWidth: _minWidths[i],
                maxWidth: _maxWidths[i],
                isResizable: false
            }
        });
        let items = queryResult.workItems.map(wi => wi.fields);


        return <div id="featuresRelease" >
            <h3>Features</h3>
            <DetailsList
                className="feature-list-info"
                columns={columns}
                items={items}
                checkboxVisibility={CheckboxVisibility.hidden}
                onItemInvoked={(item) => {
                    WorkItemFormNavigationService.getService().then(svc => {
                        svc.openWorkItem(item["System.Id"]);
                    });
                }}
                setKey='set'
            />
        </div>;
    }

}