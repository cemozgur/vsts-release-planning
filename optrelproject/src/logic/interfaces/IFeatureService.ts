import { IWiqlResult } from "../../model/IWiqlResult";
import { IWorkItemSearchResult } from "../../model/IWorkItemSearchResult";

/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description Interface for exchanging information with VSTS platform, it will follow a Singleton design pattern
 */
export interface IFeatureService {
    /**
     * @function getAllFeatureByProjectResult
     * @param vstsProjectId contains the VSTS ID for the project, it is unique for any project in VSTS
     * @description It obtain all features according to the project.
     * */
    getAllFeatureByProjectResult(vstsProjectId: string): IPromise<IWorkItemSearchResult>;
    
    /**
     * @function getQueryAllFeature
     * @description return the query to obtain Features with New and Activate state
     * */
    getQueryAllFeature(): IWiqlResult;
}
