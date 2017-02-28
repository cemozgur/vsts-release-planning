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
var Label_1 = require("../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label");
var Header_1 = require("./common/Header");
var ReleasePlanResult_1 = require("./releaseplanresult/ReleasePlanResult");
var AlgorithmChoice_1 = require("./releaseplan/AlgorithmChoice");
var ReleasePlanInput_1 = require("./releaseplan/ReleasePlanInput");
var FeatureList_1 = require("./features/FeatureList");
var VSTS_DOCUMENT = {
    RPDS: "RPDS"
};
var ReleasePlanningComponent = (function (_super) {
    __extends(ReleasePlanningComponent, _super);
    function ReleasePlanningComponent(props) {
        var _this = _super.call(this, props) || this;
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
        algorithmChoiceSection = React.createElement(AlgorithmChoice_1.AlgorithmChoice, { updateAlgorithmState: this._onChange.bind(this), disabled: !this._canGenerateReleasePlan(this.state) });
        algorithmGenerationSection = React.createElement(ReleasePlanInput_1.ReleasePlanInput, { algorithmType: this.state.releasePlanGeneration.algorithmType, updateStateConfig: this.updateConfigState.bind(this) });
        algorithmButtonSection = this._getAlgorithmButtonSection();
        var releasePlanResultSection = null;
        var releasePlanGenerationState = this.state.releasePlanGeneration;
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
            "\u00A0",
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
    ReleasePlanningComponent.prototype.updateConfigState = function (configKey, name, value) {
        if (name) {
            this.setStateConfigKey(configKey, true);
            this.state.releasePlanGeneration.config[configKey][name] = value;
        }
        else {
            this.setStateConfigKey(configKey, false);
            this.state.releasePlanGeneration.config[configKey] = value;
        }
    };
    ReleasePlanningComponent.prototype.setStateConfigKey = function (configKey, triangular) {
        var releasePlanGenerationState = this.state.releasePlanGeneration;
        var update = false;
        var mock = {
            Min: null,
            Expected: null,
            Max: null
        };
        if (!releasePlanGenerationState.config) {
            releasePlanGenerationState.config = {};
            triangular ? releasePlanGenerationState.config[configKey] = mock : releasePlanGenerationState.config[configKey] = null;
            update = true;
        }
        else {
            if (!releasePlanGenerationState.config[configKey]) {
                triangular ? releasePlanGenerationState.config[configKey] = mock : releasePlanGenerationState.config[configKey] = null;
                update = true;
            }
        }
        if (update) {
            this.setState({ releasePlanGeneration: releasePlanGenerationState });
        }
    };
    ReleasePlanningComponent.prototype._getAlgorithmButtonSection = function () {
        return React.createElement("div", null,
            React.createElement("div", { className: "actions" },
                React.createElement(Button_1.Button, { onClick: this._onGenerateReleasePlanClick.bind(this), buttonType: Button_Props_1.ButtonType.primary, disabled: !this._canGenerateReleasePlan(this.state), className: "action-button" }, "Generate Release Plan")));
    };
    ReleasePlanningComponent.prototype._onGenerateReleasePlanClick = function (ev) {
        var _this = this;
        var algorithmService = inversify_config_1.default.getNamed(identifiers_1.default.IReleasePlanningAlgorithm, this.state.releasePlanGeneration.algorithmType);
        var config = this.state.releasePlanGeneration.config;
        if (algorithmService.validateConfigAlgorithm(config)) {
            this._setState(true, null);
            VSS.getService(VSS.ServiceIds.ExtensionData).then(function (dataService) {
                dataService.getDocuments(VSTS_DOCUMENT.RPDS).then(function (featuresDeailtDocument) {
                    var featuresVSTS = _this.props.features.queryResult.workItems;
                    if (algorithmService.getFeatureData(featuresVSTS, featuresDeailtDocument)) {
                        var releasePlanResult = algorithmService.getOptimalReleasePlan(config);
                        _this._setState(false, releasePlanResult);
                    }
                    else {
                        _this._setStateError("The features information is not completed");
                    }
                });
            });
        }
        else {
            this._setStateError("Please fill all the fields on the above section.");
        }
    };
    ReleasePlanningComponent.prototype._onChange = function (ev, option) {
        this._setStateAlgorithmType(option.key);
    };
    return ReleasePlanningComponent;
}(React.Component));
exports.ReleasePlanningComponent = ReleasePlanningComponent;
