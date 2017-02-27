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
        var releasePlanGenerationInitial = {
            processing: false,
            algorithmType: algorithmType_1.default.IFM,
            config: null,
            result: null,
            error: null
        };
        return { releasePlanGeneration: releasePlanGenerationInitial };
    };
    ReleasePlanningComponent.prototype.render = function () {
        var featureSection = null;
        var algorithmChoiceSection = null;
        var algorithmGenerationSection = null;
        var algorithmButtonSection = null;
        featureSection = React.createElement(FeatureList_1.FeatureList, { features: this.props.features.queryResult });
        algorithmChoiceSection = this._getAlgorithmAlternatives();
        var releasePlanGenerationState = this.state.releasePlanGeneration;
        /**
         * To improve this part, to be a React component
         */
        switch (releasePlanGenerationState.algorithmType) {
            case algorithmType_1.default.IFM:
                algorithmGenerationSection = this._getIFMGenerationSection();
                break;
            case algorithmType_1.default.GA:
                algorithmGenerationSection = null;
        }
        algorithmButtonSection = this._getAlgorithmGenerationButton();
        var releasePlanResultSection = null;
        if (releasePlanGenerationState.result) {
            releasePlanResultSection = React.createElement(ReleasePlanResult_1.ReleasePlanResult, { result: releasePlanGenerationState.result, algorithmType: releasePlanGenerationState.algorithmType });
        }
        else if (releasePlanGenerationState.processing) {
            releasePlanResultSection = React.createElement(Label_1.Label, null, "Processing..");
        }
        else if (releasePlanGenerationState.error) {
            releasePlanResultSection = React.createElement(Label_1.Label, null, releasePlanGenerationState.error);
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
        return !state.releasePlanGeneration.processing;
    };
    ReleasePlanningComponent.prototype._setState = function (processing, releasePlanResult) {
        var releasePlanGenerationState = this.state.releasePlanGeneration;
        releasePlanGenerationState.processing = processing;
        releasePlanGenerationState.result = releasePlanResult;
        releasePlanGenerationState.error = null;
        this.setState({ releasePlanGeneration: releasePlanGenerationState });
    };
    ReleasePlanningComponent.prototype._setStateError = function (error) {
        var releasePlanGenerationState = this.state.releasePlanGeneration;
        releasePlanGenerationState.processing = false;
        releasePlanGenerationState.result = null;
        releasePlanGenerationState.error = error;
        this.setState({ releasePlanGeneration: releasePlanGenerationState });
    };
    ReleasePlanningComponent.prototype._setStateAlgorithmType = function (algorithmType) {
        var releasePlanGenerationState = this.state.releasePlanGeneration;
        releasePlanGenerationState.algorithmType = algorithmType;
        releasePlanGenerationState.processing = false;
        releasePlanGenerationState.config = null;
        releasePlanGenerationState.result = null;
        releasePlanGenerationState.error = null;
        this.setState({ releasePlanGeneration: releasePlanGenerationState });
    };
    ReleasePlanningComponent.prototype._onGenerateReleasePlanClick = function (ev) {
        var _this = this;
        this._setState(true, null);
        VSS.getService(VSS.ServiceIds.ExtensionData).then(function (dataService) {
            dataService.getDocuments(_this.RPDSDocsName).then(function (featuresDeailtDocument) {
                var algorithmService = inversify_config_1.default.getNamed(identifiers_1.default.IReleasePlanningAlgorithm, _this.state.releasePlanGeneration.algorithmType);
                var featuresVSTS = _this.props.features.queryResult.workItems;
                var algorithmConfig = _this.state.releasePlanGeneration.config;
                if (algorithmService.getFeatureData(featuresVSTS, featuresDeailtDocument)) {
                    var config = {
                        featureNumber: 5,
                        discountValue: 50,
                        teamCapability: 100,
                        totalRequiredEffort: 100,
                        numberOfSprint: 55,
                        sprintDuration: 2
                    };
                    algorithmService.testDataGeneration(config);
                    var releasePlanResult = algorithmService.getOptimalReleasePlan(algorithmConfig);
                    _this._setState(false, releasePlanResult);
                }
                else {
                    _this._setStateError("The features information is not completed");
                }
            });
        });
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
        return React.createElement("div", { className: "ifm-section" },
            React.createElement(Label_1.Label, null, "Discount Rate"),
            React.createElement(TextField_1.TextField, { placeholder: "(Min)", required: true, className: "release-input", onChanged: this._onDiscountValueMinChange.bind(this) }),
            React.createElement(TextField_1.TextField, { placeholder: "(Expected)", required: true, className: "release-input", onChanged: this._onDiscountValueExpectedChange.bind(this) }),
            React.createElement(TextField_1.TextField, { placeholder: "(Max)", required: true, className: "release-input", onChanged: this._onDiscountValueMaxChange.bind(this) }));
    };
    /**
     * Create config key for a input value with min, expected and max
     */
    ReleasePlanningComponent.prototype.setStateConfigKey = function (configKey) {
        var releasePlanGenerationState = this.state.releasePlanGeneration;
        var update = false;
        var mock = {
            Min: null,
            Expected: null,
            Max: null
        };
        if (!releasePlanGenerationState.config) {
            releasePlanGenerationState.config = {};
            releasePlanGenerationState.config[configKey] = mock;
            update = true;
        }
        else {
            if (!releasePlanGenerationState.config[configKey]) {
                releasePlanGenerationState.config[configKey] = mock;
                update = true;
            }
        }
        if (update) {
            this.setState({ releasePlanGeneration: releasePlanGenerationState });
        }
    };
    ReleasePlanningComponent.prototype._onDiscountValueMinChange = function (value) {
        var configKey = "discountRate";
        var releasePlanGenerationState = this.state.releasePlanGeneration;
        this.setStateConfigKey(configKey);
        releasePlanGenerationState.config[configKey].Min = value;
        this.setState({ releasePlanGeneration: releasePlanGenerationState });
        console.log("State");
        console.log(this.state.releasePlanGeneration);
    };
    ReleasePlanningComponent.prototype._onDiscountValueExpectedChange = function (value) {
        var configKey = "discountRate";
        var releasePlanGenerationState = this.state.releasePlanGeneration;
        this.setStateConfigKey(configKey);
        releasePlanGenerationState.config[configKey].Expected = value;
        this.setState({ releasePlanGeneration: releasePlanGenerationState });
        console.log("State");
        console.log(this.state.releasePlanGeneration);
    };
    ReleasePlanningComponent.prototype._onDiscountValueMaxChange = function (value) {
        var configKey = "discountRate";
        var releasePlanGenerationState = this.state.releasePlanGeneration;
        this.setStateConfigKey(configKey);
        releasePlanGenerationState.config[configKey].Max = value;
        this.setState({ releasePlanGeneration: releasePlanGenerationState });
        console.log("State");
        console.log(this.state.releasePlanGeneration);
    };
    ReleasePlanningComponent.prototype._getAlgorithmGenerationButton = function () {
        return React.createElement("div", null,
            React.createElement("div", { className: "actions" },
                React.createElement(Button_1.Button, { onClick: this._onGenerateReleasePlanClick.bind(this), buttonType: Button_Props_1.ButtonType.primary, disabled: !this._canGenerateReleasePlan(this.state), className: "action-button" }, "Generate Release Plan")));
    };
    ReleasePlanningComponent.prototype._onChange = function (ev, option) {
        this._setStateAlgorithmType(option.key);
    };
    return ReleasePlanningComponent;
}(React.Component));
exports.ReleasePlanningComponent = ReleasePlanningComponent;
