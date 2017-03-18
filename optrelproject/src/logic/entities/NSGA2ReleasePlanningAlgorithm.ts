import { injectable, inject } from "inversify";
import "reflect-metadata";
import IReleasePlanningAlgorithm from "../interfaces/IReleasePlanningAlgorithm";
import { ReleasePlan } from "../../model/ReleasePlan";
import MonteCarloSimulation from "./MonteCarloSimulation";
import { WorkItem } from 'TFS/WorkItemTracking/Contracts';
import { IValidationMessage } from "../../model/IValidationMessage";
import { Util } from "./Util";
import ALGORITHM_TYPE from "../constants/algorithmType";


const monteCarloConfig = {
  populationSize: 10000,
  debug: false
};
const algorithmConfig = {
  population_size: 20,
  generation_number: 50,
  testing: {
    enable: false
  }
};
const crossoverConfig = {
  crossoverRate: 0.9,
  crossSectionPosition: 0,
  testing: {
    enable: false
  }
};
const mutationConfig = {
  probability: 0.03,
  testing: {
    enable: false
  }
};

@injectable()
class NSGA2ReleasePlanningAlgorithm implements IReleasePlanningAlgorithm {
  private populationSize;
  featureList: any[];

  getFeatureData(featuresVSTS: WorkItem[], featuresDeailtDocument: any): boolean {
    let featuresReleasePlan = [];
    let success = true;

    featuresVSTS.map((el, index) => {
      let feature: any = {
        featureNumber: (index + 1),
        workItemId: el.id,
        feature: el.fields["System.Title"],
        state: el.fields["System.State"],
        sprint: "0",
        selected: false
      }

      let detailInfo = featuresDeailtDocument.filter(el => {
        return (el.id == feature.workItemId);
      });

      if (detailInfo.length > 0) {
        Util.isValidReleaseTriangularInput(detailInfo[0].BusinessValue) ? feature.businessValue = parseInt((new MonteCarloSimulation(monteCarloConfig, { name: "triangular", value: { lowerBound: Number(detailInfo[0].BusinessValue.Min), mode: Number(detailInfo[0].BusinessValue.Expected), upperBound: Number(detailInfo[0].BusinessValue.Max) } }).getExpectedValue()).toString(), 10) : success = false;
        Util.isValidReleaseTriangularInput(detailInfo[0].Effort) ? feature.effort = parseInt((new MonteCarloSimulation(monteCarloConfig, { name: "triangular", value: { lowerBound: Number(detailInfo[0].Effort.Min), mode: Number(detailInfo[0].Effort.Expected), upperBound: Number(detailInfo[0].Effort.Max) } }).getExpectedValue()).toString(), 10) : success = false;
        Util.isValidReleaseTriangularInput(detailInfo[0].Cost) ? feature.cost = parseInt((new MonteCarloSimulation(monteCarloConfig, { name: "triangular", value: { lowerBound: Number(detailInfo[0].Cost.Min), mode: Number(detailInfo[0].Cost.Expected), upperBound: Number(detailInfo[0].Cost.Max) } }).getExpectedValue()).toString(), 10) : success = false;
        Util.isValidReleaseTriangularInput(detailInfo[0].Risk) ? feature.risk = parseInt((new MonteCarloSimulation(monteCarloConfig, { name: "triangular", value: { lowerBound: Number(detailInfo[0].Risk.Min), mode: Number(detailInfo[0].Risk.Expected), upperBound: Number(detailInfo[0].Risk.Max) } }).getExpectedValue()).toString(), 10) : success = false;
        Util.isValidReleaseTriangularInput(detailInfo[0].timeCriticality) ? feature.timeCriticality = parseInt((new MonteCarloSimulation(monteCarloConfig, { name: "triangular", value: { lowerBound: Number(detailInfo[0].timeCriticality.Min), mode: Number(detailInfo[0].timeCriticality.Expected), upperBound: Number(detailInfo[0].timeCriticality.Max) } }).getExpectedValue()).toString(), 10) : success = false;

        detailInfo[0].Dependency ? feature.dependsOn = detailInfo[0].Dependency : feature.dependsOn = "0";
        detailInfo[0].Dependency ? feature.dependsOnWorkItemId = detailInfo[0].Dependency : feature.dependsOnWorkItemId = "0";
      } else {
        success = false;
      }
      featuresReleasePlan.push(feature);
    });

    if (success) {
      featuresReleasePlan.map(feature => {
        if (feature.dependsOnWorkItemId != "0") {
          let dependencies = feature.dependsOnWorkItemId.split(",");
          let indexDependency = [];

          dependencies.map(workItemIdCheck => {
            let result = featuresReleasePlan.filter(el => {
              return (el.workItemId == workItemIdCheck)
            });
            if (result.length > 0) {
              indexDependency.push(result[0].featureNumber);
            }
          });

          feature.dependsOn = indexDependency.join(",");
        } else {
          feature.dependsOn = "";
          feature.dependsOnWorkItemId = "";
        }
      });

      this.featureList = featuresReleasePlan;
    }
    return success;
  }


  getReleasePlanType(): string {
    return "NSGA2 Algortihm";
  }

  testDataGeneration(config: any) {
  }

  validateConfigAlgorithm(config: any): IValidationMessage {
    if (!config) return {
      success: false,
      error: "Please fill in all the fields on the above section."
    };

    if (!(config.numberOfSprint && Util.isNumber(config.numberOfSprint))) {
      return {
        success: false,
        error: "Please, fill in a correct Number of Sprint. It must be greater than 0."
      }
    }
    if (!(config.sprintDuration && Util.isNumber(config.sprintDuration))) {
      return {
        success: false,
        error: "Please, fill in a correct Sprint Duration. It must be greater than 0."
      }
    }
    if (!Util.isValidReleaseTriangularInput(config.teamCapability)) {
      return {
        success: false,
        error: "Please, fill in a correct Team Capability. They must be greater than 0 and conform minimum <= expected <= maximum."
      }
    }
    if (!Util.isValidReleaseTriangularInput(config.discountValue)) {
      return {
        success: false,
        error: "Please, fill in a correct discount value. They must be greater than 0 and conform minimum <= expected <= maximum."
      }
    }
    return { success: true };
  }



  getOptimalReleasePlan(config: any): any {
    this.populationSize = algorithmConfig.population_size;

    let generationNumber = algorithmConfig.generation_number;
    let discountValue = parseInt((new MonteCarloSimulation(monteCarloConfig, { name: "triangular", value: { lowerBound: Number(config.discountValue.Min), mode: Number(config.discountValue.Expected), upperBound: Number(config.discountValue.Max) } }).getExpectedValue()).toString(), 10);
    let teamCapability = parseInt((new MonteCarloSimulation(monteCarloConfig, { name: "triangular", value: { lowerBound: Number(config.teamCapability.Min), mode: Number(config.teamCapability.Expected), upperBound: Number(config.teamCapability.Max) } }).getExpectedValue()).toString(), 10);

    var bestPlan1 = "";
    var bestPlan2 = "";
    var bestPlan3 = "";
    var proceed = true;
    var a = 0;

    var bestPlanSet = [];

    var featuresList = this.featureList;
    var fronts = [];
    fronts.push("");
    var population = [];
    var doublePopulation = [];

    population = this.initialiseParameters(population);
    population = this.initialisePopulation(featuresList, this.populationSize, population);
    doublePopulation = this.initialiseParameters(doublePopulation);

    var obj = [];
    obj = this.performNonDominatedSort(population, fronts, featuresList, discountValue);
    population = obj[0];
    fronts = obj[1];

    for (var i = 0; i < generationNumber; i++) {
      doublePopulation = this.combinePopulations(population, this.applyGeneticOperations(population, featuresList));
      fronts = [];
      fronts.push("");
      population = this.resetParameters(population);
      doublePopulation = this.resetParameters(doublePopulation);
      obj = this.performNonDominatedSort(doublePopulation, fronts, featuresList, discountValue);
      obj[0] = this.updatePopulation(obj[0], obj[1]);
      population = obj[0];
      fronts = obj[1];

      if (i == (generationNumber - 1)) {
        bestPlan1 = doublePopulation[(fronts[0].split(","))[0]].releasePlan;
        //console.log("bestPlan1 triggered" + bestPlan1);
        a++;
        while (proceed == true) {
          bestPlan2 = this.getNextBestPlan(doublePopulation, fronts, a);
          // console.log("bestPlan2 triggered" + bestPlan2);
          a++;
          if ((bestPlan2 != bestPlan1) || ((a + 1) >= doublePopulation.length)) {
            proceed = false;
          }
        }
        proceed = true;
        while (proceed == true) {
          bestPlan3 = this.getNextBestPlan(doublePopulation, fronts, a);
          // console.log("bestPlan3 triggered:" + bestPlan3);
          a++;
          if (((bestPlan3 != bestPlan1) && (bestPlan3 != bestPlan2)) || ((a + 1) >= doublePopulation.length)) {
            proceed = false;
          }
        }
      }

      fronts = [];
      fronts.push("");

    }

    bestPlanSet.push(bestPlan1);
    if (bestPlan1 != bestPlan2) {
      bestPlanSet.push(bestPlan2);
    }
    if ((bestPlan1 != bestPlan3) && (bestPlan2 != bestPlan3)) {
      bestPlanSet.push(bestPlan3);
    }

 
    return this.getReleasePlanAlternativet(bestPlanSet, discountValue, teamCapability, Number(config.numberOfSprint), Number(config.sprintDuration));

  }

  private getReleasePlanAlternativet(bestPlanSet: string[], discountValue: number, teamCapability: number,
    numberOfSprint: number, sprintDuration: number) {

    var ResultReleasePlanAlternatives = [];

    bestPlanSet.map(featureOrderId => {
      var featuresTargetOrder = this.featureList.map(a => Object.assign({}, a));//clonning!


      var ResultReleasePlan = {
        discountValue: discountValue,
        featureList: [], teamCapability: teamCapability,
        numberOfSprint: numberOfSprint, sprintDuration: sprintDuration,
        additional: false,
        algorithmType: ALGORITHM_TYPE.GA,
        totalRequiredEffort: 0,
        finalNPV: 0.0
      };

      var totalEffort = 0;
      featuresTargetOrder.map(el => {
        totalEffort += el.feature.effort;
      });
      ResultReleasePlan.totalRequiredEffort = totalEffort;

      var featuresTargetOrderId = featureOrderId.split(",");

      featuresTargetOrderId.map(featureTargetNumberId => {
        var target = featuresTargetOrder.filter(el => {
          if (el.featureNumber == featureTargetNumberId)
            return el;
        });
        ResultReleasePlan.featureList.push(target[0]);
      });

      Util.sprintAssignation(ResultReleasePlan);
      Util.getNetPresentValueReleasePlan(ResultReleasePlan);

      ResultReleasePlanAlternatives.push(ResultReleasePlan);
    });

    return ResultReleasePlanAlternatives;
  }

  getNextBestPlan(population: any, fronts: any, a: number) {
    //console.log("a: "+a);

    //console.log("length "+fronts.length);

    if (fronts.length == 1) {
      var nextBestPlanIndex = "";
      nextBestPlanIndex = fronts[0].split(",")[a];
      /*console.log(fronts[0].split(","));
      console.log(nextBestPlanIndex);*/
      return population[parseInt(nextBestPlanIndex)].releasePlan;
    } else if (fronts.length == 2) {
      var lengthOfFirstFront = fronts[0].split(",").length;
      var lengthOfSecondFront = fronts[1].split(",").length;
      var nextBestPlanIndex = "";

      if (lengthOfFirstFront > a) {
        nextBestPlanIndex = fronts[0].split(",")[a];
      }
      else {
        nextBestPlanIndex = fronts[0].split(",")[a - lengthOfFirstFront];
      }
      /*console.log(fronts[0].split(","));
      console.log(nextBestPlanIndex);*/
      return population[parseInt(nextBestPlanIndex)].releasePlan;

    } else {

      var lengthOfFirstFront = fronts[0].split(",").length;
      var lengthOfSecondFront = fronts[1].split(",").length;
      var lengthOfThirdFront = fronts[2].split(",").length;
      var nextBestPlanIndex = "";

      if (lengthOfFirstFront > a) {
        nextBestPlanIndex = fronts[0].split(",")[a];
      }
      else if ((lengthOfSecondFront + lengthOfFirstFront) > a) {
        nextBestPlanIndex = fronts[1].split(",")[a - lengthOfFirstFront];
      } else {
        /*console.log(fronts);
        console.log(a+"-"+lengthOfFirstFront+"-"+lengthOfSecondFront+"-"+2);*/
        nextBestPlanIndex = fronts[2].split(",")[a - lengthOfFirstFront - lengthOfSecondFront];
      }
      //console.log(nextBestPlanIndex);
      return population[parseInt(nextBestPlanIndex)].releasePlan;

    }
  }


  combinePopulations(population: any, secondPopulation: any) {
    var doublePopulation = [];
    for (var i = 0; i < population.length; i++) {
      doublePopulation.push(population[i]);
    }
    for (var i = 0; i < population.length; i++) {
      doublePopulation.push(secondPopulation[i]);
    }
    return doublePopulation;
  }

  initialisePopulation(features: any, populationSize: any, population: any) {

    var usedFeatures = "";
    var temp = "";
    for (var i = 0; i < populationSize; i++) {

      for (var j = 0; j < features.length; j++) {
        temp = this.generateRandomFeature(usedFeatures, j, features);
        if (j == 0) {
          usedFeatures = temp;
        } else {
          usedFeatures = usedFeatures + "," + temp;
        }
      }
      population[i].releasePlan = usedFeatures;
      usedFeatures = "";
    }
    return population;
  }

  getRandomNumber(number: number) {
    return Math.floor(Math.random() * number);
  }

  generateRandomFeature(usedFeatures: string, numberOfUsedFeatures: number, features: any) {

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

    var temps = options.split(",");
    return temps[rand];

  }

  checkDependency(featureNumber: string, usedFeatures: string, features: any) {
    if (this.checkIfUsed(featureNumber, usedFeatures) == false) {
      if (this.checkIfDepends(featureNumber, features) == false) {
        return true;
      } else {
        if (this.checkIfDependsOnUsed(featureNumber, usedFeatures, features) == true) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  checkIfUsed(featureNumber: string, usedFeatures: string) {

    var usedFeaturesSeparated = usedFeatures.split(",");

    for (var i = 0; i < usedFeaturesSeparated.length; i++) {
      if (featureNumber == usedFeaturesSeparated[i]) {
        return true;
      }
    }
    return false;
  }

  checkIfDepends(featureNumber: string, features: any) {
    if (features[parseInt(featureNumber) - 1].dependsOn == "") {
      return false;
    }
    return true;
  }

  checkIfDependsOnUsed(featureNumber: string, usedFeatures: string, features: any) {
    var usedFeaturesSeparated = usedFeatures.split(",");
    var dependentFeaturesSeparated = features[parseInt(featureNumber) - 1].dependsOn.split(",");

    var answer = false;

    for (var i = 0; i < dependentFeaturesSeparated.length; i++) {
      for (var j = 0; j < usedFeaturesSeparated.length; j++) {
        if ((dependentFeaturesSeparated[i] == usedFeaturesSeparated[j]) == true) {
          answer = true;
        }
      }
      if (answer == false) {
        return false;
      }
      answer = false;
    }
    return true;
  }

  performNonDominatedSort(population: any, fronts: any, featuresList: any, discountValue: number) {

    for (var i = 0; i < population.length; i++) {
      for (var j = 0; j < population.length; j++) {
        if (i == j) {
          continue;
        }
        if (this.checkIfFirstDominatesSecond(population[i].releasePlan, population[j].releasePlan, featuresList, discountValue) == true) {
          if (population[i].setS == "") {
            population[i].setS = "" + j;
          } else {
            population[i].setS = population[i].setS + "," + j;
          }
        } else if (this.checkIfFirstDominatesSecond(population[j].releasePlan, population[i].releasePlan, featuresList, discountValue) == true) {
          population[i].n = String(parseInt(population[i].n) + 1);

        }
      }
    }

    var wrapper = [];

    wrapper = this.updateFronts(population, fronts);
    wrapper = this.calculateCrowdingDistances(wrapper[0], wrapper[1], featuresList, discountValue);
    return wrapper;
  }

  checkIfFirstDominatesSecond(plan1: string, plan2: string, features: any, discountValue: number) {
    if ((this.calculateObjective1(plan1, features, discountValue) == this.calculateObjective1(plan2, features, discountValue)) && (this.calculateObjective2(plan1, features) > this.calculateObjective2(plan2, features)) ||
      (this.calculateObjective1(plan1, features, discountValue) > this.calculateObjective1(plan2, features, discountValue)) && (this.calculateObjective2(plan1, features) == this.calculateObjective2(plan2, features)) ||
      (this.calculateObjective1(plan1, features, discountValue) > this.calculateObjective1(plan2, features, discountValue)) && (this.calculateObjective2(plan1, features) > this.calculateObjective2(plan2, features))) {
      return true;
    }
    return false;
  }

  calculateObjective1(plan: any, features: any, discountValue: any) {
    var npv = 0;
    var e = 0.0;
    var f = 0.0;
    var splitPlan = plan.split(",");

    for (var j = 0; j < splitPlan.length; j++) {
      for (var i = j + 1; i <= (splitPlan.length); i++) {
        e = i;
        npv += features[parseInt(splitPlan[j]) - 1].businessValue / Math.pow((1 + (discountValue / 100)), e);

      }
      f = j;
      npv -= features[parseInt(splitPlan[j]) - 1].cost / Math.pow((1 + (discountValue / 100)), f);
    }

    return npv;
  }

  calculateObjective2(plan: string, features: any) {
    var totalWeight = 0.0;
    var separatedPlan = plan.split(",");

    for (var i = 0; i < separatedPlan.length; i++) {
      totalWeight += parseFloat(features[parseInt(separatedPlan[i]) - 1].timeCriticality) / (parseFloat(features[parseInt(separatedPlan[i]) - 1].risk) * (i + 1));
      //totalWeight += Double.parseDouble(features[Integer.parseInt(separatedPlan[i])-1][3])/(Double.parseDouble(features[Integer.parseInt(separatedPlan[i])-1][6])*(i+1));
    }

    return totalWeight;
  }

  updateFronts(population: any, fronts: any) {

    for (var i = 0; i < population.length; i++) {
      if (population[i].n == "0") {
        if (fronts[0] == "") {
          fronts[0] = "" + i;
        } else {
          fronts[0] = fronts[0] + "," + i;
        }
        population[i].rank = "1";
      }
    }

    var proceed = 1;
    var frontCounter = 0;
    var separatedPopulationIndex = [];
    var eachQ = [];
    var tempSetQ = "";
    var frontSizeTemp = 0;
    var lastFront = "";
    var tempForLastFront = "";
    var tempArray = [];

    while (proceed != 0 && frontCounter < population.length) {
      frontSizeTemp = fronts.length;
      separatedPopulationIndex = fronts[frontCounter].split(",");
      if (separatedPopulationIndex[0] == "") {
        break;
      }
      for (var i = 0; i < separatedPopulationIndex.length; i++) {
        eachQ = population[parseInt(separatedPopulationIndex[i])].setS.split(",");

        if (eachQ[0] == "") {
          continue;
        }

        for (var j = 0; j < eachQ.length; j++) {
          population[parseInt(eachQ[j])].n = String(parseInt(population[parseInt(eachQ[j])].n) - 1);
          if (population[parseInt(eachQ[j])].n == "0") {
            population[parseInt(eachQ[j])].rank = String(frontCounter + 1);

            if (tempSetQ == "") {
              tempSetQ = "" + eachQ[j];
            } else {
              tempSetQ = tempSetQ + "," + eachQ[j];
            }
          }
        }
      }

      fronts.push(tempSetQ);
      tempSetQ = "";
      frontCounter++;
      if (fronts.length == frontSizeTemp) {
        for (var i = 0; i < fronts.length; i++) {
          if (tempForLastFront == "") {
            tempForLastFront = fronts[i];
          } else {
            tempForLastFront = tempForLastFront + "," + fronts[i];
          }
        }
        tempArray = tempForLastFront.split(",");
        var isItUsed = false;
        for (var i = 0; i < population.length; i++) {
          for (var j = 0; j < tempArray.length; j++) {
            if (tempArray[j] == ("" + i)) {
              isItUsed = true;
            }
          }
          if (isItUsed == false) {
            if (lastFront == "") {
              lastFront = "" + i;
            } else {
              lastFront = lastFront + "," + i;
            }
          }
          isItUsed = false;
        }
        fronts.add(lastFront);
        proceed = 0;
      }
    }

    fronts.splice(-1);//Remove the last element of the array ?

    var wrapper = [];
    wrapper.push(population);
    wrapper.push(fronts);

    return wrapper;
  }

  updatePopulation(oldPopulation: any, fronts: any) {
    var tempPopulation = [];
    var populationLeft = oldPopulation.length / 2;
    var tempForPopulationLeft = populationLeft;
    var i = 0;
    var b = 0;
    var separatedReleasePlans = [];

    while ((populationLeft > 0)/*&& (fronts.length<i)*/) {
      separatedReleasePlans = fronts[b].split(",");
      b++;
      /*if(separatedReleasePlans[0] == ""){
        i++;
        continue;
      }*/
      if (separatedReleasePlans.length <= populationLeft) {
        for (var j = 0; j < separatedReleasePlans.length; j++) {
          tempPopulation[i] = oldPopulation[parseInt(separatedReleasePlans[j])];
          i++;
          populationLeft--;
        }
      } else {
        tempForPopulationLeft = populationLeft;
        for (var j = 0; j < tempForPopulationLeft; j++) {
          tempPopulation[i] = oldPopulation[parseInt(separatedReleasePlans[j])];
          i++;
          populationLeft--;
        }
      }
    }
    return tempPopulation;
  }

  initialiseParameters(population: any) {
    population = [];
    for (var i = 0; i < this.populationSize; i++) {
      var temp = {
        setS: "",
        n: "0",
        crowdingDistance: "0.0",
        rank: "0"
      };
      population.push(temp);
    }
    return population;
  }

  resetParameters(population: any) {
    for (var i = 0; i < this.populationSize; i++) {
      population[i].setS = "";
      population[i].n = "0";
      population[i].crowdingDistance = "0.0";
      population[i].rank = "0";
    }
    return population;
  }

  calculateCrowdingDistances(population: any, fronts: any, features: any, discountValue: number) {
    var sorted = "";
    var separatedFrontElement;

    for (var i = 0; i < fronts.length; i++) {
      for (var j = 0; j < 2; j++) {
        sorted = this.sort(fronts[i], j, population, features, discountValue);
        separatedFrontElement = sorted.split(",");
        population[parseInt(separatedFrontElement[0])].crowdingDistance = String(999999999999.0);
        population[parseInt(separatedFrontElement[separatedFrontElement.length - 1])].crowdingDistance = String(999999999999.0);
        for (var k = 1; k < separatedFrontElement.length - 1; k++) {
          population[parseInt(separatedFrontElement[k])].crowdingDistance = String(parseFloat(population[parseInt(separatedFrontElement[k])].crowdingDistance) + ((this.calculateObjectiveForCrowding(population[parseInt(separatedFrontElement[k + 1])].releasePlan, j, features, discountValue) - this.calculateObjectiveForCrowding(population[parseInt(separatedFrontElement[k - 1])].releasePlan, j, features, discountValue)) / (this.getObjectiveValueRange(j))));
        }
      }
    }

    var wrapper = [];
    wrapper.push(population);
    wrapper.push(fronts);
    return wrapper;
  }

  getObjectiveValueRange(j: number) {
    if (j == 0) { //For the first objective function
      return 99999999.0;
    } else { //For the second objective function
      return 5.0;
    }
  }

  sort(frontElement: string, j: number, population: any, features: any, discountValue: number) {
    var separatedFrontElement = frontElement.split(",");

    var swapped = true;
    var temp = "";
    while (swapped == true) {
      swapped = false;
      for (var i = 1; i < separatedFrontElement.length; i++) {
        if (this.calculateObjectiveForCrowding(population[parseInt(separatedFrontElement[i - 1])].releasePlan, j, features, discountValue) > this.calculateObjectiveForCrowding(population[parseInt(separatedFrontElement[i])].releasePlan, j, features, discountValue)) {
          temp = separatedFrontElement[i - 1];
          separatedFrontElement[i - 1] = separatedFrontElement[i];
          separatedFrontElement[i] = temp;
          swapped = true;
        }
      }
    }

    var sortedFronts = "";
    for (var i = 0; i < separatedFrontElement.length; i++) {
      if (i == 0) {
        sortedFronts = separatedFrontElement[i];
      } else {
        sortedFronts = sortedFronts + "," + separatedFrontElement[i];
      }
    }

    return sortedFronts;

  }

  calculateObjectiveForCrowding(plan: string, a: number, features: any, discountValue: number) {
    var result = 0.0;
    if (a == 0) {
      result = this.calculateObjective1(plan, features, discountValue);
    } else {
      result = this.calculateObjective2(plan, features);
    }
    return result;
  }


  applyGeneticOperations(population: any, features: any) {
    var father = 0;
    var mother = 0;
    var children = [];
    var newPopulation = []
    newPopulation = this.initialiseParameters(newPopulation);
    var proceed = true;
    var temp1 = "";
    var temp2 = "";

    for (var i = 0; i < newPopulation.length / 2; i++) {
      while (proceed == true) {
        father = this.selection(population);
        mother = this.selection(population);
        children = this.makeCrossover(population[father].releasePlan, population[mother].releasePlan);
        temp1 = this.makeMutation(children[0]);
        temp2 = this.makeMutation(children[1]);

        if ((this.checkIfSuitable(temp1, features) == true) && (this.checkIfSuitable(temp2, features) == true)) {
          proceed = false;
          newPopulation[2 * i].releasePlan = temp1;
          newPopulation[2 * i + 1].releasePlan = temp2;
        }
      }
      proceed = true;
    }

    return newPopulation;
  }

  checkIfSuitable(childsElement: string, features: any) {
    var separatedElement = childsElement.split(",");
    var separatedDependents;

    if ((features[parseInt(separatedElement[0]) - 1].dependsOn == "") == false) {
      return false;
    }

    for (var i = 0; i < separatedElement.length; i++) {
      if ((features[parseInt(separatedElement[i]) - 1].dependsOn == "") == false) {
        separatedDependents = features[parseInt(separatedElement[i]) - 1].dependsOn.split(",");
        for (var j = 0; j < separatedDependents.length; j++) {
          if (this.checkDependsOnUsedBefore(i, separatedElement, separatedDependents[j]) == false) {
            return false;
          }
        }
      }
    }
    return true;

  }

  checkDependsOnUsedBefore(i: number, separatedElement: any, separatedDependentElement: any) {
    for (var a = 0; a < i; a++) {
      if (separatedElement[a] == separatedDependentElement) {
        return true;
      }
    }
    return false;
  }

  selection(population: any) {
    var parentIndex = parseInt((Math.random() * population.length).toString(), 10);
    var tempParentIndex = 0;
    var tournamentSize = 10;

    for (var i = 0; i < 10; i++) {
      tempParentIndex = parseInt((Math.random() * population.length).toString(), 10);
      if ((parseInt(population[tempParentIndex].rank) < parseInt(population[parentIndex].rank)) || ((parseInt(population[tempParentIndex].rank) == parseInt(population[parentIndex].rank)) && ((parseFloat(population[tempParentIndex].crowdingDistance)) > (parseFloat(population[parentIndex].crowdingDistance))))) {
        parentIndex = tempParentIndex;
      }
    }
    return parentIndex;
  }

  makeCrossover(father: string, mother: string) {
    var result = [];

    var rand = Math.random();

    if (rand <= crossoverConfig.crossoverRate) {
      var fatherSet = father.split(",");
      var motherSet = mother.split(",");
      var crossOverLocation = Math.ceil(crossoverConfig.crossSectionPosition * fatherSet.length);
      while ((crossOverLocation == 0) || (crossOverLocation == (father.length - 1))) {
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
    } else {
      result.push(father);
      result.push(mother);
    }


    return result;

  }

  contains(target: string[], key: string) {
    var result = false;
    for (var i = 0; i < target.length; i++) {
      if (target[i] == key) {
        result = true;
      }
    }
    return result;
  }

  makeMutation(solution: string) {
    var solutionSet = solution.split(",");
    var probability = mutationConfig.probability;
    for (var i = 0; i < solutionSet.length; i++) {
      var random = Math.random();
      if (random < probability) {

        var target = solutionSet[i];

        var swapIndex = Math.ceil(Math.random() * (solutionSet.length - 1));
        while (swapIndex == i) {
          swapIndex = Math.ceil(Math.random() * (solutionSet.length - 1));
        }
        var swapTarget = solutionSet[swapIndex];
        solutionSet[i] = swapTarget;
        solutionSet[swapIndex] = target;

      }
    }
    return solutionSet.toString();
  }

}

export default NSGA2ReleasePlanningAlgorithm;
