import { injectable, inject } from "inversify";
import "reflect-metadata";
import IReleasePlanningAlgorithm from "../interfaces/IReleasePlanningAlgorithm";
import { ReleasePlan } from "../../model/ReleasePlan";
import MonteCarloSimulation from "./MonteCarloSimulation";

@injectable()
class NSGA2ReleasePlanningAlgorithm implements IReleasePlanningAlgorithm {
    //Unused As of Now
    private TeamCapability: number[];

    private populationSize;
    private generationNumber;
    private discountValue;
    private crossoverConfig;
    private mutationConfig;


    getReleasePlanType(): string {
        return "NSGA2 Algortihm";
    }

    testDataGeneration(config: any) {
    }

    getOptimalReleasePlan() {
        return {result: "Implementing"};
    }

    constructor(crossoverConfig : any,mutationConfig : any,algorithmConfig : any){
      this.populationSize = algorithmConfig.population_size;
      this.generationNumber = algorithmConfig.generation_number;
      this.crossoverConfig = crossoverConfig;
      this.mutationConfig = mutationConfig;
      this.discountValue = algorithmConfig.discount_value;
      var bestPlan = "";

      var monteCarloConfig = {
          populationSize : 10000,
          debug : false
      };

      if(algorithmConfig.testing.enable == true){
        //NSGA-II Flow, To be tested
        var featuresList = [
          {
            featureNumber : "1",
            businessValue : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 50, mode: 60, upperBound : 100}}).getExpectedValue()).toString(),10),
            effort : "10",
            timeCriticality : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 1, mode: 3, upperBound : 5}}).getExpectedValue()).toString(),10),
            dependsOn : "",
            cost : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 10, mode: 30, upperBound : 50}}).getExpectedValue()).toString(),10),
            risk : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 1, mode: 3, upperBound : 5}}).getExpectedValue()).toString(),10)
          },
          {
            featureNumber : "2",
            businessValue : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 30, mode: 40, upperBound : 200}}).getExpectedValue()).toString(),10),
            effort : "20",
            timeCriticality : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 2, mode: 4, upperBound : 5}}).getExpectedValue()).toString(),10),
            dependsOn : "",
            cost : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 5, mode: 9, upperBound : 15}}).getExpectedValue()).toString(),10),
            risk : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 1, mode: 2, upperBound : 5}}).getExpectedValue()).toString(),10)
          },
          {
            featureNumber : "3",
            businessValue : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 100, mode: 140, upperBound : 200}}).getExpectedValue()).toString(),10),
            effort : "30",
            timeCriticality : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 1, mode: 1, upperBound : 1}}).getExpectedValue()).toString(),10),
            dependsOn : "",
            cost : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 70, mode: 80, upperBound : 90}}).getExpectedValue()).toString(),10),
            risk : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 1, mode: 3, upperBound : 4}}).getExpectedValue()).toString(),10)
          },
          {
            featureNumber : "4",
            businessValue : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 50, mode: 100, upperBound : 110}}).getExpectedValue()).toString(),10),
            effort : "40",
            timeCriticality : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound :3, mode: 4, upperBound : 5}}).getExpectedValue()).toString(),10),
            dependsOn : "",
            cost : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 90, mode: 100, upperBound : 130}}).getExpectedValue()).toString(),10),
            risk : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 1, mode: 2, upperBound : 2}}).getExpectedValue()).toString(),10)
          },
          {
            featureNumber : "5",
            businessValue : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 500, mode: 600, upperBound : 1000}}).getExpectedValue()).toString(),10),
            effort : "10",
            timeCriticality : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 2, mode: 2, upperBound : 5}}).getExpectedValue()).toString(),10),
            dependsOn : "3",
            cost : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 10, mode: 30, upperBound : 50}}).getExpectedValue()).toString(),10),
            risk : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 1, mode: 2, upperBound : 3}}).getExpectedValue()).toString(),10)
          },
          {
            featureNumber : "6",
            businessValue : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 500, mode: 600, upperBound : 1000}}).getExpectedValue()).toString(),10),
            effort : "10",
            timeCriticality : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 2, mode: 2, upperBound : 5}}).getExpectedValue()).toString(),10),
            dependsOn : "3",
            cost : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 10, mode: 30, upperBound : 50}}).getExpectedValue()).toString(),10),
            risk : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 1, mode: 2, upperBound : 3}}).getExpectedValue()).toString(),10)
          },
          {
            featureNumber : "7",
            businessValue : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 500, mode: 600, upperBound : 1000}}).getExpectedValue()).toString(),10),
            effort : "10",
            timeCriticality : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 2, mode: 2, upperBound : 5}}).getExpectedValue()).toString(),10),
            dependsOn : "3",
            cost : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 10, mode: 30, upperBound : 50}}).getExpectedValue()).toString(),10),
            risk : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 1, mode: 2, upperBound : 3}}).getExpectedValue()).toString(),10)
          },
          {
            featureNumber : "8",
            businessValue : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 500, mode: 600, upperBound : 1000}}).getExpectedValue()).toString(),10),
            effort : "10",
            timeCriticality : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 2, mode: 2, upperBound : 5}}).getExpectedValue()).toString(),10),
            dependsOn : "3",
            cost : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 10, mode: 30, upperBound : 50}}).getExpectedValue()).toString(),10),
            risk : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 1, mode: 2, upperBound : 3}}).getExpectedValue()).toString(),10)
          },
          {
            featureNumber : "9",
            businessValue : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 500, mode: 600, upperBound : 1000}}).getExpectedValue()).toString(),10),
            effort : "10",
            timeCriticality : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 2, mode: 2, upperBound : 5}}).getExpectedValue()).toString(),10),
            dependsOn : "3",
            cost : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 10, mode: 30, upperBound : 50}}).getExpectedValue()).toString(),10),
            risk : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 1, mode: 2, upperBound : 3}}).getExpectedValue()).toString(),10)
          },
          {
            featureNumber : "10",
            businessValue : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 500, mode: 600, upperBound : 1000}}).getExpectedValue()).toString(),10),
            effort : "10",
            timeCriticality : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 2, mode: 2, upperBound : 5}}).getExpectedValue()).toString(),10),
            dependsOn : "3",
            cost : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 10, mode: 30, upperBound : 50}}).getExpectedValue()).toString(),10),
            risk : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 1, mode: 2, upperBound : 3}}).getExpectedValue()).toString(),10)
          },
          {
            featureNumber : "11",
            businessValue : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 500, mode: 600, upperBound : 1000}}).getExpectedValue()).toString(),10),
            effort : "10",
            timeCriticality : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 2, mode: 2, upperBound : 5}}).getExpectedValue()).toString(),10),
            dependsOn : "3",
            cost : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 10, mode: 30, upperBound : 50}}).getExpectedValue()).toString(),10),
            risk : parseInt((new MonteCarloSimulation(monteCarloConfig,{ name : "triangular" , value : {lowerBound : 1, mode: 2, upperBound : 3}}).getExpectedValue()).toString(),10)
          }
        ];

        var fronts = [];
        fronts.push("");
        var population = [];
        var doublePopulation = [];

        population = this.initialiseParameters(population);
        population = this.initialisePopulation(featuresList, this.populationSize, population);
        doublePopulation = this.initialiseParameters(doublePopulation);

        var obj = [];
        obj = this.performNonDominatedSort(population, fronts, featuresList, this.discountValue);
        population = obj[0];
        fronts = obj[1];

       for(var i = 0 ; i < this.generationNumber ; i++){
         doublePopulation = this.combinePopulations(population, this.applyGeneticOperations(population));
          fronts = [];
          fronts.push("");
          population = this.resetParameters(population);
          doublePopulation = this.resetParameters(doublePopulation);
          obj = this.performNonDominatedSort(doublePopulation, fronts, featuresList, this.discountValue);
          obj[0] = this.updatePopulation(obj[0],obj[1]);
          population = obj[0];
          fronts = obj[1];

          if(i == (this.generationNumber-1)){
            bestPlan = population[(fronts[0].split(","))[0]].releasePlan;
          }

          fronts = [];
          fronts.push("");

        }
        console.log("bestPlan is :" +bestPlan);
      }
    }



  combinePopulations(population : any, secondPopulation : any){
    var doublePopulation = [];
    for(var i=0 ; i<population.length ; i++){
      doublePopulation.push(population[i]);
    }
    for(var i=0 ; i<population.length ; i++){
      doublePopulation.push(secondPopulation[i]);
    }
    return doublePopulation;
  }

  initialisePopulation(features : any, populationSize: any , population : any){

    var usedFeatures = "";
    var temp = "";
    for(var i=0 ; i < populationSize ; i++){

      for(var j = 0 ; j < features.length ; j++){
        temp = this.generateRandomFeature(usedFeatures,j,features);
        if(j==0){
          usedFeatures = temp;
        }else{
          usedFeatures = usedFeatures + "," + temp;
        }
      }
      population[i].releasePlan = usedFeatures;
      usedFeatures = "";
      }
      return population;
  }

  getRandomNumber(number : number){
    return Math.floor(Math.random() * number);
  }

  generateRandomFeature(usedFeatures : string, numberOfUsedFeatures : number, features : any){

    var options = "";
    var count = 0;
    var tempI = "";
    for(var i = 1 ; i < features.length+1 ; i++){
      tempI = i.toString();
      if(this.checkDependency(tempI, usedFeatures, features) == true){
        options += tempI + ",";
        count++;
      }
    }
    options = options.substring(0,(options.length-1));
    var rand = this.getRandomNumber(count);

    var temps = options.split(",");
    return temps[rand];

  }

  checkDependency(featureNumber : string, usedFeatures : string, features : any){
    if(this.checkIfUsed(featureNumber, usedFeatures) == false){
      if(this.checkIfDepends(featureNumber, features) == false){
        return true;
      } else {
        if(this.checkIfDependsOnUsed(featureNumber, usedFeatures, features) == true){
          return true;
        } else{
          return false;
        }
      }
    }else {
      return false;
    }
  }

  checkIfUsed(featureNumber : string, usedFeatures : string){

    var usedFeaturesSeparated = usedFeatures.split(",");

    for(var i = 0 ; i < usedFeaturesSeparated.length ; i++){
      if(featureNumber == usedFeaturesSeparated[i]){
        return true;
      }
    }
    return false;
  }

  checkIfDepends(featureNumber : string, features : any){
    if(features[parseInt(featureNumber)-1].dependsOn == ""){
      return false;
    }
    return true;
  }

  checkIfDependsOnUsed(featureNumber : string, usedFeatures : string, features : any){
    var usedFeaturesSeparated = usedFeatures.split(",");
    var dependentFeaturesSeparated = features[parseInt(featureNumber)-1].dependsOn.split(",");

    var answer = false;

    for(var i=0 ; i < dependentFeaturesSeparated.length ; i++){
      for(var j=0 ; j < usedFeaturesSeparated.length ; j++){
        if((dependentFeaturesSeparated[i] == usedFeaturesSeparated[j]) == true){
          answer = true;
        }
      }
      if(answer == false){
        return false;
      }
      answer = false;
    }
    return true;
  }

  performNonDominatedSort(population : any , fronts : any , featuresList : any , discountValue : number){

    for(var i=0; i<population.length ; i++){
      for(var j=0; j<population.length ; j++){
        if(i == j){
          continue;
        }
        if(this.checkIfFirstDominatesSecond(population[i].releasePlan, population[j].releasePlan, featuresList, discountValue) == true){
          if(population[i].setS == ""){
            population[i].setS = "" + j;
          }else{
            population[i].setS = population[i].setS + "," + j;
          }
        }else if(this.checkIfFirstDominatesSecond(population[j].releasePlan, population[i].releasePlan, featuresList, discountValue) == true){
          population[i].n = String(parseInt(population[i].n)+1);

        }
      }
    }

    var wrapper = [];

    wrapper = this.updateFronts(population , fronts);
    wrapper = this.calculateCrowdingDistances(wrapper[0], wrapper[1], featuresList, discountValue);
    return wrapper;
  }

  checkIfFirstDominatesSecond(plan1 : string, plan2 : string, features : any, discountValue : number){
    if((this.calculateObjective1(plan1, features, discountValue)==this.calculateObjective1(plan2, features, discountValue)) && (this.calculateObjective2(plan1, features)>this.calculateObjective2(plan2, features)) ||
      (this.calculateObjective1(plan1, features, discountValue)>this.calculateObjective1(plan2, features, discountValue)) && (this.calculateObjective2(plan1, features)==this.calculateObjective2(plan2, features)) ||
      (this.calculateObjective1(plan1, features, discountValue)>this.calculateObjective1(plan2, features, discountValue)) && (this.calculateObjective2(plan1, features)>this.calculateObjective2(plan2, features)) ){
            return true;
    }
    return false;
  }

  calculateObjective1(plan : any, features :any , discountValue : any){
    var npv = 0;
    var e = 0.0;
    var f = 0.0;
    var splitPlan = plan.split(",");
    for(var j = 0 ; j < splitPlan.length ; j++){
      for(var i=j+1; i <=(splitPlan.length) ; i++){
        e = i;
        npv += features[parseInt(splitPlan[j])-1].businessValue/Math.pow((1+(discountValue/100)),e);

      }
      f = j;
      npv -= features[parseInt(splitPlan[j])-1].cost/Math.pow((1+(discountValue/100)),f);
    }

    return npv;
  }

  calculateObjective2(plan : string, features : any){
    var totalWeight = 0.0;
    var separatedPlan = plan.split(",");

    for(var i =0 ; i < separatedPlan.length ; i++){
      totalWeight += parseFloat(features[parseInt(separatedPlan[i])-1].timeCriticality)/(parseFloat(features[parseInt(separatedPlan[i])-1].risk)*(i+1));
      //totalWeight += Double.parseDouble(features[Integer.parseInt(separatedPlan[i])-1][3])/(Double.parseDouble(features[Integer.parseInt(separatedPlan[i])-1][6])*(i+1));
    }

    return totalWeight;
  }

  updateFronts(population : any, fronts : any){

    for(var i=0 ; i < population.length ; i++){
      if(population[i].n == "0"){
        if(fronts[0] == ""){
          fronts[0] = "" + i;
        }else {
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

   while(proceed != 0 && frontCounter<population.length){
      frontSizeTemp = fronts.length;
      separatedPopulationIndex = fronts[frontCounter].split(",");
      if(separatedPopulationIndex[0] == ""){
        break;
      }
      for(var i = 0 ; i < separatedPopulationIndex.length ; i ++){
        eachQ = population[parseInt(separatedPopulationIndex[i])].setS.split(",");

        if(eachQ[0] == ""){
          continue;
        }

        for(var j = 0; j < eachQ.length ; j++){
          population[parseInt(eachQ[j])].n = String(parseInt(population[parseInt(eachQ[j])].n)-1);
          if(population[parseInt(eachQ[j])].n == "0"){
            population[parseInt(eachQ[j])].rank = String(frontCounter+1);

            if(tempSetQ==""){
              tempSetQ = "" + eachQ[j];
            }else{
              tempSetQ = tempSetQ + "," + eachQ[j];
            }
          }
        }
      }

      fronts.push(tempSetQ);
      tempSetQ = "";
      frontCounter++;
      if(fronts.length == frontSizeTemp){
        for(var i=0; i<fronts.length ; i++){
          if(tempForLastFront == ""){
            tempForLastFront = fronts[i];
          }else{
            tempForLastFront = tempForLastFront + "," + fronts[i];
          }
        }
        tempArray = tempForLastFront.split(",");
        var isItUsed = false;
        for(var i = 0; i < population.length; i++){
          for(var j = 0; j < tempArray.length; j++){
            if(tempArray[j] == ("" + i)){
              isItUsed = true;
            }
          }
          if(isItUsed == false){
            if(lastFront == ""){
              lastFront = "" + i;
            }else{
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

  updatePopulation(oldPopulation : any, fronts : any){
    var tempPopulation = [];
    var populationLeft = oldPopulation.length/2;
    var tempForPopulationLeft = populationLeft;
    var i = 0;
    var b = 0;
    var separatedReleasePlans = [];

    while((populationLeft>0)/*&& (fronts.length<i)*/){
      separatedReleasePlans = fronts[b].split(",");
      b++;
      /*if(separatedReleasePlans[0] == ""){
        i++;
        continue;
      }*/
      if(separatedReleasePlans.length<=populationLeft){
        for(var j = 0 ; j < separatedReleasePlans.length ; j++){
          tempPopulation[i] = oldPopulation[parseInt(separatedReleasePlans[j])];
          i++;
          populationLeft--;
        }
      }else{
        tempForPopulationLeft = populationLeft;
        for(var j = 0 ; j < tempForPopulationLeft ; j++){
          tempPopulation[i] = oldPopulation[parseInt(separatedReleasePlans[j])];
          i++;
          populationLeft--;
        }
      }
    }
    return tempPopulation;
  }

  initialiseParameters(population : any){
    population = [];
    for(var i = 0; i < this.populationSize ; i++){
      var temp = {
        setS : "",
        n : "0",
        crowdingDistance : "0.0",
        rank : "0"
      };
      population.push(temp);
    }
    return population;
  }

  resetParameters(population : any){
    for(var i = 0; i < this.populationSize ; i++){
      population[i].setS = "";
      population[i].n = "0";
      population[i].crowdingDistance = "0.0";
      population[i].rank = "0";
    }
    return population;
  }

  calculateCrowdingDistances(population : any, fronts : any, features : any, discountValue : number){
    var sorted = "";
    var separatedFrontElement;

    for(var i = 0 ; i < fronts.length ; i++){
      for(var j = 0 ; j < 2 ; j++){
        sorted = this.sort(fronts[i], j, population, features, discountValue);
        separatedFrontElement = sorted.split(",");
        population[parseInt(separatedFrontElement[0])].crowdingDistance = String(999999999999.0);
        population[parseInt(separatedFrontElement[separatedFrontElement.length-1])].crowdingDistance = String(999999999999.0);
        for(var k = 1; k < separatedFrontElement.length-1 ; k++){
          population[parseInt(separatedFrontElement[k])].crowdingDistance = String(parseFloat(population[parseInt(separatedFrontElement[k])].crowdingDistance) + ((this.calculateObjectiveForCrowding(population[parseInt(separatedFrontElement[k+1])].releasePlan, j , features, discountValue) - this.calculateObjectiveForCrowding(population[parseInt(separatedFrontElement[k-1])].releasePlan, j , features, discountValue))/(this.getObjectiveValueRange(j))));
        }
      }
    }

    var wrapper = [];
    wrapper.push(population);
    wrapper.push(fronts);
    return wrapper;
  }

  getObjectiveValueRange(j : number){
    if(j == 0){ //For the first objective function
      return 99999999.0;
    }else{ //For the second objective function
      return 5.0;
    }
  }

  sort(frontElement : string, j : number, population : any, features : any, discountValue : number){
    var separatedFrontElement = frontElement.split(",");

    var swapped = true;
    var temp = "";
    while(swapped == true){
      swapped = false;
      for(var i = 1 ; i < separatedFrontElement.length ; i++){
        if(this.calculateObjectiveForCrowding(population[parseInt(separatedFrontElement[i-1])].releasePlan, j , features, discountValue)>this.calculateObjectiveForCrowding(population[parseInt(separatedFrontElement[i])].releasePlan, j , features, discountValue)){
          temp = separatedFrontElement[i-1];
          separatedFrontElement[i-1] = separatedFrontElement[i];
          separatedFrontElement[i] = temp;
          swapped = true;
        }
      }
    }

    var sortedFronts = "";
    for(var i = 0; i < separatedFrontElement.length ; i++){
      if(i == 0){
        sortedFronts = separatedFrontElement[i];
      }else{
        sortedFronts = sortedFronts + "," + separatedFrontElement[i];
      }
    }

    return sortedFronts;

  }

  calculateObjectiveForCrowding(plan : string, a : number, features : any, discountValue : number){
    var result = 0.0;
    if(a == 0){
      result = this.calculateObjective1(plan, features, discountValue);
    }else{
      result = this.calculateObjective2(plan, features);
    }
    return result;
  }


  applyGeneticOperations(population : any){
    var father = 0;
    var mother = 0;
    var children = [];
    var newPopulation = []
    newPopulation = this.initialiseParameters(newPopulation);

    for(var i = 0; i < newPopulation.length/2 ; i++){
      father = this.selection(population);
      mother = this.selection(population);
      children = this.makeCrossover(population[father].releasePlan, population[mother].releasePlan);
      var firstChild = children[0];
      var secondChild = children[1];
      newPopulation[2*i].releasePlan = this.makeMutation(firstChild);
      newPopulation[2*i+1].releasePlan = this.makeMutation(secondChild);
    }

    return newPopulation;
  }

  selection(population : any){
    var parentIndex = parseInt((Math.random() * population.length).toString(), 10);
    var tempParentIndex = 0;
    var tournamentSize = 10;

    for(var i = 0 ; i < 10 ; i++){
      tempParentIndex =  parseInt((Math.random() * population.length).toString(), 10);
      if((parseInt(population[tempParentIndex].rank)<parseInt(population[parentIndex].rank))||((parseInt(population[tempParentIndex].rank)==parseInt(population[parentIndex].rank)) && ((parseFloat(population[tempParentIndex].crowdingDistance))>(parseFloat(population[parentIndex].crowdingDistance))))){
        parentIndex = tempParentIndex;
      }
    }
    return parentIndex;
  }

  makeCrossover(father : string, mother : string){
    var result = [];

    var fatherSet = father.split(",");
    var motherSet = mother.split(",");
    var crossOverLocation = Math.ceil(this.crossoverConfig.crossSectionPosition * fatherSet.length);
    while((crossOverLocation == 0)||(crossOverLocation == (father.length-1))){
      crossOverLocation = Math.ceil(Math.random() * fatherSet.length);
    }

    var firstFatherHalf = fatherSet.slice(0,crossOverLocation);
    var firstChild = fatherSet.slice(0,crossOverLocation);

    var firstMotherHalf = motherSet.slice(0,crossOverLocation);
    var secondChild = motherSet.slice(0,crossOverLocation);

    while(firstChild.length < motherSet.length){
      var pointer = Math.ceil(Math.random()*motherSet.length)-1;
      if(this.contains(firstChild,motherSet[pointer])==false){
        firstChild.push(motherSet[pointer]);
      }
    }

    while(secondChild.length < fatherSet.length){
      var pointer = Math.ceil(Math.random()*fatherSet.length)-1;
      if(this.contains(secondChild,fatherSet[pointer])==false){
        secondChild.push(fatherSet[pointer]);
      }
    }

    result.push(firstChild.toString());
    result.push(secondChild.toString());

    return result;

  }

  contains(target : string[] , key : string){
    var result = false;
    for(var i = 0 ; i < target.length ; i++){
      if(target[i]==key){
        result = true;
      }
    }
    return result;
  }

  makeMutation(solution : string){
    var solutionSet = solution.split(",");
    var probability = this.mutationConfig.probability;
    for(var i = 0 ; i < solutionSet.length ; i++){
      var random = Math.random();
      if(random < probability){

        var target = solutionSet[i];

        var swapIndex = Math.ceil(Math.random()*(solutionSet.length-1));
        while(swapIndex == i){
          swapIndex = Math.ceil(Math.random()*(solutionSet.length-1));
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
