import * as React from 'react';
import * as ReactDOM from 'react-dom';

import container from "./logic/config/inversify.config";
import SERVICE_IDENTIFIER from "./logic/constants/identifiers";

import {IFeatureService} from "./logic/interfaces/IFeatureService";
import {IWorkItemSearchResult} from "./model/IWorkItemSearchResult";

import {WorkItemSearchComponent} from './components/FeatureComponent';


export function init(containerId: string): void {
  let featureService = container.get<IFeatureService>(SERVICE_IDENTIFIER.IFeatureService);

  let vstsProjectId = VSS.getWebContext().project.id;
  let description = "These features will be used to generate a release plan. InversifyJS";


  featureService.getAllFeatureByProjectResult(vstsProjectId).then(
    (features: IWorkItemSearchResult) => {
      console.log("VSTS Features");
      console.log(features);
      ReactDOM.render(<WorkItemSearchComponent description={description} features={features} />, document.getElementById(containerId));
    });


}
