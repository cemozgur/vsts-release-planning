import * as React from 'react';
import * as ReactDOM from 'react-dom';

import container from "./logic/config/inversify.config";
import SERVICE_IDENTIFIER from "./logic/constants/identifiers";

import { IFeatureService } from "./logic/interfaces/IFeatureService";
import IReleasePlanningAlgorithm from "./logic/interfaces/IReleasePlanningAlgorithm";
import ALGORITHM_TYPE from "./logic/constants/algorithmType";
import { IWorkItemSearchResult } from "./model/IWorkItemSearchResult";

import { ReleasePlanningComponent } from './components/ReleasePlanningComponent';


export function init(containerId: string): void {
  let featureService = container.get<IFeatureService>(SERVICE_IDENTIFIER.IFeatureService);

  let vstsProjectId = VSS.getWebContext().project.id;
  let description = "These features will be used to generate a release plan. InversifyJS";

  /**
   * TEST for IFM
   */
  let algorithmService = container.getNamed<IReleasePlanningAlgorithm>(SERVICE_IDENTIFIER.IReleasePlanningAlgorithm, ALGORITHM_TYPE.IFM);
  console.log(algorithmService);
  console.log(algorithmService.getReleasePlanType());
  let config = {
    featureNumber: 5,
    discountValue: 50,
    teamCapability: 100,
    totalRequiredEffort: 100,
    numberOfSprint: 55,
    sprintDuration: 2
  };
  algorithmService.testDataGeneration(config);
  console.log(algorithmService.getOptimalReleasePlan());
  /**
   * END OF TEST
   */

  featureService.getAllFeatureByProjectResult(vstsProjectId).then(
    (features: IWorkItemSearchResult) => {
      console.log("VSTS Features");
      console.log(features);
      ReactDOM.render(<ReleasePlanningComponent description={description} features={features} />, document.getElementById(containerId));
    });


}
