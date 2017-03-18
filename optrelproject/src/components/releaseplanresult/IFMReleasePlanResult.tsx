import * as React from 'react';

import { DetailsList, CheckboxVisibility } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/DetailsList';
import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';
import { _minIFMWidths, _maxIFMWidths, columnsIFMReleasePlan } from '../../logic/constants/algorithmViewSection';
import { Util } from '../../logic/entities/Util';

export interface IFMReleasePlanResultProps { result: any; }


export class IFMReleasePlanResult extends React.Component<IFMReleasePlanResultProps, undefined> {

    public render() {
        let featureOrder: JSX.Element = null;
        let releasePlan = this.props.result

        let releasePlanFeedback = Util.getReleasePlanExplanation(releasePlan);
        let releasePlanFeednackView = []
        releasePlanFeedback.map(message => {
            releasePlanFeednackView.push(<Label>{message}</Label>);
        });

        featureOrder = this._getReleasePlanFeatures(releasePlan);
        return <div>
            {releasePlanFeednackView}
            {featureOrder}
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
        />
    }


}