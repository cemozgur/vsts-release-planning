"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Services_1 = require("TFS/WorkItemTracking/Services");
var DetailsList_1 = require("../../node_modules/office-ui-fabric-react/lib-amd/components/DetailsList/DetailsList");
var Header_1 = require("./Header");
var WorkItemSearchComponent = (function (_super) {
    __extends(WorkItemSearchComponent, _super);
    function WorkItemSearchComponent(props) {
        var _this = _super.call(this, props) || this;
        _this._widths = [100, 800, 200];
        _this.state = _this._getDefaultState();
        return _this;
    }
    WorkItemSearchComponent.prototype.render = function () {
        var resultSection = null;
        var result = this.props.features;
        resultSection = this._getWorkItemsList(result.queryResult);
        return React.createElement("div", { className: "work-item-search" },
            React.createElement(Header_1.Header, { description: this.props.description }),
            resultSection);
    };
    WorkItemSearchComponent.prototype._getDefaultState = function () {
        return {
            result: {}
        };
    };
    WorkItemSearchComponent.prototype._getWorkItemsList = function (queryResult) {
        var _this = this;
        var columns = queryResult.columns.map(function (c, i) { return { key: c.referenceName, name: c.name, fieldName: c.referenceName, minWidth: _this._widths[i] }; });
        var items = queryResult.workItems.map(function (wi) { return wi.fields; });
        return React.createElement(DetailsList_1.DetailsList, { columns: columns, items: items, setKey: 'set', onItemInvoked: function (item) {
                Services_1.WorkItemFormNavigationService.getService().then(function (svc) {
                    svc.openWorkItem(item["System.Id"]);
                });
            } });
    };
    WorkItemSearchComponent.prototype._setSearchResult = function (result) {
        this.state.result = result;
        this.setState(this.state);
    };
    return WorkItemSearchComponent;
}(React.Component));
exports.WorkItemSearchComponent = WorkItemSearchComponent;
