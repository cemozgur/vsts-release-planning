import { WorkItem } from 'TFS/WorkItemTracking/Contracts';

interface IReleasePlanningAlgorithm {

    getReleasePlanType(): string;//indicates the algorithm to use

    getFeatureData(featuresVSTS: WorkItem[], featuresDeailtDocument : any[]): boolean;
    testDataGeneration(config: any);
    getOptimalReleasePlan(config: any): any;

}

export default IReleasePlanningAlgorithm;
