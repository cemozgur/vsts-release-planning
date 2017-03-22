import {IWiqlQueryResult} from "./IWiqlQueryResult";

/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description Interface for FeatureService to read query results
 */
interface IWorkItemSearchResult {
    queryResult?: IWiqlQueryResult;
    error?: string;
}

export {IWorkItemSearchResult};