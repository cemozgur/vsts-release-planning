import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { WorkItemFormNavigationService } from "TFS/WorkItemTracking/Services";
import { DetailsList } from '../../node_modules/office-ui-fabric-react/lib-amd/components/DetailsList/DetailsList';

import { IWorkItemSearchResult } from "../model/IWorkItemSearchResult";
import { IWiqlQueryResult } from "../model/IWiqlQueryResult";


import { Header } from "./Header";


interface IReleasePlanningProps {
    description: string;
    features: IWorkItemSearchResult;
}

interface IReleasePlanningState {
    result?: IWorkItemSearchResult;
}


export class ReleasePlanningComponent extends React.Component<IReleasePlanningProps, IReleasePlanningState> {
    private _widths = [100, 800, 200];

    constructor(props?: IReleasePlanningProps) {
        super(props);
        this.state = this._getDefaultState();
    }


    public render(): JSX.Element {
        let featureSection: JSX.Element = null;
        featureSection = this._getWorkItemsList(this.props.features.queryResult);

        return <div>
            <Header description={this.props.description} />
            {featureSection}
            
        </div>;
    }





    private _getDefaultState(): IReleasePlanningState {
        return {
            result: {}
        };
    }

    private _getWorkItemsList(queryResult: IWiqlQueryResult): JSX.Element {
        let columns = queryResult.columns.map((c, i) => { return { key: c.referenceName, name: c.name, fieldName: c.referenceName, minWidth: this._widths[i] } });
        let items = queryResult.workItems.map(wi => wi.fields);

        return <DetailsList
            columns={columns}
            items={items}
            setKey='set'
            onItemInvoked={(item) => {
                WorkItemFormNavigationService.getService().then(svc => {
                    svc.openWorkItem(item["System.Id"]);
                });
            }}
        />
    }


    private _setSearchResult(result: IWorkItemSearchResult): void {
        this.state.result = result;
        this.setState(this.state);
    }

}