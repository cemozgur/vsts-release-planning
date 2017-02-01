import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { DetailsList } from 'OfficeFabric/components/DetailsList/DetailsList';

import { WorkItemFormNavigationService } from "TFS/WorkItemTracking/Services";


import {
  Instance as WorkItemSearch,
  IWorkItemSearchResult,
  IWiqlQueryResult
} from "./Feature";

import {Header} from "./Header";


interface IWorkItemSearchProps {
  description: string;
  features: IWorkItemSearchResult;
}

interface IWorkItemSearchState {
  result?: IWorkItemSearchResult;
}

class WorkItemSearchComponent extends React.Component<IWorkItemSearchProps, IWorkItemSearchState> {
  private _widths = [100, 800, 200];

  constructor(props?: IWorkItemSearchProps) {
    super(props);
    this.state = this._getDefaultState();
  }


  public render(): JSX.Element {

    let resultSection: JSX.Element = null;
    let result = this.props.features;

    resultSection = this._getWorkItemsList(result.queryResult);


    return <div className="work-item-search">
      <Header description={this.props.description}/>
      {resultSection}
    </div>;
  }

  private _getDefaultState(): IWorkItemSearchState {
    return {
      result: {}
    };
  }

  private _getWorkItemsList(queryResult: IWiqlQueryResult): JSX.Element {
    let columns = queryResult.columns.map((c, i) => { return { key: c.referenceName, name: c.name, fieldName: c.referenceName, minWidth: this._widths[i] } });
    let items = queryResult.workItems.map(wi => wi.fields);

    return <DetailsList
      columns={columns}
      items={items}
      setKey='set'
      onItemInvoked={(item) => {
        WorkItemFormNavigationService.getService().then(svc => {
          svc.openWorkItem(item["System.Id"]);
        });
      }}
    />
  }

  private _performSearch(): void {

    this._setSearchResult({});

    WorkItemSearch.getAllFeatureByProjectResult().then(
      (result: IWorkItemSearchResult) => {
        console.log("Get all Feature from VSTS");
        console.log(result);
        this._setSearchResult(result);
      });
  }

  private _setSearchResult(result: IWorkItemSearchResult): void {
    this.state.result = result;
    this.setState(this.state);
  }

}

export function init(containerId: string): void {
  let description = "These features will be used to generate a release plan.";

  WorkItemSearch.getAllFeatureByProjectResult().then(
    (features: IWorkItemSearchResult) => {
      console.log("VSTS Features");
      console.log(features);
      ReactDOM.render(<WorkItemSearchComponent description={description} features={features} />, document.getElementById(containerId));
    });


}
