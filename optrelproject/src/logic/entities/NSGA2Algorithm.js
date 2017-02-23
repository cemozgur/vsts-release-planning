"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var inversify_1 = require("inversify");
require("reflect-metadata");
var NSGA2ReleasePlanningAlgorithm = (function () {
    function NSGA2ReleasePlanningAlgorithm(crossoverConfig, mutationConfig, algorithmConfig) {
        this.bitBlockSize = 0;
        this.featureGenerationSize = 0;
        this.populationSize = algorithmConfig.population_size;
        this.generationNumber = algorithmConfig.generation_number;
        this.featureGenerationSize = algorithmConfig.testing.number_of_feature;
        this.crossoverConfig = crossoverConfig;
        this.mutationConfig = mutationConfig;
        if (algorithmConfig.testing.enable == true) {
            var featuresList = new Array();
            var fronts = [];
            var population = [];
            population = this.resetParameters(population);
            population = this.initialisePopulation(featuresList, population);
            var obj = [];
            obj = this.updateParameters(population, fronts);
            population = obj[0];
            fronts = obj[1];
            for (var i = 0; i < this.generationNumber; i++) {
                population = this.resetParameters(population);
                obj = this.updateParameters(population, fronts);
                population = obj[0];
                fronts = obj[1];
            }
            var fatherString = "1,2,3,5,4";
            var motherString = "2,5,4,1,3";
            var children = this.makeCrossover(fatherString, motherString);
            console.log(children[0]);
            console.log(children[1]);
            var mutatedChild = this.makeMutation(children[0]);
            var mutatedChildII = this.makeMutation(children[1]);
            console.log(mutatedChild);
            console.log(mutatedChildII);
        }
    }
    NSGA2ReleasePlanningAlgorithm.prototype.getReleasePlanType = function () {
        return "NSGA2 Algortihm";
    };
    NSGA2ReleasePlanningAlgorithm.prototype.testDataGeneration = function (config) {
    };
    NSGA2ReleasePlanningAlgorithm.prototype.getOptimalReleasePlan = function () {
        return { result: "Implementing" };
    };
    NSGA2ReleasePlanningAlgorithm.prototype.resetParameters = function (population) {
        for (var i = 0; i < population.length; i++) {
            population[i].repleasePlan = "";
            population[i].setS = "";
            population[i].n = "";
            population[i].crowdingDistance = "";
            population[i].rank = "";
        }
        return population;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.initialisePopulation = function (features, population) {
        var usedFeatures = "";
        var temp = "";
        for (var i = 0; i < this.populationSize; i++) {
            for (var j = 0; j < features.length; j++) {
                temp = this.generateRandomFeature(usedFeatures, j, features);
                if (j == 0) {
                    usedFeatures = temp;
                }
                else {
                    usedFeatures = usedFeatures + "," + temp;
                }
            }
            population[i].repleasePlan = usedFeatures;
            usedFeatures = "";
        }
        return population;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.getRandomNumber = function (number) {
        return Math.floor(Math.random() * number);
    };
    NSGA2ReleasePlanningAlgorithm.prototype.generateRandomFeature = function (usedFeatures, numberOfUsedFeatures, features) {
        var options = "";
        var count = 0;
        var tempI = "";
        for (var i = 1; i < features.length + 1; i++) {
            tempI = i.toString();
            if (this.checkDependency(tempI, usedFeatures, features) == true) {
                options += tempI + ",";
                count++;
            }
        }
        options = options.substring(0, (options.length - 1));
        var rand = this.getRandomNumber(count);
        var temps = options.split("[,]");
        return temps[rand];
    };
    NSGA2ReleasePlanningAlgorithm.prototype.checkDependency = function (featureNumber, usedFeatures, features) {
        if (this.checkIfUsed(featureNumber, usedFeatures) == false) {
            if (this.checkIfDepends(featureNumber, usedFeatures) == false) {
                return true;
            }
            else {
                if (this.checkIfDependsOnUsed(featureNumber, usedFeatures, features) == true) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        else {
            return false;
        }
    };
    NSGA2ReleasePlanningAlgorithm.prototype.checkIfUsed = function (featureNumber, usedFeatures) {
        var usedFeaturesSeparated = usedFeatures.split("[,]");
        for (var i = 0; i < usedFeaturesSeparated.length; i++) {
            if (featureNumber === usedFeaturesSeparated[i]) {
                return true;
            }
        }
        return false;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.checkIfDepends = function (featureNumber, features) {
        if (features[parseInt(featureNumber) - 1].dependsOn === "") {
            return false;
        }
        return true;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.checkIfDependsOnUsed = function (featureNumber, usedFeatures, features) {
        var usedFeaturesSeparated = usedFeatures.split("[,]");
        var dependentFeaturesSeparated = features[parseInt(featureNumber) - 1].dependsOn.split("[,]");
        var answer = false;
        for (var i = 0; i < dependentFeaturesSeparated.length; i++) {
            for (var j = 0; j < usedFeaturesSeparated.length; j++) {
                if (dependentFeaturesSeparated[i].equals(usedFeaturesSeparated[j]) == true) {
                    answer = true;
                }
            }
            if (answer == false) {
                return false;
            }
            answer = false;
        }
        return true;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.updateParameters = function (population, fronts) {
        for (var i = 0; i < population.length; i++) {
            for (var j = 0; j < population.length; j++) {
                if (i == j) {
                    continue;
                }
                if (this.checkIfFirstDominatesSecond(population[i].repleasePlan, population[j].repleasePlan) == true) {
                    if (population[i].setS === "") {
                        population[i].setS == "" + j;
                    }
                    else {
                        population[i].setS = population[i].setS + "," + j;
                    }
                }
                else if (this.checkIfFirstDominatesSecond(population[j].repleasePlan, population[i].repleasePlan) == true) {
                    population[i].n = parseInt(population[i].n + 1).toString();
                }
            }
        }
        var wrapper = [];
        wrapper = this.updateFronts(population, fronts);
        wrapper = this.calculateCrowdingDistances(wrapper[0], wrapper[1]);
        wrapper[0] = this.updatePopulation(wrapper[0], wrapper[1]);
        return wrapper;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.checkIfFirstDominatesSecond = function (plan1, plan2) {
        if ((this.calculateObjective1(plan1) == this.calculateObjective1(plan2)) && (this.calculateObjective2(plan1) > this.calculateObjective2(plan2)) ||
            (this.calculateObjective1(plan1) > this.calculateObjective1(plan2)) && (this.calculateObjective2(plan1) == this.calculateObjective2(plan2)) ||
            (this.calculateObjective1(plan1) > this.calculateObjective1(plan2)) && (this.calculateObjective2(plan1) > this.calculateObjective2(plan2))) {
            return true;
        }
        return false;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.calculateObjective1 = function (plan) {
        return 0.0;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.calculateObjective2 = function (plan) {
        return 0.0;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.updateFronts = function (population, fronts) {
        for (var i = 0; i < population.length; i++) {
            if (population[i].n === "0") {
                if (fronts[0] === "") {
                    fronts[0] = "" + i;
                }
                else {
                    fronts[0] == fronts[0] + "," + i;
                }
                population[i].rank = "1";
            }
        }
        var proceed = 1;
        var frontCounter = 0;
        var separatedPopulationIndex;
        var tempPlans;
        var eachQ;
        var tempSetQ;
        while (proceed != 0) {
            separatedPopulationIndex = fronts[frontCounter].split("[,]");
            for (var i = 0; i < separatedPopulationIndex; i++) {
                eachQ = population[separatedPopulationIndex[i]].setS.split("[,]");
                for (var j = 0; j < eachQ.length; j++) {
                    population[eachQ[j]].n = (parseInt((population[eachQ[j]].n)) - 1).toString();
                    if (population[eachQ[j]].n === "0") {
                        population[eachQ[j]].rank = (parseInt((population[eachQ[j]].rank)) + 1).toString();
                        if (tempSetQ === "") {
                            tempSetQ = "" + eachQ[j];
                        }
                        else {
                            tempSetQ = tempSetQ + "" + eachQ[j];
                        }
                    }
                }
            }
            fronts.push(tempSetQ);
            frontCounter++;
            if (fronts[fronts.length() - 1] === "") {
                proceed = 0;
            }
        }
        var wrapper = [];
        wrapper.push(population);
        wrapper.push(fronts);
        return wrapper;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.updatePopulation = function (population, fronts) {
        var tempPopulation = population;
        var populationLeft = population.length;
        var i = 0;
        var separatedReleasePlans;
        while (populationLeft > 0) {
            separatedReleasePlans = fronts[i].split("[,]");
            if (separatedReleasePlans.length >= populationLeft) {
                for (var j = 0; j < separatedReleasePlans.length; j++) {
                    population[i].repleasePlan = tempPopulation[parseInt(separatedReleasePlans[j])].repleasePlan;
                    i++;
                    populationLeft--;
                }
            }
            else {
                for (var j = 0; j < populationLeft; j++) {
                    population[i].repleasePlan = tempPopulation[parseInt(separatedReleasePlans[j])].repleasePlan;
                    i++;
                    populationLeft--;
                }
            }
        }
        return population;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.calculateCrowdingDistances = function (population, fronts) {
        var wrapper = [];
        wrapper.push(population);
        wrapper.push(fronts);
        return wrapper;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.makeCrossover = function (father, mother) {
        var result = [];
        var fatherSet = father.split(",");
        var motherSet = mother.split(",");
        var crossOverLocation = Math.ceil(this.crossoverConfig.testing.crossSectionPosition * fatherSet.length);
        while ((crossOverLocation == 0) || (crossOverLocation == 5)) {
            crossOverLocation = Math.ceil(Math.random() * fatherSet.length);
        }
        var firstFatherHalf = fatherSet.slice(0, crossOverLocation);
        var firstChild = fatherSet.slice(0, crossOverLocation);
        var firstMotherHalf = motherSet.slice(0, crossOverLocation);
        var secondChild = motherSet.slice(0, crossOverLocation);
        while (firstChild.length < motherSet.length) {
            var pointer = Math.ceil(Math.random() * motherSet.length) - 1;
            if (this.contains(firstChild, motherSet[pointer]) == false) {
                firstChild.push(motherSet[pointer]);
            }
        }
        while (secondChild.length < fatherSet.length) {
            var pointer = Math.ceil(Math.random() * fatherSet.length) - 1;
            if (this.contains(secondChild, fatherSet[pointer]) == false) {
                secondChild.push(fatherSet[pointer]);
            }
        }
        result.push(firstChild.toString());
        result.push(secondChild.toString());
        return result;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.contains = function (target, key) {
        var result = false;
        for (var i = 0; i < target.length; i++) {
            if (target[i] === key) {
                result = true;
            }
        }
        return result;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.makeMutation = function (solution) {
        var solutionSet = solution.split(",");
        var probability = this.mutationConfig.probability;
        for (var i = 0; i < solutionSet.length; i++) {
            var random = Math.random();
            if (random < probability) {
                var target = solutionSet[i];
                var swapIndex = Math.ceil(Math.random() * (solutionSet.length - 1));
                while (swapIndex == i) {
                    swapIndex = Math.ceil(Math.random() * (solutionSet.length - 1));
                }
                var swapTarget = solutionSet[swapIndex];
                console.log("Mutated: " + target + ":" + i + "<>" + swapTarget + ":" + swapIndex);
                solutionSet[i] = swapTarget;
                solutionSet[swapIndex] = target;
            }
        }
        return solutionSet.toString();
    };
    return NSGA2ReleasePlanningAlgorithm;
}());
NSGA2ReleasePlanningAlgorithm = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Object, Object, Object])
], NSGA2ReleasePlanningAlgorithm);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NSGA2ReleasePlanningAlgorithm;
