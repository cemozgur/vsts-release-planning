import { WorkItem, WorkItemFieldReference } from 'TFS/WorkItemTracking/Contracts';

interface IWiqlQueryResult {
    columns: WorkItemFieldReference[];
    workItems: WorkItem[];
}

export {IWiqlQueryResult};
