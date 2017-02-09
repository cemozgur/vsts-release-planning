import {ConcreteContainer} from "./inversify.config";
import { IAlgorithm } from "./Abstract/IAlgorithm";
import TYPES from "./types";

var algorithm = ConcreteContainer.get<IAlgorithm>(TYPES.IAlgorithm);

console.log(algorithm.getAlgorithmType());
