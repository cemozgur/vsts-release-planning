import {ReleasePlan} from "../../model/ReleasePlan";

interface IReleasePlanningAlgorithm {
    getReleasePlanType() : string;//indicates the algorithm to use
    setReleasePlan(releasePlan : ReleasePlan);//input
    getOptimalReleasePlan(): ReleasePlan;//ouput
}

export default IReleasePlanningAlgorithm;
