import {IReleasePlan} from "../Abstract/IReleasePlan";

class IFMReleasePlan implements IReleasePlan{
    getReleasePlanType(){
      return "IFM Release Plan";
    }
}

export {IFMReleasePlan};
