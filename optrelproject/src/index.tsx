import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {WorkItemSearchComponent} from './components/FeatureComponent';
import {IWorkItemSearchResult,Instance as WorkItemSearch} from './logic/Feature'; 

export function init(containerId: string): void {
  let description = "These features will be used to generate a release plan.";

  WorkItemSearch.getAllFeatureByProjectResult().then(
    (features: IWorkItemSearchResult) => {
      console.log("VSTS Features");
      console.log(features);
      ReactDOM.render(<WorkItemSearchComponent description={description} features={features} />, document.getElementById(containerId));
    });


}
