import {Feature} from "./Feature";

abstract class ReleasePlan{
    protected features: Array<Feature>;
    protected startDate: string;
    protected endDate: string;
    
}

export {ReleasePlan};