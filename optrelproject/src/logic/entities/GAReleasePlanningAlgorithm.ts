import { injectable, inject } from "inversify";
import "reflect-metadata";
import IReleasePlanningAlgorithm from "../interfaces/IReleasePlanningAlgorithm";
import {ReleasePlan} from "../../model/ReleasePlan";

@injectable()
class GAReleasePlanningAlgorithm implements IReleasePlanningAlgorithm{
    private TeamCapability :number[];


    getReleasePlanType():string {
        return "GA Algortihm";
    }
    setReleasePlan(releasePlan: ReleasePlan){

    }
    getOptimalReleasePlan(){
        return null;
    }
}

export default GAReleasePlanningAlgorithm;
