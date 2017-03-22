import {IWorkItemSearchResult} from "./IWorkItemSearchResult";
/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description Interface for the Front end layer, it controls the structure of the State for React ReleasePlanningComponent
 */
interface IReleasePlanGeneration {
    algorithmType?: string;
    processing?: boolean;
    config?: any;
    result? : any;
    error?: string;

    features?: IWorkItemSearchResult;
}

export {IReleasePlanGeneration};