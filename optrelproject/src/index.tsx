import * as React from 'react';
import * as ReactDOM from 'react-dom';

import container from "./logic/config/inversify.config";
import SERVICE_IDENTIFIER from "./logic/constants/identifiers";

import { IFeatureService } from "./logic/interfaces/IFeatureService";
import { IWorkItemSearchResult } from "./model/IWorkItemSearchResult";

import { ReleasePlanningComponent } from './components/ReleasePlanningComponent';


export function init(containerId: string): void {
  let featureService = container.get<IFeatureService>(SERVICE_IDENTIFIER.IFeatureService);

  let vstsProjectId = VSS.getWebContext().project.id;
  let description = "These features will be used to generate a release plan. Testing AREA.";


  featureService.getAllFeatureByProjectResult(vstsProjectId).then(
    (features: IWorkItemSearchResult) => {
      console.log("VSTS Features");
      console.log(features);
      ReactDOM.render(<ReleasePlanningComponent description={description} features={features} />, document.getElementById(containerId));
    });


}
