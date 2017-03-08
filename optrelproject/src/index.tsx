import * as React from 'react';
import * as ReactDOM from 'react-dom';

import container from "./logic/config/inversify.config";
import SERVICE_IDENTIFIER from "./logic/constants/identifiers";

import { IFeatureService } from "./logic/interfaces/IFeatureService";
import { IWorkItemSearchResult } from "./model/IWorkItemSearchResult";

import {Spinner, SpinnerType} from '../node_modules/office-ui-fabric-react/lib-amd/components/Spinner';

import { ReleasePlanningComponent } from './components/ReleasePlanningComponent';
import { NoFeaturesComponent } from './components/NoFeaturesComponent';



export function init(containerId: string): void {
  let featureService = container.get<IFeatureService>(SERVICE_IDENTIFIER.IFeatureService);

  let vstsProjectId = VSS.getWebContext().project.id;
  let description = "Only features with New or Active state will be considered in the generation of a release plan.";

  ReactDOM.render(<Spinner type={SpinnerType.large} label='Collecting the project features.' />, document.getElementById(containerId));

  featureService.getAllFeatureByProjectResult(vstsProjectId).then(
    (features: IWorkItemSearchResult) => {
      if (features.queryResult.workItems.length > 0) {
        ReactDOM.render(<ReleasePlanningComponent description={description} features={features} />, document.getElementById(containerId));
      } else {
        ReactDOM.render(<NoFeaturesComponent />, document.getElementById(containerId));
      }

    });


}
