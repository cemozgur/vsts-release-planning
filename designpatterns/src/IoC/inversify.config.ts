import { Container } from "inversify";
import TYPES from "./types";
import { IAlgorithm } from "./Abstract/IAlgorithm";
import { IReleasePlan } from "./Abstract/IReleasePlan";
import { GAAlgorithm } from "./Concrete/GAAlgorithm";
import { IFMAlgorithm } from "./Concrete/IFMAlgorithm";
import { GAReleasePlan } from "./Concrete/GAReleasePlan";
import { IFMReleasePlan } from "./Concrete/IFMReleasePlan";

var ConcreteContainer = new Container();

//Change this
//ConcreteContainer.bind<IAlgorithm>(TYPES.IAlgorithm).to(GAAlgorithm);
ConcreteContainer.bind<IAlgorithm>(TYPES.IAlgorithm).to(IFMAlgorithm);

export {ConcreteContainer};
