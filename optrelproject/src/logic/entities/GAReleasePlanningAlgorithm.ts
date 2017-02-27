import { injectable, inject } from "inversify";
import "reflect-metadata";
import IReleasePlanningAlgorithm from "../interfaces/IReleasePlanningAlgorithm";


import * as Q from 'q';


@injectable()
class GAReleasePlanningAlgorithm implements IReleasePlanningAlgorithm {
    private TeamCapability: number[];


    getReleasePlanType(): string {
        return "GA Algortihm";
    }
    testDataGeneration(config: any) {
    }

    getOptimalReleasePlan(config: any) {
        return { result: "Implementing" };

    }


    getFeatureData(featuresVSTS: any[], featuresDeailtDocument: any[]) : boolean{
        return true;
    }

        validateConfigAlgorithm(config: any): boolean{
            return true;
        }


}

export default GAReleasePlanningAlgorithm;
