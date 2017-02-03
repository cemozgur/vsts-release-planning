/// <reference types="vss-web-extension-sdk" />
define(["require", "exports", "q", "TFS/WorkItemTracking/RestClient"], function (require, exports, Q, RestClient_1) {
    "use strict";
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
});
