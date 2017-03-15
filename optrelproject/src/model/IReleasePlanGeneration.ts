import {IWorkItemSearchResult} from "./IWorkItemSearchResult";

interface IReleasePlanGeneration {
    algorithmType?: string;
    processing?: boolean;
    config?: any;
    result? : any;
    error?: string;

    features?: IWorkItemSearchResult;
}

export {IReleasePlanGeneration};