import { WorkItem, WorkItemFieldReference } from 'TFS/WorkItemTracking/Contracts';
/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description Interface for the VSTS workItems structure
 */
interface IWiqlQueryResult {
    columns: WorkItemFieldReference[];
    workItems: WorkItem[];
}

export {IWiqlQueryResult};
