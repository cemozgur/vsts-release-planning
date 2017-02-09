import {FeatureInfo} from "./FeatureInfo";

abstract class ReleasePlan{
    protected features: Array<FeatureInfo>;
    protected startDate: string;
    protected endDate: string;
    
}

export {ReleasePlan};