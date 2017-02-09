import {IReleasePlan} from "./IReleasePlan";

interface IAlgorithm {
  getAlgorithmType(): string;
  setReleasePlan(ReleasePlan: IReleasePlan);
}

export {IAlgorithm};
