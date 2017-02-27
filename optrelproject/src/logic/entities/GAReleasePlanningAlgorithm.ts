import { injectable, inject } from "inversify";
import "reflect-metadata";
import IReleasePlanningAlgorithm from "../interfaces/IReleasePlanningAlgorithm";
import { ReleasePlan } from "../../model/ReleasePlan";
import { IReleasePlanResult } from "../../model/IReleasePlanResult";
import { IFeatureReleasePlan } from "../../model/IFeatureReleasePlan";



import * as Q from 'q';


@injectable()
class GAReleasePlanningAlgorithm implements IReleasePlanningAlgorithm {
    private TeamCapability: number[];


    getReleasePlanType(): string {
        return "GA Algortihm";
    }
    testDataGeneration(config: any) {
    }
    getOptimalReleasePlan(): IPromise<IReleasePlanResult> {
        return Q(<IReleasePlanResult>{ result: "Implementing" });

    }

    getPromiseTest(): IPromise<IReleasePlanResult> {
        return Q(<IReleasePlanResult>{ result: "I am sexy and easy." });

    }

    getFeatureData(featuresVSTS: any[]): IPromise<IFeatureReleasePlan> {
        return Q(<IFeatureReleasePlan>{ error: "I am sexy and easy." });
    }
}

export default GAReleasePlanningAlgorithm;
