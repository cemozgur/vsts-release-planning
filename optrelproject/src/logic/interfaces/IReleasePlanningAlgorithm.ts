import { WorkItem } from 'TFS/WorkItemTracking/Contracts';
import {IValidationMessage} from '../../model/IValidationMessage';


interface IReleasePlanningAlgorithm {    
    getReleasePlanType(): string;//indicates the algorithm to use

    getFeatureData(featuresVSTS: WorkItem[], featuresDeailtDocument : any[]): boolean;
    testDataGeneration(config: any);
    getOptimalReleasePlan(config: any): any;
    validateConfigAlgorithm(config: any): IValidationMessage;

}

export default IReleasePlanningAlgorithm;
