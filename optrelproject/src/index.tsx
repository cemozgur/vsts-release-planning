import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory  } from 'react-router';

import container from "./logic/config/inversify.config";
import SERVICE_IDENTIFIER from "./logic/constants/identifiers";

import { IFeatureService } from "./logic/interfaces/IFeatureService";
import { IWorkItemSearchResult } from "./model/IWorkItemSearchResult";

import { ReleasePlanningComponent } from './components/ReleasePlanningComponent';
import { NoFeaturesComponent } from './components/NoFeaturesComponent';
import {Loader} from './components/common/Loader';




export function init(containerId: string): void {
  let featureService = container.get<IFeatureService>(SERVICE_IDENTIFIER.IFeatureService);

  let vstsProjectId = VSS.getWebContext().project.id;

  ReactDOM.render(<Loader message="Collecting the Project features."/>, document.getElementById(containerId));

  featureService.getAllFeatureByProjectResult(vstsProjectId).then(
    (features: IWorkItemSearchResult) => {
      if (features.queryResult.workItems.length > 0) {
        ReactDOM.render(<ReleasePlanningComponent features={features} />, document.getElementById(containerId));
      } else {
        ReactDOM.render(<NoFeaturesComponent />, document.getElementById(containerId));
      }

    });


}
