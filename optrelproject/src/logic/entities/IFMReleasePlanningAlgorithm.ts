import { injectable, inject } from "inversify";
import "reflect-metadata";
import IReleasePlanningAlgorithm from "../interfaces/IReleasePlanningAlgorithm";
import { IValidationMessage } from "../../model/IValidationMessage";
import { Util } from "./Util";
import { WorkItem } from 'TFS/WorkItemTracking/Contracts';
import ALGORITHM_TYPE from "../constants/algorithmType";
import MonteCarloSimulation from "./MonteCarloSimulation";


const monteCarloConfig = {
  populationSize: 10000,
  debug: false
};

@injectable()
class IFMReleasePlanningAlgorithm implements IReleasePlanningAlgorithm {

  ReleasePlan = {
    discountValue: 0,
    cumulatedDiscountValue: 0, featureList: [],
    teamCapability: 0, totalRequiredEffort: 0,
    numberOfSprint: 0, sprintDuration: 0
  };

  getFeatureData(featuresVSTS: WorkItem[], featuresDeailtDocument: any): boolean {
    let featuresReleasePlan = [];
    let success = true;

    featuresVSTS.map((el, index) => {
      let feature: any = {
        id: (index + 1),
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

        detailInfo[0].Dependency ? feature.dependency = detailInfo[0].Dependency : feature.dependency = "0";
        detailInfo[0].Dependency ? feature.dependencyWorkItemId = detailInfo[0].Dependency : feature.dependencyWorkItemId = "0";

      } else {
        success = false;
      }
      featuresReleasePlan.push({ feature });
    });


    if (success) {
      featuresReleasePlan.map(el => {

        if (el.feature.dependencyWorkItemId != "0") {
          let dependencies = el.feature.dependencyWorkItemId.split(",");
          let indexDependency = [];

          dependencies.map(workItemIdCheck => {
            let result = featuresReleasePlan.filter(el => {
              return (el.feature.workItemId == workItemIdCheck)
            });
            if (result.length > 0) {
              indexDependency.push(result[0].feature.id);
            }
          });

          el.feature.dependency = indexDependency.join(",");
        } else {
          el.feature.dependencyWorkItemId = "";
        }
      });

      this.ReleasePlan.featureList = featuresReleasePlan;
    }
    return success;

  }

  getReleasePlanType(): string {
    return "IFM Algortihm";
  }


  validateConfigAlgorithm(config: any): IValidationMessage {
    if (!config) return {
      success: false,
      error: "Please fill in all the fields on the above section."
    };


    var patt = new RegExp("^[1-9][0-9]*$");

    if (!(config.numberOfSprint && patt.test(config.numberOfSprint))) {
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
        error: "Please, fill in a correct Discount value. It must be greater than 0 and conform minimum <= expected <= maximum."
      }
    }
    return { success: true };
  }

  getOptimalReleasePlan(config: any): any {

    this.ReleasePlan.discountValue = parseInt((new MonteCarloSimulation(monteCarloConfig, { name: "triangular", value: { lowerBound: Number(config.discountValue.Min), mode: Number(config.discountValue.Expected), upperBound: Number(config.discountValue.Max) } }).getExpectedValue()).toString(), 10);
    this.ReleasePlan.teamCapability = parseInt((new MonteCarloSimulation(monteCarloConfig, { name: "triangular", value: { lowerBound: Number(config.teamCapability.Min), mode: Number(config.teamCapability.Expected), upperBound: Number(config.teamCapability.Max) } }).getExpectedValue()).toString(), 10);
    this.ReleasePlan.numberOfSprint = Number(config.numberOfSprint);
    this.ReleasePlan.sprintDuration = Number(config.sprintDuration);

    let totalEffort = 0;
    this.ReleasePlan.featureList.map(el => {
      totalEffort += el.feature.effort;
    });

    this.ReleasePlan.totalRequiredEffort = totalEffort;

    let ResultReleasePlan = {
      discountValue: 0, cumulatedDiscountValue: 0,
      featureList: [], teamCapability: 0, requiredTeamCapability: 0, totalRequiredEffort: 0,
      numberOfSprint: 0, sprintDuration: 0,
      additionalTeamCapability: 0,
      algorithmType: ALGORITHM_TYPE.IFM,
      finalNPV: 0.0
    };

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

    //calculate the real team Capability
    let realTeamCapability = ResultReleasePlan.totalRequiredEffort / ResultReleasePlan.numberOfSprint;

    if (realTeamCapability > ResultReleasePlan.teamCapability) {
      ResultReleasePlan.requiredTeamCapability = realTeamCapability;
      ResultReleasePlan.additionalTeamCapability = realTeamCapability - ResultReleasePlan.teamCapability;
    } else {
      ResultReleasePlan.requiredTeamCapability = ResultReleasePlan.teamCapability;
    }
    Util.sprintAssignation(ResultReleasePlan);

    Util.getNetPresentValueReleasePlan(ResultReleasePlan);

    return ResultReleasePlan;
  }

  getTotalRequiredEffort() {
    var i;
    var totalEffort = 0;
    for (i = 0; i < this.ReleasePlan.featureList.length; i++) {
      totalEffort = totalEffort + this.ReleasePlan.featureList[i].feature.effort;
    }
    this.ReleasePlan.totalRequiredEffort = totalEffort;
  }

  calculateCumulatedDiscountValue() {
    this.ReleasePlan.cumulatedDiscountValue = (Math.pow(((this.ReleasePlan.discountValue / 100.00) + 1.0), (this.ReleasePlan.sprintDuration / 52.0)) - 1.0) * 100.0;
  }

  //This is for calculating total number of sprints needed.
  calculateNumberOfRequiredSprint() {
    return Math.ceil(this.ReleasePlan.totalRequiredEffort / (this.ReleasePlan.sprintDuration * this.ReleasePlan.teamCapability));
  }

  calculateNPV(index: number) {
    var npv = 0;
    var e = 0.0;
    var i;
    for (i = 0; i < this.ReleasePlan.featureList.length; i++) {
      e = i;
      npv += this.ReleasePlan.featureList[index].feature.businessValue / Math.pow((1.0 + (this.ReleasePlan.cumulatedDiscountValue / 100.0)), e);
    }
    return npv - this.ReleasePlan.featureList[index].feature.cost;
  }

  checkDependence(index: number) {
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
