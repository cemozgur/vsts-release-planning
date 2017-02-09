import {injectable, inject} from "inversify";
import "reflect-metadata";
import {IAlgorithm} from "../Abstract/IAlgorithm";
import {IReleasePlan} from "../Abstract/IReleasePlan";

@injectable()
class GAAlgorithm implements IAlgorithm{

    public construct(){

    }

    getAlgorithmType(){
      return "GA";
    }

    setReleasePlan(ReleasePlan: IReleasePlan){
      return "ReleasePlan added. ReleasePlanName:"+ ReleasePlan.getReleasePlanType() +".";
    }

}

export {GAAlgorithm};
