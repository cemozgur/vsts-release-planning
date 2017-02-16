import * as React from 'react';
import * as ReactDOM from 'react-dom';

import container from "../logic/config/inversify.config";
import IReleasePlanningAlgorithm from "../logic/interfaces/IReleasePlanningAlgorithm";
import SERVICE_IDENTIFIER from "../logic/constants/identifiers";
import ALGORITHM_TYPE from "../logic/constants/algorithmType"


import { IWorkItemSearchResult } from "../model/IWorkItemSearchResult";
import { IWiqlQueryResult } from "../model/IWiqlQueryResult";

import { WorkItemFormNavigationService } from "TFS/WorkItemTracking/Services";


import { DetailsList, CheckboxVisibility, ConstrainMode } from '../../node_modules/office-ui-fabric-react/lib-amd/components/DetailsList';
import { Button } from '../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button';
import { ButtonType } from '../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button.Props';
import { ChoiceGroup, IChoiceGroupOption } from '../../node_modules/office-ui-fabric-react/lib-amd/components/ChoiceGroup';
import { Label } from '../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';

import { Header } from "./Header";
import { IFMReleasePlan } from "./IFMReleasePlan";


interface IReleasePlanningProps {
    description: string;
    features: IWorkItemSearchResult;
}

interface IReleasePlanningState {
    processing?: boolean;
    releasePlan?: any;
    algorithm: string;
}


export class ReleasePlanningComponent extends React.Component<IReleasePlanningProps, IReleasePlanningState> {
    constructor(props?: IReleasePlanningProps) {
        super(props);
        this.state = this._getDefaultState();
    }

    private _getDefaultState(): IReleasePlanningState {
        return {
            processing: false,
            algorithm: ALGORITHM_TYPE.IFM,
            releasePlan: {}
        };
    }

    public render(): JSX.Element {
        let featureSection: JSX.Element = null;
        let algorithmSection: JSX.Element = null;

        featureSection = this._getProjectFeaturesList(this.props.features.queryResult);
        algorithmSection = this._getAlgorithmAlternatives();




        let releasePlan = this.state.releasePlan;
        let releasePlanSection: JSX.Element = null

        if (releasePlan.result) {
            if (ALGORITHM_TYPE.IFM === this.state.algorithm) {
                releasePlanSection = <IFMReleasePlan result={releasePlan.result} />;
            } else {
                releasePlanSection = <Label>GA still working on..</Label>
            }
        } else if (this.state.processing) {
            releasePlanSection = <Label>Processing..</Label>
        }


        return <div>
            <Header description={this.props.description} />
            {featureSection}
            &nbsp;
            {algorithmSection}
            &nbsp;
            {releasePlanSection}
        </div>;
    }

    private _canGenerateReleasePlan(state: IReleasePlanningState): boolean {
        return !state.processing;
    }

    private _setState(processing: boolean, releasePlan: any) {
        this.state.processing = processing;
        this.state.releasePlan = releasePlan;
        this.setState(this.state);
    }
    private _setStateAlgorithm(algorithm: string) {
        this.state.algorithm = algorithm;
        this.state.releasePlan = {};
        this.state.processing = false;
        this.setState(this.state);
    }


    private _onGenerateReleasePlanClick(ev: React.MouseEvent<HTMLButtonElement>): void {
        this._setState(true, {});

        let algorithmService = container.getNamed<IReleasePlanningAlgorithm>(SERVICE_IDENTIFIER.IReleasePlanningAlgorithm, this.state.algorithm);
     
        let config = {
            featureNumber: 5,
            discountValue: 50,
            teamCapability: 100,
            totalRequiredEffort: 100,
            numberOfSprint: 55,
            sprintDuration: 2
        };
        algorithmService.testDataGeneration(config);

        let releasePlan = { result: algorithmService.getOptimalReleasePlan() };
        this._setState(false, releasePlan);
    }



    private _getProjectFeaturesList(queryResult: IWiqlQueryResult): JSX.Element {
        let _minWidths = [50, 400, 100];
        let _maxWidths = [50, 500, 100];
        let columns = queryResult.columns.map((c, i) => {
            return {
                key: c.referenceName,
                name: c.name,
                fieldName: c.referenceName,
                minWidth: _minWidths[i],
                maxWidth: _maxWidths[i],
                isResizable: true
            }
        });
        let items = queryResult.workItems.map(wi => wi.fields);

        return <div>
            <DetailsList
                columns={columns}
                items={items}
                checkboxVisibility={CheckboxVisibility.hidden}
                constrainMode={ConstrainMode.horizontalConstrained}
                setKey='set'
                onItemInvoked={(item) => {
                    WorkItemFormNavigationService.getService().then(svc => {
                        svc.openWorkItem(item["System.Id"]);
                    });
                }}
            />
        </div>;
    }

    private _getAlgorithmAlternatives(): JSX.Element {
        return <div>
            <ChoiceGroup
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
                label='Select the release planning optimisation for your project.'
                onChange={this._onChange.bind(this)}
                required={true}
                disabled={!this._canGenerateReleasePlan(this.state)}
            />
            <div className="actions">
                <Button onClick={this._onGenerateReleasePlanClick.bind(this)} buttonType={ButtonType.primary} disabled={!this._canGenerateReleasePlan(this.state)} className="action-button">Generate Release Plan</Button>
            </div>
        </div>;
    }
    private _onChange(ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) {
        this._setStateAlgorithm(option.key);
    }

}