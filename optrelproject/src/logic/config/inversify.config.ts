import { Container } from "inversify";
import TYPES from "../constants/identifiers";
import ALGORITHM_TYPE from "../constants/algorithmType";

import GAReleasePlanningAlgorithm from "../entities/GAReleasePlanningAlgorithm";
import IFMReleasePlanningAlgorithm from "../entities/IFMReleasePlanningAlgorithm";
import IReleasePlanningAlgorithm from "../interfaces/IReleasePlanningAlgorithm";

/**
 * This is the only place in which there is some coupling.
 * In the rest of your application your classes should be free of references to other classes.
 */
var container = new Container();

var algorithmType = ALGORITHM_TYPE.GA;

switch (algorithmType) {
    case ALGORITHM_TYPE.GA:
        container.bind<IReleasePlanningAlgorithm>(TYPES.IReleasePlanningAlgorithm).to(GAReleasePlanningAlgorithm);
        break;
    case ALGORITHM_TYPE.IFM:
        container.bind<IReleasePlanningAlgorithm>(TYPES.IReleasePlanningAlgorithm).to(IFMReleasePlanningAlgorithm);
        break;
}

export default container;