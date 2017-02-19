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
        var fatherString = ["1,5,6,9,8,4,6,3"];
        var motherString = ["4,5,6,8,7,8,9,3"];
        var children = this.makeCrossover(fatherString,motherString);
        console.log(children[0]);
        console.log(this.makeMutation(children[0]));

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

    makeCrossover(father : any, mother : any){
      this.bitBlockSize = Math.max(this.getBitBlockSize(father),this.getBitBlockSize(mother));
      var decodedFather = this.decode(father);
      var decodedMother = this.decode(mother);

      var result = [];
      var crossSectionPosition = 0;

      if((this.crossoverConfig.testing.enable == true)&&(this.crossoverConfig.testing.randomCrossSection == true)){
        crossSectionPosition = Math.ceil(Math.random()*(this.bitBlockSize*this.featureGenerationSize));
        if(crossSectionPosition < this.bitBlockSize){
          crossSectionPosition = crossSectionPosition + this.bitBlockSize;
        }

      }else{
        crossSectionPosition = Math.ceil(this.crossoverConfig.testing.crossSectionPosition*this.bitBlockSize);
      }

      if(crossSectionPosition % this.bitBlockSize != 0){
        crossSectionPosition = Math.abs((crossSectionPosition % this.bitBlockSize) - crossSectionPosition);
      }

      var firstChild = "";
      var secondChild = "";
      var temp = decodedFather;
      firstChild = temp.substring(0,crossSectionPosition);
      secondChild = temp.substring(crossSectionPosition,temp.length);
      /*console.log("First Half");
      console.log(temp);
      console.log(firstChild);
      console.log(secondChild);*/

      var temp = decodedMother;
      firstChild = firstChild + temp.substring(crossSectionPosition,temp.length);
      secondChild = temp.substring(0,crossSectionPosition) + secondChild;
      /*console.log("Other Half");
      console.log(temp);
      console.log(firstChild);
      console.log(secondChild);*/
      result.push(firstChild);
      result.push(secondChild);

      //console.log(result)
      return result;
    }

    getBitBlockSize(solution : any){
      return parseInt(this.getMaxNumber(solution));
    }

    //Util Method
    decToBin(number : number){
      var result = parseInt(number.toString(),10).toString(2);
      //console.log("Dec to Bin: "+result+" ("+number+")");
      return result;
    }

    //Util Method
    binToDec(number : number){
      var result = parseInt(number.toString(),2).toString(10);
      //console.log("Dec to Bin: "+result+" ("+number+")");
      return result;
    }

    getMaxNumber(solution : any){
      var temp = solution.toString().split(",");
      for(var i = 0 ; i < temp.length; i++){
        if(temp < parseInt(temp[i])){
          temp = temp[i];
        }
      }
      return temp;
    }

    //Util Method
    preprend(target : string, repeatingString : string, time : number){
      var result = "";
      var temp = new Array(time+1).join(repeatingString);
      result =  temp + target;
      return result;
    }

    decode(solution : any){
      var seperatedSolution = solution.toString().split(",");
      var result = "";
      for(var i = 0 ; i < seperatedSolution.length; i++){
        var temp = this.decToBin(seperatedSolution[i]);
        if(temp.toString().length < this.bitBlockSize){
          result = result + this.preprend(temp.toString(), "0" ,this.bitBlockSize - temp.toString().length);
        }else{
          result = result + temp;
        }
      }
      //console.log(":"+result);
      return result;
    }

    private makeMutation(solution : any){
      var result = [];
      var mutated = false;

        var temp = solution;
        for(var j = 0 ; j < temp.length ; j++){
          var random = Math.random();
          if(random <= this.mutationConfig.probability){
              mutated = true;
              temp = this.flipBit(temp,j);
          }
        }
        result.push(temp);

      if(mutated == true){
      //console.log(result);
      //console.log("Mutated ");
      }
      return result;
    }

    //Util Method
    flipBit(target : string, index : number) {
      var result;
      if(target.charAt(index)=="1"){
        result = target.substr(0, index) + "0" + target.substr(index+1,target.length);
      }else{
        result = target.substr(0, index) + "1" + target.substr(index+1,target.length);
      }
      return result;
    }

    encodeSolution(solution : any){
      //console.log(this.bitBlockSize);
      var result = [];
      for(var i = 0 ; i < solution.length ; i++){
        var temp = [];
        var lowerIndex = 0;
        for(var j = 0 ; j <= solution[i].length ; j++){
          if(j % this.bitBlockSize == 0){
            if(j != 0){
              /*console.log(lowerIndex+"-"+j);
              console.log(solution[i].slice(lowerIndex, j));*/
              temp.push(this.binToDec(solution[i].slice(lowerIndex, j)));
              lowerIndex = j;
            }
          }
        }
        result.push(temp.toString());
      }
      //console.log(result);
      return result;
    }

}

export default NSGA2ReleasePlanningAlgorithm;
