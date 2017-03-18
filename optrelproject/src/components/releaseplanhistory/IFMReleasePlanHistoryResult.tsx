import * as React from 'react';

import { DetailsList, CheckboxVisibility } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/DetailsList';
import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';
import { _minIFMWidths, _maxIFMWidths, columnsIFMReleasePlan, IFM_Approach_message } from '../../logic/constants/algorithmViewSection';
import { Util } from '../../logic/entities/Util';

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