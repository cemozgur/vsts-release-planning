import { injectable, inject } from "inversify";
import "reflect-metadata";

import * as Q from 'q';

import { getClient, WorkItemTrackingHttpClient } from 'TFS/WorkItemTracking/RestClient';
import { WorkItem, WorkItemFieldReference } from 'TFS/WorkItemTracking/Contracts';
import { WorkItemFormService, WorkItemFormNavigationService } from 'TFS/WorkItemTracking/Services';
import { ExtensionDataService } from 'VSS/SDK/Services/ExtensionData';

import { ignoreCaseComparer } from 'VSS/Utils/String';

import { IFeatureService } from "../interfaces/IFeatureService";

import { IWiqlResult } from "../../model/IWiqlResult";
import { IWorkItemSearchResult } from "../../model/IWorkItemSearchResult";
import { IWiqlQueryResult } from "../../model/IWiqlQueryResult";


/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description FeatureServiceImpl will implement the interface IFeatureService, the methods will consume VSTS rest webservice 
 * these web services will provide us the VSTS feature information
 */
@injectable()
class FeatureServiceImpl implements IFeatureService {

    private _httpClient: WorkItemTrackingHttpClient;

    /**
     * @function httpClient
     * @description It obtain the instantiation of the WorkItemTrackingHttpClient VSTS service
     * */
    public get httpClient(): WorkItemTrackingHttpClient {
        if (!this._httpClient) {
            this._httpClient = getClient();
        }
        return this._httpClient;
    }

    /**
     * @function getQueryAllFeature
     * @description It will return the query needed to consult VSTS features with New and Activate states
     * */
    getQueryAllFeature(): IWiqlResult {
        return {
            wiql: `SELECT [System.Id],
                    [System.Title],
                    [System.State]
                FROM WorkItems
                WHERE  ([System.TeamProject] = @project)  
                AND 
                ([System.WorkItemType] = 'Feature') 
                AND 
                (
                    ([System.State] = 'New')
                    OR
                    ([System.State] = 'Active')
                ) 
                ORDER BY [System.ChangedDate] DESC`
        };
    }

    /**
     * @function getAllFeatureByProjectResult
     * @param vstsProjectId contains the VSTS project ID
     * @description It will return the workItems ID that conforms the query obtained on the method getQueryAllFeature
     * */
    public getAllFeatureByProjectResult(vstsProjectId: string): IPromise<IWorkItemSearchResult> {
        let wiqlResult = this.getQueryAllFeature();

        if (wiqlResult.wiql) {
            return this.httpClient.queryByWiql({ query: wiqlResult.wiql }, vstsProjectId).then(
                queryResult => {
                    // We got the work item ids, now get the field values
                    if (queryResult.workItems.length > 0) {
                        return this.httpClient.getWorkItems(queryResult.workItems.map(wi => wi.id), queryResult.columns.map(wiRef => wiRef.referenceName)).then(
                            workItems => {
                                return <IWorkItemSearchResult>{
                                    queryResult: {
                                        columns: queryResult.columns,
                                        workItems: workItems
                                    }
                                };
                            },
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

}

export default FeatureServiceImpl;