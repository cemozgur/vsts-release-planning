import { ReleasePlan } from "../../model/ReleasePlan";
import { IReleasePlanResult } from "../../model/IReleasePlanResult";
import { IFeatureReleasePlan } from "../../model/IFeatureReleasePlan";

interface IReleasePlanningAlgorithm {

    getReleasePlanType(): string;//indicates the algorithm to use

    getOptimalReleasePlan();//ouput

    testDataGeneration(config: any);

    getPromiseTest(): IPromise<IReleasePlanResult>;//to be deleted

    getFeatureData(featuresVSTS: any[], featuresDeailtDocument : any[]);

}

export default IReleasePlanningAlgorithm;
