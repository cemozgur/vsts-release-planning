import { injectable, inject } from "inversify";
import "reflect-metadata";
import IReleasePlanningAlgorithm from "../interfaces/IReleasePlanningAlgorithm";
import { ReleasePlan } from "../../model/ReleasePlan";

@injectable()
class NSGA2ReleasePlanningAlgorithm implements IReleasePlanningAlgorithm {
    //Unused As of Now
    private TeamCapability: number[];

    private populationSize;
    private generationNumber;
    private bitBlockSize = 0 ;
    private featureGenerationSize = 0;

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
      this.featureGenerationSize = algorithmConfig.testing.number_of_feature;
      this.crossoverConfig = crossoverConfig;
      this.mutationConfig = mutationConfig;

      if(algorithmConfig.testing.enable == true){
        var featuresList = new Array<String>();

        var fronts = [];
        var population = [];

        population = this.resetParameters(population);
        population = this.initialisePopulation(featuresList, population);

        var obj = [];
        obj = this.updateParameters(population, fronts);
        population = obj[0];
        fronts = obj[1];

        for(var i = 0 ; i < this.generationNumber ; i++){
          population = this.resetParameters(population);
          obj = this.updateParameters(population, fronts);
          population = obj[0];
          fronts = obj[1];
        }

        //Mutation Part
        var fatherString = "1,2,3,5,4";
        var motherString = "2,5,4,1,3";
        var children = this.makeCrossover(fatherString,motherString);
        console.log(children[0]);
        console.log(children[1]);
        var mutatedChild = this.makeMutation(children[0]);
        var mutatedChildII = this.makeMutation(children[1]);
        console.log(mutatedChild);
        console.log(mutatedChildII);

      }
    }



    resetParameters(population : any){
      for(var i = 0; i < population.length ; i++){
        population[i].repleasePlan = "";
        population[i].setS = "";
        population[i].n = "";
        population[i].crowdingDistance = "";
        population[i].rank = "";
      }
      return population;
    }

    initialisePopulation(features : any, population){
      var usedFeatures = "";
      var temp = "";
      for(var i=0 ; i < this.populationSize ; i++){
        for(var j = 0 ; j < features.length ; j++){
          temp = this.generateRandomFeature(usedFeatures,j,features);
          if(j==0){
            usedFeatures = temp;
          }else{
            usedFeatures = usedFeatures + "," + temp;
          }
        }
        population[i].repleasePlan = usedFeatures;
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

    var temps = options.split("[,]");
    return temps[rand];

  }

  checkDependency(featureNumber : string, usedFeatures : string, features : any){
    if(this.checkIfUsed(featureNumber, usedFeatures) == false){
      if(this.checkIfDepends(featureNumber, usedFeatures) == false){
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
    var usedFeaturesSeparated = usedFeatures.split("[,]");

    for(var i = 0 ; i < usedFeaturesSeparated.length ; i++){
      if(featureNumber === usedFeaturesSeparated[i]){
        return true;
      }
    }
    return false;
  }

  checkIfDepends(featureNumber : string, features : any){
    if(features[parseInt(featureNumber)-1].dependsOn === ""){
      return false;
    }
    return true;
  }

  checkIfDependsOnUsed(featureNumber : string, usedFeatures : string, features : any){
    var usedFeaturesSeparated = usedFeatures.split("[,]");
    var dependentFeaturesSeparated = features[parseInt(featureNumber)-1].dependsOn.split("[,]");

    var answer = false;

    for(var i=0 ; i < dependentFeaturesSeparated.length ; i++){
      for(var j=0 ; j < usedFeaturesSeparated.length ; j++){
        if(dependentFeaturesSeparated[i].equals(usedFeaturesSeparated[j]) == true){
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

  updateParameters(population, fronts){
    for(var i=0; i<population.length ; i++){
      for(var j=0; j<population.length ; j++){
        if(i == j){
          continue;
        }

        if(this.checkIfFirstDominatesSecond(population[i].repleasePlan, population[j].repleasePlan) == true){
          if(population[i].setS === ""){
            population[i].setS == "" + j;
          }else{
            population[i].setS = population[i].setS + "," + j;
          }
        }else if(this.checkIfFirstDominatesSecond(population[j].repleasePlan, population[i].repleasePlan) == true){
          population[i].n = parseInt(population[i].n+1).toString();
        }
      }
    }

    var wrapper = [];
    wrapper = this.updateFronts(population , fronts);
    wrapper = this.calculateCrowdingDistances(wrapper[0], wrapper[1]);
    //GENETIC OPERATIONS HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    wrapper[0] = this.updatePopulation(wrapper[0],wrapper[1]);
    return wrapper;
  }

  checkIfFirstDominatesSecond(plan1 : string, plan2 : string){
    if((this.calculateObjective1(plan1)==this.calculateObjective1(plan2)) && (this.calculateObjective2(plan1)>this.calculateObjective2(plan2)) ||
      (this.calculateObjective1(plan1)>this.calculateObjective1(plan2)) && (this.calculateObjective2(plan1)==this.calculateObjective2(plan2)) ||
      (this.calculateObjective1(plan1)>this.calculateObjective1(plan2)) && (this.calculateObjective2(plan1)>this.calculateObjective2(plan2))){
      return true;
    }
    return false;
  }

  calculateObjective1(plan : string){
    return 0.0;
  }

  calculateObjective2(plan : string){
    return 0.0;
  }

  updateFronts(population : any, fronts : any){
    for(var i=0 ; i < population.length ; i++){
      if(population[i].n === "0"){
        if(fronts[0] === ""){
          fronts[0] = "" + i;
        }else {
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

    while(proceed != 0){
      separatedPopulationIndex = fronts[frontCounter].split("[,]");
      for(var i = 0 ; i < separatedPopulationIndex ; i ++){
        eachQ = population[separatedPopulationIndex[i]].setS.split("[,]");
        for(var j = 0; j < eachQ.length ; j++){
          population[eachQ[j]].n = (parseInt((population[eachQ[j]].n))-1).toString();
          if(population[eachQ[j]].n === "0"){
            population[eachQ[j]].rank = (parseInt((population[eachQ[j]].rank))+1).toString();

            if(tempSetQ===""){
              tempSetQ = "" + eachQ[j];
            }else{
              tempSetQ = tempSetQ + "" + eachQ[j];
            }

          }
        }
      }
      fronts.push(tempSetQ);

      frontCounter++;
      if(fronts[fronts.length()-1] === ""){
        proceed = 0;
      }
    }

    var wrapper = [];
    wrapper.push(population);
    wrapper.push(fronts);
    return wrapper;

  }

  updatePopulation(population : any, fronts : any){
    var tempPopulation = population;
    var populationLeft = population.length;
    var i = 0;
    var separatedReleasePlans;

    while(populationLeft>0){
      separatedReleasePlans = fronts[i].split("[,]");
      if(separatedReleasePlans.length >= populationLeft){
        for(var j = 0 ; j < separatedReleasePlans.length ; j++){
          population[i].repleasePlan = tempPopulation[parseInt(separatedReleasePlans[j])].repleasePlan;
          i++;
          populationLeft--;
        }
      }else{
        for(var j = 0 ; j < populationLeft ; j++){
          population[i].repleasePlan = tempPopulation[parseInt(separatedReleasePlans[j])].repleasePlan;
          i++;
          populationLeft--;
        }

      }
    }
    return population;
  }

  calculateCrowdingDistances(population : any, fronts : any){
    var wrapper = [];
    wrapper.push(population);
    wrapper.push(fronts);
    return wrapper;
  }

  makeCrossover(father : string, mother : string){

    var result = [];

    var fatherSet = father.split(",");
    var motherSet = mother.split(",");
    var crossOverLocation = Math.ceil(this.crossoverConfig.testing.crossSectionPosition * fatherSet.length);
    while((crossOverLocation == 0)||(crossOverLocation == 5)){
      crossOverLocation = Math.ceil(Math.random() * fatherSet.length);
    }

    //console.log(crossOverLocation);

    var firstFatherHalf = fatherSet.slice(0,crossOverLocation);
    var firstChild = fatherSet.slice(0,crossOverLocation);
    var firstMotherHalf = motherSet.slice(0,crossOverLocation);
    var secondChild = motherSet.slice(0,crossOverLocation);

    while(firstChild.length < motherSet.length){
      var pointer = Math.ceil(Math.random()*motherSet.length)-1;
      //console.log("pointer"+pointer+":"+motherSet[pointer]);
      if(this.contains(firstChild,motherSet[pointer])==false){
        firstChild.push(motherSet[pointer]);
      }
    }

    while(secondChild.length < fatherSet.length){
      var pointer = Math.ceil(Math.random()*fatherSet.length)-1;
      //console.log("pointer"+pointer+":"+fatherSet[pointer]);
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
      if(target[i]===key){
        //console.log(target[i]+""+key);
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
        console.log("Mutated: "+target+":"+i+"<>"+swapTarget+":"+swapIndex);
        solutionSet[i] = swapTarget;
        solutionSet[swapIndex] = target;

      }
    }
    return solutionSet.toString();
  }

}

export default NSGA2ReleasePlanningAlgorithm;
