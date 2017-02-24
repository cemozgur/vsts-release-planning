"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var inversify_1 = require("inversify");
require("reflect-metadata");
var Q = require("q");
var RestClient_1 = require("TFS/WorkItemTracking/RestClient");
var FeatureServiceImpl = (function () {
    function FeatureServiceImpl() {
    }
    Object.defineProperty(FeatureServiceImpl.prototype, "httpClient", {
        get: function () {
            if (!this._httpClient) {
                this._httpClient = RestClient_1.getClient();
            }
            return this._httpClient;
        },
        enumerable: true,
        configurable: true
    });
    FeatureServiceImpl.prototype.getQueryAllFeature = function () {
        return {
            wiql: "SELECT [System.Id],\n                    [System.Title],\n                    [System.State]\n                FROM WorkItems\n                WHERE  [System.WorkItemType] = 'Feature'\n                ORDER BY [System.ChangedDate] DESC"
        };
    };
    FeatureServiceImpl.prototype.getAllFeatureByProjectResult = function (vstsProjectId) {
        var _this = this;
        var wiqlResult = this.getQueryAllFeature();
        console.log("vss-web-extension-sdk");
        console.log(this.httpClient);
        console.log(vstsProjectId);
        if (wiqlResult.wiql) {
            return this.httpClient.queryByWiql({ query: wiqlResult.wiql }, vstsProjectId).then(function (queryResult) {
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
    return FeatureServiceImpl;
}());
FeatureServiceImpl = __decorate([
    inversify_1.injectable()
], FeatureServiceImpl);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FeatureServiceImpl;
