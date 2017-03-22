import * as React from 'react';

import { DetailsList, CheckboxVisibility } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/DetailsList';
import { Label } from '../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';
import { _minIFMWidths, _maxIFMWidths, columnsIFMReleasePlan } from '../../logic/constants/algorithmViewSection';
import { Util } from '../../logic/entities/Util';

export interface IFMReleasePlanResultProps { result: any; }

/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description React Component for drawing the Release Plan Result for only NSGA2 Approach 
 */
export class IFMReleasePlanResult extends React.Component<IFMReleasePlanResultProps, undefined> {

    /**
     * @function render
     * @description It read the props parameters, according to the algorithmType attribute it will invoke the React component
     * to draw the result of the IFM optimal alternatives release plan. Keep it mind that IFM will only generate 1 release plan
     */
    public render() {
        let featureOrder: JSX.Element = null;
        let releasePlan = this.props.result
        //It will obtain the Release Plan Feedback
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

    /** _getReleasePlanFeatures
     * @param releasePlan
     * @description It will return a Fabric React Component: DeatilList with the features information for the release plan
     */
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