/// <reference types="vss-web-extension-sdk" />
"use strict";
var Q = require("q");
var RestClient_1 = require("TFS/WorkItemTracking/RestClient");
var inversify_config_1 = require("./config/inversify.config");
var identifiers_1 = require("./constants/identifiers");
var WorkItemSearch = (function () {
    function WorkItemSearch() {
    }
    Object.defineProperty(WorkItemSearch.prototype, "httpClient", {
        get: function () {
            if (!this._httpClient) {
                this._httpClient = RestClient_1.getClient();
            }
            return this._httpClient;
        },
        enumerable: true,
        configurable: true
    });
    WorkItemSearch.prototype.getAllFeatureByProjectResult = function () {
        var _this = this;
        var wiqlResult = this.getQueryAllFeature();
        var projectId = VSS.getWebContext().project.id;
        var bingo = inversify_config_1.default.get(identifiers_1.default.IReleasePlanningAlgorithm);
        console.log("TESTING INVERSIFY");
        console.log(bingo.getReleasePlanType());
        console.log("vss-web-extension-sdk");
        console.log(this.httpClient);
        if (wiqlResult.wiql) {
            return this.httpClient.queryByWiql({ query: wiqlResult.wiql }, projectId).then(function (queryResult) {
                // We got the work item ids, now get the field values
                if (queryResult.workItems.length > 0) {
                    return _this.httpClient.getWorkItems(queryResult.workItems.map(function (wi) { return wi.id; }), queryResult.columns.map(function (wiRef) { return wiRef.referenceName; })).then(function (workItems) { return { queryResult: { columns: queryResult.columns, workItems: workItems } }; }, function (err) { return { error: err.message }; });
                }
                else {
                    return { queryResult: { columns: queryResult.columns, workItems: [] } };
                }
            }, function (err) { return { error: err.message }; });
        }
        return Q({ error: wiqlResult.error });
    };
    WorkItemSearch.prototype.getQueryAllFeature = function () {
        return {
            wiql: "SELECT [System.Id],\n                    [System.Title],\n                    [System.State]\n                FROM WorkItems\n                WHERE  [System.WorkItemType] = 'Feature'\n                ORDER BY [System.ChangedDate] DESC"
        };
    };
    return WorkItemSearch;
}());
exports.Instance = new WorkItemSearch();
