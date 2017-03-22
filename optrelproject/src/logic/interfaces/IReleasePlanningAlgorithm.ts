import { WorkItem } from 'TFS/WorkItemTracking/Contracts';
import {IValidationMessage} from '../../model/IValidationMessage';

/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description Interface for Release Planning Algorithm Implementation
 */
interface IReleasePlanningAlgorithm {    
    /**
     * @function getReleasePlanType
     * @description It return the name of the Algorithm implementation
     * */
    getReleasePlanType(): string;//indicates the algorithm to use
    
    /**
     * @function getFeatureData
     * @param featuresVSTS it represents the VSTS workItems
     * @param featuresDeailtDocument it represents the Feature Template Extension information that is stored on VSTS platform
     * @description It process the VSTS information to be used for the any release planning algorithm
     * */
    getFeatureData(featuresVSTS: WorkItem[], featuresDeailtDocument : any[]): boolean;

    /**
     * @function getOptimalReleasePlan
     * @param config it represents the configuration data for the release plan that user wants
     * @description it returns the alternatives optimal release plans
     * */
    getOptimalReleasePlan(config: any): any;
    
    /**
     * @function validateConfigAlgorithm
     * @param config it represents the configuration data for the release plan that user wants
     * @description It validate if the configuration data is correct, in case of incorrect it must return a message error
     * */
    validateConfigAlgorithm(config: any): IValidationMessage;

}

export default IReleasePlanningAlgorithm;
