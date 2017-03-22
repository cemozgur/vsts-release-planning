import {IWiqlQueryResult} from "./IWiqlQueryResult";

/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2016 OptRel team
 * 
 * @description React Component for "Release Planning" hub, it adds navigation on the hub using React Router
 */
interface IWorkItemSearchResult {
    queryResult?: IWiqlQueryResult;
    error?: string;
}

export {IWorkItemSearchResult};