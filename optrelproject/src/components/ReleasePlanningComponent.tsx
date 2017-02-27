import * as React from 'react';
import * as ReactDOM from 'react-dom';

import container from "../logic/config/inversify.config";
import IReleasePlanningAlgorithm from "../logic/interfaces/IReleasePlanningAlgorithm";
import SERVICE_IDENTIFIER from "../logic/constants/identifiers";
import ALGORITHM_TYPE from "../logic/constants/algorithmType"


import { IWorkItemSearchResult } from "../model/IWorkItemSearchResult";
import { ExtensionDataService } from 'VSS/SDK/Services/ExtensionData';


import { Button } from '../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button';
import { ButtonType } from '../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button.Props';
import { ChoiceGroup, IChoiceGroupOption } from '../../node_modules/office-ui-fabric-react/lib-amd/components/ChoiceGroup';
import { Label } from '../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label';
import { TextField } from '../../node_modules/office-ui-fabric-react/lib-amd/components/TextField/TextField';


import { Header } from "./common/Header";
import { ReleasePlanResult } from "./releaseplanresult/ReleasePlanResult";
import { FeatureList } from "./features/FeatureList";


interface IReleasePlanningProps {
    description: string;
    features: IWorkItemSearchResult;
}

interface IReleasePlanningState {
    processing?: boolean;
    releasePlan?: any;
    algorithm: string;
    discountValue?: string;
}


export class ReleasePlanningComponent extends React.Component<IReleasePlanningProps, IReleasePlanningState> {
    private RPDSDocsName: string = "RPDS";

    constructor(props?: IReleasePlanningProps) {
        super(props);
        this.state = this._getDefaultState();
    }

    private _getDefaultState(): IReleasePlanningState {
        return {
            processing: false,
            algorithm: ALGORITHM_TYPE.IFM,
            discountValue: "",
            releasePlan: {}
        };
    }

    public render(): JSX.Element {
        let featureSection: JSX.Element = null;
        let algorithmChoiceSection: JSX.Element = null;
        let algorithmGenerationSection: JSX.Element = null;
        let algorithmButtonSection: JSX.Element = null;

        featureSection = <FeatureList features={this.props.features.queryResult} />

        algorithmChoiceSection = this._getAlgorithmAlternatives();

        /**
         * To improve this part, to be a React component
         */
        switch (this.state.algorithm) {
            case ALGORITHM_TYPE.IFM:
                algorithmGenerationSection = this._getIFMGenerationSection();
                break;
            case ALGORITHM_TYPE.GA:
                algorithmGenerationSection = null;

        }
        algorithmButtonSection = this._getAlgorithmGenerationButton();

        let releasePlan = this.state.releasePlan;
        let releasePlanResultSection: JSX.Element = null

        if (releasePlan.result) {
            releasePlanResultSection = <ReleasePlanResult result={releasePlan.result} algorithmType={this.state.algorithm} />;
        } else if (this.state.processing) {
            releasePlanResultSection = <Label>Processing..</Label>
        }


        return <div>
            <Header description={this.props.description} />
            {featureSection}
            &nbsp;
            {algorithmChoiceSection}
            {algorithmGenerationSection}
            {algorithmButtonSection}
            &nbsp;
            {releasePlanResultSection}
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

        VSS.getService(VSS.ServiceIds.ExtensionData).then((dataService: ExtensionDataService) => {
            dataService.getDocuments(this.RPDSDocsName).then((featuresDeailtDocument) => {
                let result = algorithmService.getFeatureData(this.props.features.queryResult.workItems, featuresDeailtDocument);
                console.log(result);
                let config = {
                    featureNumber: 5,
                    discountValue: 50,
                    teamCapability: 100,
                    totalRequiredEffort: 100,
                    numberOfSprint: 55,
                    sprintDuration: 2
                };
                algorithmService.testDataGeneration(config);

                let releasePlan = algorithmService.getOptimalReleasePlan();
                this._setState(false, { result: releasePlan });
            });
        });
    }



    private _onDiscountValueChange(discountValue: string): void {
        this.state.discountValue = discountValue;
        this.setState(this.state);
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
        </div>;
    }

    private _getIFMGenerationSection(): JSX.Element {
        return <div>
            <div>
                <TextField placeholder="Discount Rate: (Min,Expected,Max)" required={true} className="keyword" onChanged={this._onDiscountValueChange.bind(this)} value={this.state.discountValue} />
            </div>
        </div>;
    }

    private _getAlgorithmGenerationButton(): JSX.Element {
        return <div>
            <div className="actions">
                <Button onClick={this._onGenerateReleasePlanClick.bind(this)} buttonType={ButtonType.primary} disabled={!this._canGenerateReleasePlan(this.state)} className="action-button">Generate Release Plan</Button>
            </div>
        </div>
    }
    private _onChange(ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) {
        this._setStateAlgorithm(option.key);
    }

}