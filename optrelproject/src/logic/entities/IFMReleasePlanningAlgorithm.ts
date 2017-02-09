import { injectable, inject } from "inversify";
import "reflect-metadata";
import IReleasePlanningAlgorithm from "../interfaces/IReleasePlanningAlgorithm";
import {ReleasePlan} from "../../model/ReleasePlan";

@injectable()
class IFMReleasePlanningAlgorithm implements IReleasePlanningAlgorithm{
    private TeamCapability :number[];


    getReleasePlanType():string {
        return "IFM Algortihm";
    }
    setReleasePlan(releasePlan: ReleasePlan){

    }
    getOptimalReleasePlan(){
        return null;
    }
}

export default IFMReleasePlanningAlgorithm;
