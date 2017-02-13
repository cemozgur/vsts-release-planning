import {ReleasePlan} from "../../model/ReleasePlan";

interface IReleasePlanningAlgorithm {
    getReleasePlanType() : string;//indicates the algorithm to use
    getOptimalReleasePlan(): any;//ouput

    testDataGeneration(config : any);
}

export default IReleasePlanningAlgorithm;
