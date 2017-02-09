import {IReleasePlan} from "../Abstract/IReleasePlan";

class GAReleasePlan implements IReleasePlan{
    getReleasePlanType(){
      return "GA Release Plan";
    }
}

export {GAReleasePlan};
