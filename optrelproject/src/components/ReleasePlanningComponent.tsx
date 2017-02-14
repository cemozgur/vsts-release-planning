import * as React from 'react';
import * as ReactDOM from 'react-dom';

import container from "../logic/config/inversify.config";
import IReleasePlanningAlgorithm from "../logic/interfaces/IReleasePlanningAlgorithm";
import SERVICE_IDENTIFIER from "../logic/constants/identifiers";
import ALGORITHM_TYPE from "../logic/constants/algorithmType"


import { IWorkItemSearchResult } from "../model/IWorkItemSearchResult";
import { IWiqlQueryResult } from "../model/IWiqlQueryResult";


import { WorkItemFormNavigationService } from "TFS/WorkItemTracking/Services";


import { DetailsList } from '../../node_modules/office-ui-fabric-react/lib-amd/components/DetailsList/DetailsList';
import { Button } from '../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button';
import { ButtonType } from '../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button.Props';
import { ChoiceGroup, IChoiceGroupOption } from '../../node_modules/office-ui-fabric-react/lib-amd/components/ChoiceGroup';

import { Header } from "./Header";


interface IReleasePlanningProps {
    description: string;
    features: IWorkItemSearchResult;
}

interface IReleasePlanningState {
    result?: IWorkItemSearchResult;
    algorithm: string;
}


export class ReleasePlanningComponent extends React.Component<IReleasePlanningProps, IReleasePlanningState> {
    private _widths = [100, 800, 200];

    constructor(props?: IReleasePlanningProps) {
        super(props);
        this.state = this._getDefaultState();
    }


    public render(): JSX.Element {
        let featureSection: JSX.Element = null, algorithmSection: JSX.Element = null;;
        featureSection = this._getWorkItemsList(this.props.features.queryResult);
        algorithmSection = this._getAlgorithmChoiseSection();
        return <div>
            <Header description={this.props.description} />
            {featureSection}
            {algorithmSection}
            <div className="actions">
                <Button onClick={this._onGenerateReleasePlanClick.bind(this)} buttonType={ButtonType.primary} className="action-button">Generate Release Plan</Button>
            </div>
        </div>;
    }

    private _onChange(ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) {
        this.setState({
            algorithm: option.key
        });
    }

    private _onGenerateReleasePlanClick(ev: React.MouseEvent<HTMLButtonElement>): void {
        console.log("Executing the algorithm");
        console.log("State:" + this.state.algorithm);
        let algorithmService = container.getNamed<IReleasePlanningAlgorithm>(SERVICE_IDENTIFIER.IReleasePlanningAlgorithm, this.state.algorithm);
        console.log("Algorithm Service type: " + algorithmService.getReleasePlanType());
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
    }



    private _getDefaultState(): IReleasePlanningState {
        return {
            result: {},
            algorithm: ALGORITHM_TYPE.IFM
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

    private _getAlgorithmChoiseSection(): JSX.Element {
        return <ChoiceGroup
            options={[
                {
                    key: ALGORITHM_TYPE.IFM,
                    text: 'IFM Algorithm, it maximize the cost.',
                    checked: true
                },
                {
                    key: ALGORITHM_TYPE.GA,
                    text: 'Genetic Algorithm'
                }
            ]}
            label='Please, select the best algorithm suitable for Project.'
            onChange={this._onChange.bind(this)}
            required={true}
        />;
    }
    
    private _setSearchResult(result: IWorkItemSearchResult): void {
        this.state.result = result;
        this.setState(this.state);
    }

}