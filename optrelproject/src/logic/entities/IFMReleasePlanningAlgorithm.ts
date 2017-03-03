import { injectable, inject } from "inversify";
import "reflect-metadata";
import IReleasePlanningAlgorithm from "../interfaces/IReleasePlanningAlgorithm";
import {ReleasePlan} from "../../model/ReleasePlan";

@injectable()
class IFMReleasePlanningAlgorithm{
  private ReleasePlan = {discountValue: 0, cumulatedDiscountValue: 0,featureList: [],teamCapability: 0,totalRequiredEffort : 0,numberOfSprint: 0, sprintDuration: 0};
  private ResultReleasePlan = {discountValue: 0, cumulatedDiscountValue: 0,featureList: [],teamCapability: 0,totalRequiredEffort : 0,numberOfSprint: 0, sprintDuration: 0};
  private RequiredSprint = 0;

  testDataGeneration(config : any){
    this.ReleasePlan.discountValue = config.discountValue;
    this.ReleasePlan.teamCapability = config.teamCapability;
    this.ReleasePlan.totalRequiredEffort = config.totalRequiredEffort;
    this.ReleasePlan.numberOfSprint = config.numberOfSprint;
    this.ReleasePlan.sprintDuration = config.sprintDuration;

    for( var i = 0 ; i <= config.featureNumber-1 ; i++){
      var feature = {
        id : i+1,
        bussinesValue : Math.random()*100 + 1,
        effort : Math.random()*50 + 1,
        timeCriticality : Math.random()*5 + 1,
        cost : Math.random()*50 + 1,
        selected : false,
        dependency : "0"
      }
      this.ReleasePlan.featureList.push({feature});
    }

    this.ReleasePlan.featureList[1].feature.dependency = "1";
    this.ReleasePlan.featureList[4].feature.dependency = "2,3";

    //console.log(this.ReleasePlan.featureList);

  }

  /*testDataGeneration(featureNumber: number, discountValue : number, teamCapability : number, totalRequiredEffort : number, numberOfSprint: number, sprintDuration: number){
    this.ReleasePlan.discountValue = discountValue;
    this.ReleasePlan.teamCapability = teamCapability;
    this.ReleasePlan.totalRequiredEffort = totalRequiredEffort;
    this.ReleasePlan.numberOfSprint = numberOfSprint;
    this.ReleasePlan.sprintDuration = sprintDuration;

    for( var i = 0 ; i <= featureNumber-1 ; i++){
      var feature = {
        id : i+1,
        bussinesValue : Math.random()*100 + 1,
        effort : Math.random()*50 + 1,
        timeCriticality : Math.random()*5 + 1,
        cost : Math.random()*50 + 1,
        selected : false,
        dependency : "0"
      }
      this.ReleasePlan.featureList.push({feature});
    }

    this.ReleasePlan.featureList[1].feature.dependency = "1";
    this.ReleasePlan.featureList[4].feature.dependency = "2,3";

    //console.log(this.ReleasePlan.featureList);
    return this.getOptimalReleasePlan();

  }*/

  getOptimalReleasePlan(){

    this.getTotalRequiredEffort();
    this.calculateCumulatedDiscountValue();
    this.RequiredSprint = this.calculateNumberOfRequiredSprint();

    var maxNPV = -Number.MAX_VALUE;
    var maxFeature = -1;
    var tempNPV = -Number.MAX_VALUE;

    for(var i = 0 ; i <= this.ReleasePlan.featureList.length-1 ; i++){
      for(var j = 0 ; j <= this.ReleasePlan.featureList.length-1 ; j++){
          if(this.ReleasePlan.featureList[j].feature.selected == false){
            if(this.ReleasePlan.featureList[j].feature.dependency == "0"){
                tempNPV = this.calculateNPV(j);
                //console.log("tempNPV is : " + tempNPV);
                if(tempNPV>maxNPV){
                  maxNPV = tempNPV;
    							maxFeature = j+1;
    							//console.log("maxFeature is: " + (maxFeature-1));
                }else if( (tempNPV==maxNPV) && (this.ReleasePlan.featureList[j].feature.timeCriticality > this.ReleasePlan.featureList[maxFeature-1].feature.timeCriticality) ){
    							maxNPV = tempNPV;
    							maxFeature = j+1;
    							//console.log("maxFeature is: " + (maxFeature-1));
    						}
            }else{
              if(this.checkDependence(j) == true){
                tempNPV = this.calculateNPV(j);
                //console.log("tempNPV is : " + tempNPV);
                if(tempNPV>maxNPV){
                  maxNPV = tempNPV;
                  maxFeature = j+1;
                  //console.log("maxFeature is: " + (maxFeature-1));
                }else if( (tempNPV==maxNPV) && (this.ReleasePlan.featureList[j].feature.timeCriticality > this.ReleasePlan.featureList[maxFeature-1].feature.timeCriticality) ){
                  maxNPV = tempNPV;
                  maxFeature = j+1;
                  //console.log("maxFeature is: " + (maxFeature-1));
                }
              }
            }
          }
      }

      this.ResultReleasePlan.featureList.push(this.ReleasePlan.featureList[maxFeature-1].feature);
      //console.log("Feature added to the releasePlan!!!");
      this.ReleasePlan.featureList[maxFeature-1].feature.selected = true;

      maxFeature = -1;
      maxNPV = -Number.MAX_VALUE;
      tempNPV = -Number.MAX_VALUE;
    }
    this.ResultReleasePlan.discountValue = this.ReleasePlan.discountValue;
    this.ResultReleasePlan.cumulatedDiscountValue = this.ReleasePlan.cumulatedDiscountValue;
    this.ResultReleasePlan.teamCapability = this.ReleasePlan.teamCapability;
    this.ResultReleasePlan.totalRequiredEffort = this.ReleasePlan.totalRequiredEffort;
    this.ResultReleasePlan.numberOfSprint = this.ReleasePlan.numberOfSprint;
    this.ResultReleasePlan.sprintDuration = this.ReleasePlan.sprintDuration;
    return this.ResultReleasePlan;
  }

  private getTotalRequiredEffort(){
    var i;
    var totalEffort = 0;
    for( i = 0 ; i < this.ReleasePlan.featureList.length ; i++){
      totalEffort = totalEffort + this.ReleasePlan.featureList[i].feature.effort;
    }
    this.ReleasePlan.totalRequiredEffort = totalEffort;
  }

  private calculateCumulatedDiscountValue(){
    this.ReleasePlan.cumulatedDiscountValue = (Math.pow(((this.ReleasePlan.discountValue/100.00) + 1.0), (this.ReleasePlan.sprintDuration/52.0)) - 1.0)*100.0;
  }

  //This is for calculating total number of sprints needed.
  private calculateNumberOfRequiredSprint(){
    return Math.ceil(this.ReleasePlan.totalRequiredEffort/(this.ReleasePlan.sprintDuration * this.ReleasePlan.teamCapability));
  }

  private calculateNPV(index: number){
    var npv = 0;
    var e = 0.0;
    var i;
    for( i = 1 ; i <= this.RequiredSprint ; i++ ){
      e = i;
      npv += this.ReleasePlan.featureList[index].feature.bussinesValue/Math.pow((1.0+(this.ReleasePlan.cumulatedDiscountValue/100.0)), e);
    }
    return npv - this.ReleasePlan.featureList[index].feature.cost;
  }

  private checkDependence(index: number){
    var dependency = this.ReleasePlan.featureList[index].feature.dependency;
    var dependencies  = dependency.split(",");

    var answer = true;
    for(var i = 0 ; i <= dependencies.length-1 ; i++){
      if(this.ReleasePlan.featureList[(dependencies[i])-1].feature.selected == false){
        answer = false;
      }
    }
    return answer;
  }
}

/*var test = new IFMReleasePlanningAlgorithm();
let config = {
  featureNumber  : 5,
  discountValue  : 50,
  teamCapability  : 100,
  totalRequiredEffort  : 100,
  numberOfSprint : 55,
  sprintDuration : 2
};
test.testDataGeneration(config);
console.log(test.getOptimalReleasePlan());*/


export default IFMReleasePlanningAlgorithm;
