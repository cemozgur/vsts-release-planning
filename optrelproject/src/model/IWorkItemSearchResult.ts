import {IWiqlQueryResult} from "./IWiqlQueryResult";

interface IWorkItemSearchResult {
    queryResult?: IWiqlQueryResult;
    error?: string;
}

export {IWorkItemSearchResult};