import * as React from 'react';

import { DetailsList, CheckboxVisibility } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/DetailsList';
import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';
import { _minNSGA2Widths, _maxNSGA2Widths, columnsNSGA2ReleasePlan, NSGA2_Approach_message } from '../../logic/constants/algorithmViewSection';
import { WorkItemFormNavigationService } from "TFS/WorkItemTracking/Services";
import { Util } from '../../logic/entities/Util';


export interface NSGA2ReleasePlanHistoryResultProps { result: any; }


export class NSGA2ReleasePlanHistoryResult extends React.Component<NSGA2ReleasePlanHistoryResultProps, undefined> {
    public render() {
        let releasePlanData = this.props.result;

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