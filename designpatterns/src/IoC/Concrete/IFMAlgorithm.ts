import {injectable, inject} from "inversify";
import "reflect-metadata";
import {IAlgorithm} from "../Abstract/IAlgorithm";
import {IReleasePlan} from "../Abstract/IReleasePlan";

@injectable()
class IFMAlgorithm implements IAlgorithm{
    getAlgorithmType(){
      return "IFM";
    }

    setReleasePlan(ReleasePlan: IReleasePlan){
      return "ReleasePlan added. ReleasePlanName:"+ ReleasePlan.getReleasePlanType() +".";
    }

}

export {IFMAlgorithm};
