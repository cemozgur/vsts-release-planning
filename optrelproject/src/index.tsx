import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import { Layout } from "./components/Layout";
import { ReleasePlanningComponent } from './components/ReleasePlanningComponent';
import { ReleasePlanHistory } from "./components/ReleasePlanHistory";

export function init(containerId: string): void {
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={ReleasePlanningComponent}></IndexRoute>
        <Route path="releaseplanhistory" name="releaseplanhistory" component={ReleasePlanHistory}></Route>
      </Route>
    </Router>
    , document.getElementById(containerId));
}