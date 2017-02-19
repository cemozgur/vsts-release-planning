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
            var fatherString = ["1,5,6,9,8,4,6,3"];
            var motherString = ["4,5,6,8,7,8,9,3"];
            var children = this.makeCrossover(fatherString, motherString);
            console.log(children[0]);
            console.log(this.makeMutation(children[0]));
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
        this.bitBlockSize = Math.max(this.getBitBlockSize(father), this.getBitBlockSize(mother));
        var decodedFather = this.decode(father);
        var decodedMother = this.decode(mother);
        var result = [];
        var crossSectionPosition = 0;
        if ((this.crossoverConfig.testing.enable == true) && (this.crossoverConfig.testing.randomCrossSection == true)) {
            crossSectionPosition = Math.ceil(Math.random() * (this.bitBlockSize * this.featureGenerationSize));
            if (crossSectionPosition < this.bitBlockSize) {
                crossSectionPosition = crossSectionPosition + this.bitBlockSize;
            }
        }
        else {
            crossSectionPosition = Math.ceil(this.crossoverConfig.testing.crossSectionPosition * this.bitBlockSize);
        }
        if (crossSectionPosition % this.bitBlockSize != 0) {
            crossSectionPosition = Math.abs((crossSectionPosition % this.bitBlockSize) - crossSectionPosition);
        }
        var firstChild = "";
        var secondChild = "";
        var temp = decodedFather;
        firstChild = temp.substring(0, crossSectionPosition);
        secondChild = temp.substring(crossSectionPosition, temp.length);
        var temp = decodedMother;
        firstChild = firstChild + temp.substring(crossSectionPosition, temp.length);
        secondChild = temp.substring(0, crossSectionPosition) + secondChild;
        result.push(firstChild);
        result.push(secondChild);
        return result;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.getBitBlockSize = function (solution) {
        return parseInt(this.getMaxNumber(solution));
    };
    NSGA2ReleasePlanningAlgorithm.prototype.decToBin = function (number) {
        var result = parseInt(number.toString(), 10).toString(2);
        return result;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.binToDec = function (number) {
        var result = parseInt(number.toString(), 2).toString(10);
        return result;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.getMaxNumber = function (solution) {
        var temp = solution.toString().split(",");
        for (var i = 0; i < temp.length; i++) {
            if (temp < parseInt(temp[i])) {
                temp = temp[i];
            }
        }
        return temp;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.preprend = function (target, repeatingString, time) {
        var result = "";
        var temp = new Array(time + 1).join(repeatingString);
        result = temp + target;
        return result;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.decode = function (solution) {
        var seperatedSolution = solution.toString().split(",");
        var result = "";
        for (var i = 0; i < seperatedSolution.length; i++) {
            var temp = this.decToBin(seperatedSolution[i]);
            if (temp.toString().length < this.bitBlockSize) {
                result = result + this.preprend(temp.toString(), "0", this.bitBlockSize - temp.toString().length);
            }
            else {
                result = result + temp;
            }
        }
        return result;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.makeMutation = function (solution) {
        var result = [];
        var mutated = false;
        var temp = solution;
        for (var j = 0; j < temp.length; j++) {
            var random = Math.random();
            if (random <= this.mutationConfig.probability) {
                mutated = true;
                temp = this.flipBit(temp, j);
            }
        }
        result.push(temp);
        if (mutated == true) {
        }
        return result;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.flipBit = function (target, index) {
        var result;
        if (target.charAt(index) == "1") {
            result = target.substr(0, index) + "0" + target.substr(index + 1, target.length);
        }
        else {
            result = target.substr(0, index) + "1" + target.substr(index + 1, target.length);
        }
        return result;
    };
    NSGA2ReleasePlanningAlgorithm.prototype.encodeSolution = function (solution) {
        var result = [];
        for (var i = 0; i < solution.length; i++) {
            var temp = [];
            var lowerIndex = 0;
            for (var j = 0; j <= solution[i].length; j++) {
                if (j % this.bitBlockSize == 0) {
                    if (j != 0) {
                        temp.push(this.binToDec(solution[i].slice(lowerIndex, j)));
                        lowerIndex = j;
                    }
                }
            }
            result.push(temp.toString());
        }
        return result;
    };
    return NSGA2ReleasePlanningAlgorithm;
}());
NSGA2ReleasePlanningAlgorithm = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Object, Object, Object])
], NSGA2ReleasePlanningAlgorithm);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NSGA2ReleasePlanningAlgorithm;
