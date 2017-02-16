"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var DetailsList_1 = require("../../node_modules/office-ui-fabric-react/lib-amd/components/DetailsList");
var Label_1 = require("../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label");
var IFMReleasePlan = (function (_super) {
    __extends(IFMReleasePlan, _super);
    function IFMReleasePlan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IFMReleasePlan.prototype.render = function () {
        var featureOrder = null;
        var releasePlan = this.props.result;
        featureOrder = this._getReleasePlanFeatures(releasePlan);
        return React.createElement("div", null,
            React.createElement("h2", null, "Release Plan:"),
            React.createElement("div", null,
                React.createElement(Label_1.Label, null,
                    "Cumulated Discount Value: ",
                    releasePlan.cumulatedDiscountValue),
                React.createElement(Label_1.Label, null,
                    "Discount Value: ",
                    releasePlan.discountValue),
                React.createElement(Label_1.Label, null,
                    "Number of Sprint: ",
                    releasePlan.numberOfSprint),
                React.createElement(Label_1.Label, null,
                    "Sprint Duration: ",
                    releasePlan.sprintDuration),
                React.createElement(Label_1.Label, null,
                    "Team Capability: ",
                    releasePlan.teamCapability),
                React.createElement(Label_1.Label, null,
                    "Total Required Effort: ",
                    releasePlan.totalRequiredEffort)),
            featureOrder);
    };
    IFMReleasePlan.prototype._getReleasePlanFeatures = function (releasePlan) {
        var _minWidths = [50, 50, 400, 100, 100, 100, 100, 100];
        var _maxWidths = [50, 50, 500, 100, 100, 100, 100, 100];
        var columnsReleasePlan = [
            {
                name: "Order",
                referenceName: "order"
            },
            {
                name: "Id",
                referenceName: "id"
            },
            {
                name: "Feature Name",
                referenceName: "feature"
            },
            {
                name: "Business Value",
                referenceName: "bussinesValue"
            },
            {
                name: "Cost",
                referenceName: "cost"
            },
            {
                name: "Effort",
                referenceName: "effort"
            },
            {
                name: "Time Critically",
                referenceName: "timeCriticality"
            },
            {
                name: "Dependency",
                referenceName: "dependency"
            }
        ];
        var columns = columnsReleasePlan.map(function (c, i) {
            return {
                key: c.referenceName,
                name: c.name,
                fieldName: c.referenceName,
                minWidth: _minWidths[i],
                maxWidth: _maxWidths[i],
                isResizable: false
            };
        });
        var items = releasePlan.featureList.map(function (wi) { return wi; });
        return React.createElement(DetailsList_1.DetailsList, { columns: columns, items: items, checkboxVisibility: DetailsList_1.CheckboxVisibility.hidden, setKey: 'set' });
    };
    return IFMReleasePlan;
}(React.Component));
exports.IFMReleasePlan = IFMReleasePlan;
