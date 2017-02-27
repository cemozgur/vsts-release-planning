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
var IFMReleasePlanningAlgorithm = (function () {
    function IFMReleasePlanningAlgorithm() {
        this.ReleasePlan = {
            discountValue: 0,
            cumulatedDiscountValue: 0, featureList: [],
            teamCapability: 0, totalRequiredEffort: 0,
            numberOfSprint: 0, sprintDuration: 0
        };
    }
    IFMReleasePlanningAlgorithm.prototype.getFeatureData = function (featuresVSTS, featuresDeailtDocument) {
        var featuresReleasePlan = [];
        featuresVSTS.map(function (el) {
            var feature = {
                id: el.id,
                feature: el.fields["System.Title"],
                state: el.fields["System.State"],
                order: "1",
                timeCriticality: Math.random() * 5 + 1,
                selected: false
            };
            var detailInfo = featuresDeailtDocument.filter(function (el) {
                return (el.id == feature.id);
            });
            if (detailInfo.length > 0) {
                feature.bussinesValue = detailInfo[0].BusinessValue;
                feature.effort = detailInfo[0].Effort;
                feature.cost = detailInfo[0].Cost;
                feature.dependency = detailInfo[0].Dependency;
                feature.risk = detailInfo[0].Risk;
            }
            featuresReleasePlan.push(feature);
        });
        console.log("result 1");
        console.log(featuresReleasePlan);
        return featuresReleasePlan;
    };
    IFMReleasePlanningAlgorithm.prototype.getPromiseTest = function () {
        return Q({ result: "I am sexy and easy." });
    };
    IFMReleasePlanningAlgorithm.prototype.getReleasePlanType = function () {
        return "IFM Algortihm";
    };
    IFMReleasePlanningAlgorithm.prototype.testDataGeneration = function (config) {
        this.ReleasePlan.discountValue = config.discountValue;
        this.ReleasePlan.teamCapability = config.teamCapability;
        this.ReleasePlan.totalRequiredEffort = config.totalRequiredEffort;
        this.ReleasePlan.numberOfSprint = config.numberOfSprint;
        this.ReleasePlan.sprintDuration = config.sprintDuration;
        for (var i = 0; i <= config.featureNumber - 1; i++) {
            var feature = {
                id: i + 1,
                bussinesValue: Math.random() * 100 + 1,
                effort: Math.random() * 50 + 1,
                timeCriticality: Math.random() * 5 + 1,
                cost: Math.random() * 50 + 1,
                selected: false,
                dependency: "0",
                feature: "Feature Name #",
                order: "1"
            };
            this.ReleasePlan.featureList.push({ feature: feature });
        }
        this.ReleasePlan.featureList[1].feature.dependency = "1";
        this.ReleasePlan.featureList[4].feature.dependency = "2,3";
    };
    IFMReleasePlanningAlgorithm.prototype.getOptimalReleasePlan = function () {
        var ResultReleasePlan = {
            discountValue: 0, cumulatedDiscountValue: 0,
            featureList: [], teamCapability: 0, totalRequiredEffort: 0,
            numberOfSprint: 0, sprintDuration: 0
        }; //this is only if we dont require the value again.
        this.getTotalRequiredEffort();
        this.calculateCumulatedDiscountValue();
        this.calculateNumberOfRequiredSprint();
        var maxNPV = -Number.MAX_VALUE;
        var maxFeature = -1;
        var tempNPV = -Number.MAX_VALUE;
        for (var i = 0; i <= this.ReleasePlan.featureList.length - 1; i++) {
            for (var j = 0; j <= this.ReleasePlan.featureList.length - 1; j++) {
                if (this.ReleasePlan.featureList[j].feature.selected == false) {
                    if (this.ReleasePlan.featureList[j].feature.dependency == "0") {
                        tempNPV = this.calculateNPV(j);
                        //console.log("tempNPV is : " + tempNPV);
                        if (tempNPV > maxNPV) {
                            maxNPV = tempNPV;
                            maxFeature = j + 1;
                        }
                        else if ((tempNPV == maxNPV) && (this.ReleasePlan.featureList[j].feature.timeCriticality > this.ReleasePlan.featureList[maxFeature - 1].feature.timeCriticality)) {
                            maxNPV = tempNPV;
                            maxFeature = j + 1;
                        }
                    }
                    else {
                        if (this.checkDependence(j) == true) {
                            tempNPV = this.calculateNPV(j);
                            //console.log("tempNPV is : " + tempNPV);
                            if (tempNPV > maxNPV) {
                                maxNPV = tempNPV;
                                maxFeature = j + 1;
                            }
                            else if ((tempNPV == maxNPV) && (this.ReleasePlan.featureList[j].feature.timeCriticality > this.ReleasePlan.featureList[maxFeature - 1].feature.timeCriticality)) {
                                maxNPV = tempNPV;
                                maxFeature = j + 1;
                            }
                        }
                    }
                }
            }
            ResultReleasePlan.featureList.push(this.ReleasePlan.featureList[maxFeature - 1].feature);
            //console.log("Feature added to the releasePlan!!!");
            this.ReleasePlan.featureList[maxFeature - 1].feature.selected = true;
            maxFeature = -1;
            maxNPV = -Number.MAX_VALUE;
            tempNPV = -Number.MAX_VALUE;
        }
        ResultReleasePlan.discountValue = this.ReleasePlan.discountValue;
        ResultReleasePlan.cumulatedDiscountValue = this.ReleasePlan.cumulatedDiscountValue;
        ResultReleasePlan.teamCapability = this.ReleasePlan.teamCapability;
        ResultReleasePlan.totalRequiredEffort = this.ReleasePlan.totalRequiredEffort;
        ResultReleasePlan.numberOfSprint = this.ReleasePlan.numberOfSprint;
        ResultReleasePlan.sprintDuration = this.ReleasePlan.sprintDuration;
        return { result: ResultReleasePlan };
    };
    IFMReleasePlanningAlgorithm.prototype.getTotalRequiredEffort = function () {
        var i;
        var totalEffort = 0;
        for (i = 0; i < this.ReleasePlan.featureList.length; i++) {
            totalEffort = totalEffort + this.ReleasePlan.featureList[i].feature.effort;
        }
        this.ReleasePlan.totalRequiredEffort = totalEffort;
    };
    IFMReleasePlanningAlgorithm.prototype.calculateCumulatedDiscountValue = function () {
        this.ReleasePlan.cumulatedDiscountValue = (Math.pow(((this.ReleasePlan.discountValue / 100.00) + 1.0), (this.ReleasePlan.sprintDuration / 52.0)) - 1.0) * 100.0;
    };
    //This is for calculating total number of sprints needed.
    IFMReleasePlanningAlgorithm.prototype.calculateNumberOfRequiredSprint = function () {
        Math.ceil(this.ReleasePlan.totalRequiredEffort / (this.ReleasePlan.sprintDuration * this.ReleasePlan.teamCapability));
    };
    IFMReleasePlanningAlgorithm.prototype.calculateNPV = function (index) {
        var npv = 0;
        var e = 0.0;
        var i;
        for (i = 0; i < this.ReleasePlan.featureList.length; i++) {
            e = i;
            npv += this.ReleasePlan.featureList[index].feature.bussinesValue / Math.pow((1.0 + (this.ReleasePlan.cumulatedDiscountValue / 100.0)), e);
        }
        return npv - this.ReleasePlan.featureList[index].feature.cost;
    };
    IFMReleasePlanningAlgorithm.prototype.checkDependence = function (index) {
        var dependency = this.ReleasePlan.featureList[index].feature.dependency;
        var dependencies = dependency.split(",");
        var answer = true;
        for (var i = 0; i <= dependencies.length - 1; i++) {
            if (this.ReleasePlan.featureList[(dependencies[i]) - 1].feature.selected == false) {
                answer = false;
            }
        }
        return answer;
    };
    return IFMReleasePlanningAlgorithm;
}());
IFMReleasePlanningAlgorithm = __decorate([
    inversify_1.injectable()
], IFMReleasePlanningAlgorithm);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IFMReleasePlanningAlgorithm;
