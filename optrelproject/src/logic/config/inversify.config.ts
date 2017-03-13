import { Container } from "inversify";
import TYPES from "../constants/identifiers";
import ALGORITHM_TYPE from "../constants/algorithmType";
import DATA_SIMULATOR_TYPE from "../constants/datasimulatortype"

import NSGA2ReleasePlanningAlgorithm from "../entities/NSGA2ReleasePlanningAlgorithm";
import IFMReleasePlanningAlgorithm from "../entities/IFMReleasePlanningAlgorithm";
import FeatureServiceImpl from "../entities/FeatureServiceImpl";

import MonteCarloSimulation from "../entities/MonteCarloSimulation"
import IDataSimulator from "../interfaces/IDataSimulator";

import IReleasePlanningAlgorithm from "../interfaces/IReleasePlanningAlgorithm";
import {IFeatureService} from "../interfaces/IFeatureService";


/**
 * This is the only place in which there is some coupling.
 * In the rest of your application your classes should be free of references to other classes.
 */
var container = new Container();

container.bind<IReleasePlanningAlgorithm>(TYPES.IReleasePlanningAlgorithm).to(NSGA2ReleasePlanningAlgorithm).whenTargetNamed(ALGORITHM_TYPE.GA);

container.bind<IReleasePlanningAlgorithm>(TYPES.IReleasePlanningAlgorithm).to(IFMReleasePlanningAlgorithm).whenTargetNamed(ALGORITHM_TYPE.IFM);

container.bind<IFeatureService>(TYPES.IFeatureService).to(FeatureServiceImpl).inSingletonScope();

container.bind<IDataSimulator>(TYPES.IDataSimulator).to(MonteCarloSimulation).whenTargetNamed(DATA_SIMULATOR_TYPE.Monte_Carlo);


export default container;
