"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var inversify_config_1 = require("../logic/config/inversify.config");
var identifiers_1 = require("../logic/constants/identifiers");
var algorithmType_1 = require("../logic/constants/algorithmType");
var Button_1 = require("../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button");
var Button_Props_1 = require("../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button.Props");
var ChoiceGroup_1 = require("../../node_modules/office-ui-fabric-react/lib-amd/components/ChoiceGroup");
var Label_1 = require("../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label");
var TextField_1 = require("../../node_modules/office-ui-fabric-react/lib-amd/components/TextField/TextField");
var Header_1 = require("./common/Header");
var ReleasePlanResult_1 = require("./releaseplanresult/ReleasePlanResult");
var FeatureList_1 = require("./features/FeatureList");
var ReleasePlanningComponent = (function (_super) {
    __extends(ReleasePlanningComponent, _super);
    function ReleasePlanningComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.RPDSDocsName = "RPDS";
        _this.state = _this._getDefaultState();
        return _this;
    }
    ReleasePlanningComponent.prototype._getDefaultState = function () {
        return {
            processing: false,
            algorithm: algorithmType_1.default.IFM,
            discountValue: "",
            releasePlan: {}
        };
    };
    ReleasePlanningComponent.prototype.render = function () {
        var featureSection = null;
        var algorithmChoiceSection = null;
        var algorithmGenerationSection = null;
        var algorithmButtonSection = null;
        featureSection = React.createElement(FeatureList_1.FeatureList, { features: this.props.features.queryResult });
        algorithmChoiceSection = this._getAlgorithmAlternatives();
        /**
         * To improve this part, to be a React component
         */
        switch (this.state.algorithm) {
            case algorithmType_1.default.IFM:
                algorithmGenerationSection = this._getIFMGenerationSection();
                break;
            case algorithmType_1.default.GA:
                algorithmGenerationSection = null;
        }
        algorithmButtonSection = this._getAlgorithmGenerationButton();
        var releasePlan = this.state.releasePlan;
        var releasePlanResultSection = null;
        if (releasePlan.result) {
            releasePlanResultSection = React.createElement(ReleasePlanResult_1.ReleasePlanResult, { result: releasePlan.result, algorithmType: this.state.algorithm });
        }
        else if (this.state.processing) {
            releasePlanResultSection = React.createElement(Label_1.Label, null, "Processing..");
        }
        return React.createElement("div", null,
            React.createElement(Header_1.Header, { description: this.props.description }),
            featureSection,
            "\u00A0",
            algorithmChoiceSection,
            algorithmGenerationSection,
            algorithmButtonSection,
            "\u00A0",
            releasePlanResultSection);
    };
    ReleasePlanningComponent.prototype._canGenerateReleasePlan = function (state) {
        return !state.processing;
    };
    ReleasePlanningComponent.prototype._setState = function (processing, releasePlan) {
        this.state.processing = processing;
        this.state.releasePlan = releasePlan;
        this.setState(this.state);
    };
    ReleasePlanningComponent.prototype._setStateAlgorithm = function (algorithm) {
        this.state.algorithm = algorithm;
        this.state.releasePlan = {};
        this.state.processing = false;
        this.setState(this.state);
    };
    ReleasePlanningComponent.prototype._onGenerateReleasePlanClick = function (ev) {
        var _this = this;
        this._setState(true, {});
        var algorithmService = inversify_config_1.default.getNamed(identifiers_1.default.IReleasePlanningAlgorithm, this.state.algorithm);
        VSS.getService(VSS.ServiceIds.ExtensionData).then(function (dataService) {
            dataService.getDocuments(_this.RPDSDocsName).then(function (featuresDeailtDocument) {
                var result = algorithmService.getFeatureData(_this.props.features.queryResult.workItems, featuresDeailtDocument);
                console.log(result);
                var config = {
                    featureNumber: 5,
                    discountValue: 50,
                    teamCapability: 100,
                    totalRequiredEffort: 100,
                    numberOfSprint: 55,
                    sprintDuration: 2
                };
                algorithmService.testDataGeneration(config);
                algorithmService.getOptimalReleasePlan().then(function (releasePlan) {
                    _this._setState(false, { result: releasePlan.result });
                });
            });
        });
    };
    ReleasePlanningComponent.prototype._onDiscountValueChange = function (discountValue) {
        this.state.discountValue = discountValue;
        this.setState(this.state);
    };
    ReleasePlanningComponent.prototype._getAlgorithmAlternatives = function () {
        return React.createElement("div", null,
            React.createElement(ChoiceGroup_1.ChoiceGroup, { options: [
                    {
                        key: algorithmType_1.default.IFM,
                        text: 'IFM Algorithm, it maximize the cost.',
                        checked: true
                    },
                    {
                        key: algorithmType_1.default.GA,
                        text: 'Genetic Algorithm'
                    }
                ], label: 'Select the release planning optimisation for your project.', onChange: this._onChange.bind(this), required: true, disabled: !this._canGenerateReleasePlan(this.state) }));
    };
    ReleasePlanningComponent.prototype._getIFMGenerationSection = function () {
        return React.createElement("div", null,
            React.createElement("div", null,
                React.createElement(TextField_1.TextField, { placeholder: "Discount Rate: (Min,Expected,Max)", required: true, className: "keyword", onChanged: this._onDiscountValueChange.bind(this), value: this.state.discountValue })));
    };
    ReleasePlanningComponent.prototype._getAlgorithmGenerationButton = function () {
        return React.createElement("div", null,
            React.createElement("div", { className: "actions" },
                React.createElement(Button_1.Button, { onClick: this._onGenerateReleasePlanClick.bind(this), buttonType: Button_Props_1.ButtonType.primary, disabled: !this._canGenerateReleasePlan(this.state), className: "action-button" }, "Generate Release Plan")));
    };
    ReleasePlanningComponent.prototype._onChange = function (ev, option) {
        this._setStateAlgorithm(option.key);
    };
    return ReleasePlanningComponent;
}(React.Component));
exports.ReleasePlanningComponent = ReleasePlanningComponent;
