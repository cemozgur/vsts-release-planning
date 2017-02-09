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

container.bind<IReleasePlanningAlgorithm>(TYPES.IReleasePlanningAlgorithm).to(GAReleasePlanningAlgorithm).whenTargetNamed(ALGORITHM_TYPE.GA);

container.bind<IReleasePlanningAlgorithm>(TYPES.IReleasePlanningAlgorithm).to(IFMReleasePlanningAlgorithm).whenTargetNamed(ALGORITHM_TYPE.IFM);


export default container;