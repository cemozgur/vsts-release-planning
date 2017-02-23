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
var Services_1 = require("TFS/WorkItemTracking/Services");
var DetailsList_1 = require("../../node_modules/office-ui-fabric-react/lib-amd/components/DetailsList");
var Button_1 = require("../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button");
var Button_Props_1 = require("../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button.Props");
var ChoiceGroup_1 = require("../../node_modules/office-ui-fabric-react/lib-amd/components/ChoiceGroup");
var Label_1 = require("../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label");
var Header_1 = require("./Header");
var IFMReleasePlan_1 = require("./IFMReleasePlan");
var ReleasePlanningComponent = (function (_super) {
    __extends(ReleasePlanningComponent, _super);
    function ReleasePlanningComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = _this._getDefaultState();
        return _this;
    }
    ReleasePlanningComponent.prototype._getDefaultState = function () {
        return {
            processing: false,
            algorithm: algorithmType_1.default.IFM,
            releasePlan: {}
        };
    };
    ReleasePlanningComponent.prototype.render = function () {
        var featureSection = null;
        var algorithmSection = null;
        featureSection = this._getProjectFeaturesList(this.props.features.queryResult);
        algorithmSection = this._getAlgorithmAlternatives();
        var releasePlan = this.state.releasePlan;
        var releasePlanSection = null;
        if (releasePlan.result) {
            if (algorithmType_1.default.IFM === this.state.algorithm) {
                releasePlanSection = React.createElement(IFMReleasePlan_1.IFMReleasePlan, { result: releasePlan.result });
            }
            else {
                releasePlanSection = React.createElement(Label_1.Label, null, "GA still working on..");
            }
        }
        else if (this.state.processing) {
            releasePlanSection = React.createElement(Label_1.Label, null, "Processing..");
        }
        return React.createElement("div", null,
            React.createElement(Header_1.Header, { description: this.props.description }),
            featureSection,
            "\u00A0",
            algorithmSection,
            "\u00A0",
            releasePlanSection);
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
        this._setState(true, {});
        var algorithmService = inversify_config_1.default.getNamed(identifiers_1.default.IReleasePlanningAlgorithm, this.state.algorithm);
        var config = {
            featureNumber: 5,
            discountValue: 50,
            teamCapability: 100,
            totalRequiredEffort: 100,
            numberOfSprint: 55,
            sprintDuration: 2
        };
        algorithmService.testDataGeneration(config);
        var releasePlan = { result: algorithmService.getOptimalReleasePlan() };
        this._setState(false, releasePlan);
    };
    ReleasePlanningComponent.prototype._getProjectFeaturesList = function (queryResult) {
        var _minWidths = [50, 400, 100];
        var _maxWidths = [50, 500, 100];
        var columns = queryResult.columns.map(function (c, i) {
            return {
                key: c.referenceName,
                name: c.name,
                fieldName: c.referenceName,
                minWidth: _minWidths[i],
                maxWidth: _maxWidths[i],
                isResizable: true
            };
        });
        var items = queryResult.workItems.map(function (wi) { return wi.fields; });
        return React.createElement("div", null,
            React.createElement(DetailsList_1.DetailsList, { columns: columns, items: items, checkboxVisibility: DetailsList_1.CheckboxVisibility.hidden, constrainMode: DetailsList_1.ConstrainMode.horizontalConstrained, setKey: 'set', onItemInvoked: function (item) {
                    Services_1.WorkItemFormNavigationService.getService().then(function (svc) {
                        svc.openWorkItem(item["System.Id"]);
                    });
                } }));
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
                ], label: 'Select the release planning optimisation for your project.', onChange: this._onChange.bind(this), required: true, disabled: !this._canGenerateReleasePlan(this.state) }),
            React.createElement("div", { className: "actions" },
                React.createElement(Button_1.Button, { onClick: this._onGenerateReleasePlanClick.bind(this), buttonType: Button_Props_1.ButtonType.primary, disabled: !this._canGenerateReleasePlan(this.state), className: "action-button" }, "Generate Release Plan")));
    };
    ReleasePlanningComponent.prototype._onChange = function (ev, option) {
        this._setStateAlgorithm(option.key);
    };
    return ReleasePlanningComponent;
}(React.Component));
exports.ReleasePlanningComponent = ReleasePlanningComponent;
