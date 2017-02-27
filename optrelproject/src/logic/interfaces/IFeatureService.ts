import { IWiqlResult } from "../../model/IWiqlResult";
import { IWorkItemSearchResult } from "../../model/IWorkItemSearchResult";

export interface IFeatureService {
    getAllFeatureByProjectResult(vstsProjectId: string): IPromise<IWorkItemSearchResult>;
    getQueryAllFeature(): IWiqlResult;
}
