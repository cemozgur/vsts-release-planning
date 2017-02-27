"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var DetailsList_1 = require("../../../node_modules/office-ui-fabric-react/lib-amd/components/DetailsList");
var Services_1 = require("TFS/WorkItemTracking/Services");
var FeatureList = (function (_super) {
    __extends(FeatureList, _super);
    function FeatureList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FeatureList.prototype.render = function () {
        var featureSection = null;
        featureSection = this._getProjectFeaturesList(this.props.features);
        return React.createElement("div", null, featureSection);
    };
    FeatureList.prototype._getProjectFeaturesList = function (queryResult) {
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
    return FeatureList;
}(React.Component));
exports.FeatureList = FeatureList;
