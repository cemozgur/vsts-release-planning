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
var DetailsList_1 = require("../../node_modules/office-ui-fabric-react/lib-amd/components/DetailsList/DetailsList");
var Button_1 = require("../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button");
var Button_Props_1 = require("../../node_modules/office-ui-fabric-react/lib-amd/components/Button/Button.Props");
var ChoiceGroup_1 = require("../../node_modules/office-ui-fabric-react/lib-amd/components/ChoiceGroup");
var Header_1 = require("./Header");
var ReleasePlanningComponent = (function (_super) {
    __extends(ReleasePlanningComponent, _super);
    function ReleasePlanningComponent(props) {
        var _this = _super.call(this, props) || this;
        _this._widths = [100, 800, 200];
        _this.state = _this._getDefaultState();
        return _this;
    }
    ReleasePlanningComponent.prototype.render = function () {
        var featureSection = null, algorithmSection = null;
        ;
        featureSection = this._getWorkItemsList(this.props.features.queryResult);
        algorithmSection = this._getAlgorithmChoiseSection();
        return React.createElement("div", null,
            React.createElement(Header_1.Header, { description: this.props.description }),
            featureSection,
            algorithmSection,
            React.createElement("div", { className: "actions" },
                React.createElement(Button_1.Button, { onClick: this._onGenerateReleasePlanClick.bind(this), buttonType: Button_Props_1.ButtonType.primary, className: "action-button" }, "Generate Release Plan")));
    };
    ReleasePlanningComponent.prototype._onChange = function (ev, option) {
        this.setState({
            algorithm: option.key
        });
    };
    ReleasePlanningComponent.prototype._onGenerateReleasePlanClick = function (ev) {
        console.log("Executing the algorithm");
        console.log("State:" + this.state.algorithm);
        var algorithmService = inversify_config_1.default.getNamed(identifiers_1.default.IReleasePlanningAlgorithm, this.state.algorithm);
        console.log("Algorithm Service type: " + algorithmService.getReleasePlanType());
        var config = {
            featureNumber: 5,
            discountValue: 50,
            teamCapability: 100,
            totalRequiredEffort: 100,
            numberOfSprint: 55,
            sprintDuration: 2
        };
        algorithmService.testDataGeneration(config);
        console.log(algorithmService.getOptimalReleasePlan());
    };
    ReleasePlanningComponent.prototype._getDefaultState = function () {
        return {
            result: {},
            algorithm: algorithmType_1.default.IFM
        };
    };
    ReleasePlanningComponent.prototype._getWorkItemsList = function (queryResult) {
        var _this = this;
        var columns = queryResult.columns.map(function (c, i) { return { key: c.referenceName, name: c.name, fieldName: c.referenceName, minWidth: _this._widths[i] }; });
        var items = queryResult.workItems.map(function (wi) { return wi.fields; });
        return React.createElement(DetailsList_1.DetailsList, { columns: columns, items: items, setKey: 'set', onItemInvoked: function (item) {
                Services_1.WorkItemFormNavigationService.getService().then(function (svc) {
                    svc.openWorkItem(item["System.Id"]);
                });
            } });
    };
    ReleasePlanningComponent.prototype._getAlgorithmChoiseSection = function () {
        return React.createElement(ChoiceGroup_1.ChoiceGroup, { options: [
                {
                    key: algorithmType_1.default.IFM,
                    text: 'IFM Algorithm, it maximize the cost.',
                    checked: true
                },
                {
                    key: algorithmType_1.default.GA,
                    text: 'Genetic Algorithm'
                }
            ], label: 'Please, select the best algorithm suitable for Project.', onChange: this._onChange.bind(this), required: true });
    };
    ReleasePlanningComponent.prototype._setSearchResult = function (result) {
        this.state.result = result;
        this.setState(this.state);
    };
    return ReleasePlanningComponent;
}(React.Component));
exports.ReleasePlanningComponent = ReleasePlanningComponent;
