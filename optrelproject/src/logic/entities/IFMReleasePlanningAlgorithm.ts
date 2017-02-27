import { injectable, inject } from "inversify";
import "reflect-metadata";
import IReleasePlanningAlgorithm from "../interfaces/IReleasePlanningAlgorithm";

import { WorkItem } from 'TFS/WorkItemTracking/Contracts';


import * as Q from 'q';



@injectable()
class IFMReleasePlanningAlgorithm implements IReleasePlanningAlgorithm {

  private ReleasePlan = {
    discountValue: 0,
    cumulatedDiscountValue: 0, featureList: [],
    teamCapability: 0, totalRequiredEffort: 0,
    numberOfSprint: 0, sprintDuration: 0
  };


  private getRandomValue(info: any): string {
    let order = Math.floor(Math.random() * 3) + 1;
    if (order == 1) {
      return info.Min;
    } else if (order == 2) {
      return info.Expected
    } else {
      return info.Max;
    }
  }

  private isValidReleaseInput(infoObject: Object): boolean {
    if(!infoObject){
      return false;
    }
    return infoObject.hasOwnProperty("Min")&&infoObject.hasOwnProperty("Expected")&&infoObject.hasOwnProperty("Max");
  }
  getFeatureData(featuresVSTS: WorkItem[], featuresDeailtDocument: any): boolean {
    let featuresReleasePlan = [];
    let success = true;

    featuresVSTS.map(el => {
      let feature: any = {
        id: el.id,
        feature: el.fields["System.Title"],
        state: el.fields["System.State"],
        order: "1",
        selected: false
      }

      let detailInfo = featuresDeailtDocument.filter(el => {
        return (el.id == feature.id);
      });

      if (detailInfo.length > 0) {
        this.isValidReleaseInput(detailInfo[0].BusinessValue) ? feature.bussinesValue = this.getRandomValue(detailInfo[0].BusinessValue) : success = false;
        this.isValidReleaseInput(detailInfo[0].Effort) ? feature.effort = this.getRandomValue(detailInfo[0].Effort) : success = false;
        this.isValidReleaseInput(detailInfo[0].Cost) ? feature.cost = this.getRandomValue(detailInfo[0].Cost) : success = false;
        this.isValidReleaseInput(detailInfo[0].Risk) ? feature.risk = this.getRandomValue(detailInfo[0].Risk) : success = false;
        this.isValidReleaseInput(detailInfo[0].timeCriticality) ? feature.timeCriticality = this.getRandomValue(detailInfo[0].timeCriticality) : success = false;

        detailInfo[0].Dependency ? feature.dependency = detailInfo[0].Dependency : feature.dependency = "0";

      } else {
        success = false;
      }
      featuresReleasePlan.push(feature);
    });

    console.log("VSTS features with detail");
    console.log(featuresReleasePlan);
    //this.ReleasePlan.featureList = featuresReleasePlan;
    return success;
    //return true;
  }

  getReleasePlanType(): string {
    return "IFM Algortihm";
  }

  testDataGeneration(config: any) {
    this.ReleasePlan.discountValue = config.discountValue;
    this.ReleasePlan.teamCapability = config.teamCapability;
    this.ReleasePlan.totalRequiredEffort = config.totalRequiredEffort;
    this.ReleasePlan.numberOfSprint = config.numberOfSprint;
    this.ReleasePlan.sprintDuration = config.sprintDuration;

    //cover
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
      }
      this.ReleasePlan.featureList.push({ feature });
    }

    this.ReleasePlan.featureList[1].feature.dependency = "1";
    this.ReleasePlan.featureList[4].feature.dependency = "2,3";

  }

  getOptimalReleasePlan(config: any): any {
    let ResultReleasePlan = {
      discountValue: 0, cumulatedDiscountValue: 0,
      featureList: [], teamCapability: 0, totalRequiredEffort: 0,
      numberOfSprint: 0, sprintDuration: 0
    };//this is only if we dont require the value again.


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
              //console.log("maxFeature is: " + (maxFeature-1));
            } else if ((tempNPV == maxNPV) && (this.ReleasePlan.featureList[j].feature.timeCriticality > this.ReleasePlan.featureList[maxFeature - 1].feature.timeCriticality)) {
              maxNPV = tempNPV;
              maxFeature = j + 1;
              //console.log("maxFeature is: " + (maxFeature-1));
            }
          } else {
            if (this.checkDependence(j) == true) {
              tempNPV = this.calculateNPV(j);
              //console.log("tempNPV is : " + tempNPV);
              if (tempNPV > maxNPV) {
                maxNPV = tempNPV;
                maxFeature = j + 1;
                //console.log("maxFeature is: " + (maxFeature-1));
              } else if ((tempNPV == maxNPV) && (this.ReleasePlan.featureList[j].feature.timeCriticality > this.ReleasePlan.featureList[maxFeature - 1].feature.timeCriticality)) {
                maxNPV = tempNPV;
                maxFeature = j + 1;
                //console.log("maxFeature is: " + (maxFeature-1));
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

    return ResultReleasePlan;
  }

  private getTotalRequiredEffort() {
    var i;
    var totalEffort = 0;
    for (i = 0; i < this.ReleasePlan.featureList.length; i++) {
      totalEffort = totalEffort + this.ReleasePlan.featureList[i].feature.effort;
    }
    this.ReleasePlan.totalRequiredEffort = totalEffort;
  }

  private calculateCumulatedDiscountValue() {
    this.ReleasePlan.cumulatedDiscountValue = (Math.pow(((this.ReleasePlan.discountValue / 100.00) + 1.0), (this.ReleasePlan.sprintDuration / 52.0)) - 1.0) * 100.0;
  }

  //This is for calculating total number of sprints needed.
  private calculateNumberOfRequiredSprint() {
    Math.ceil(this.ReleasePlan.totalRequiredEffort / (this.ReleasePlan.sprintDuration * this.ReleasePlan.teamCapability));
  }

  private calculateNPV(index: number) {
    var npv = 0;
    var e = 0.0;
    var i;
    for (i = 0; i < this.ReleasePlan.featureList.length; i++) {
      e = i;
      npv += this.ReleasePlan.featureList[index].feature.bussinesValue / Math.pow((1.0 + (this.ReleasePlan.cumulatedDiscountValue / 100.0)), e);
    }
    return npv - this.ReleasePlan.featureList[index].feature.cost;
  }

  private checkDependence(index: number) {
    var dependency = this.ReleasePlan.featureList[index].feature.dependency;
    var dependencies = dependency.split(",");

    var answer = true;
    for (var i = 0; i <= dependencies.length - 1; i++) {
      if (this.ReleasePlan.featureList[(dependencies[i]) - 1].feature.selected == false) {
        answer = false;
      }
    }
    return answer;
  }

}

export default IFMReleasePlanningAlgorithm;
