/// <reference types="vss-web-extension-sdk" />

import * as Q from 'q';
import { getClient, WorkItemTrackingHttpClient } from 'TFS/WorkItemTracking/RestClient';
import { WorkItem, WorkItemFieldReference } from 'TFS/WorkItemTracking/Contracts';
import { ignoreCaseComparer } from 'VSS/Utils/String';

interface IWiqlResult {
    wiql?: string;
    error?: string;
}
export interface IWorkItemSearch {
    getAllFeatureByProjectResult(): IPromise<IWorkItemSearchResult>;
}

export interface IWorkItemSearchResult {
    queryResult?: IWiqlQueryResult;
    error?: string;
}

export interface IWiqlQueryResult {
    columns: WorkItemFieldReference[];
    workItems: WorkItem[];
}


class WorkItemSearch implements IWorkItemSearch {
    private _httpClient: WorkItemTrackingHttpClient;

    public get httpClient(): WorkItemTrackingHttpClient {
        if (!this._httpClient) {
            this._httpClient = getClient();
        }
        return this._httpClient;
    }


    public getAllFeatureByProjectResult(): IPromise<IWorkItemSearchResult> {
        let wiqlResult = this.getQueryAllFeature();
        let projectId = VSS.getWebContext().project.id;

        console.log(this.httpClient);

        if (wiqlResult.wiql) {
            return this.httpClient.queryByWiql({ query: wiqlResult.wiql }, projectId).then(

                queryResult => {
                    // We got the work item ids, now get the field values
                    if (queryResult.workItems.length > 0) {
                        return this.httpClient.getWorkItems(
                                  queryResult.workItems.map(wi => wi.id), queryResult.columns.map(wiRef => wiRef.referenceName)).then(

                                    workItems => { return <IWorkItemSearchResult>{ queryResult: { columns: queryResult.columns, workItems: workItems } }; },
                                    err => { return <IWorkItemSearchResult>{ error: err.message }; });
                    } else {
                        return <IWorkItemSearchResult>{ queryResult: { columns: queryResult.columns, workItems: [] } };
                    }
                },
                err => { return <IWorkItemSearchResult>{ error: err.message }; }

            );
        }

        return Q(<IWorkItemSearchResult>{ error: wiqlResult.error });
    }

    private getQueryAllFeature(): IWiqlResult {

      return {
                wiql: `SELECT [System.Id],
                    [System.Title],
                    [System.State]
                FROM WorkItems
                WHERE  [System.WorkItemType] = 'Feature'
                ORDER BY [System.ChangedDate] DESC`
             };
    }


}

export var Instance: IWorkItemSearch = new WorkItemSearch();
