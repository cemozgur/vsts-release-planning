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

/**
* @author Suwichak Fungprasertkul <suwichak@outlook.com>
* @author Cem Ozgur <cem.ozgur@live.com>
* @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
* @version 1.0
* @license MIT License Copyright (c) 2017 OptRel team
* @description Incremental Funding Method for obtaining Optimal Release Plan with Grredy Method
*/

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

  /**
  * @function getOptimalReleasePlan(config: any)
  * @param config : Literal object for Optimal Release Plan configuration
  * @description This is the method to get the optimal release plan sequence by IFM
  */
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
    var maxFeature = -1; //The attribute for indicating the array index of the maximum feature
    var tempNPV = -Number.MAX_VALUE;

    for (var i = 0; i <= this.ReleasePlan.featureList.length - 1; i++) { //For all features in the featureList array
      for (var j = 0; j <= this.ReleasePlan.featureList.length - 1; j++) { //Compare them with each other
        if (this.ReleasePlan.featureList[j].feature.selected == false) { //If the feature is not yet checked(implemented)
          if (this.ReleasePlan.featureList[j].feature.dependency == "0") { //If feature i does not depend on any feature
            tempNPV = this.calculateNPV(j);

            if (tempNPV > maxNPV) { //If the current NPV is greater than the feature with maximum NPV
              maxNPV = tempNPV;
              maxFeature = j + 1;

            //If the NPV's are euqal but the time criticality of them are different; get the one with high time criticality
            } else if ((tempNPV == maxNPV) && (this.ReleasePlan.featureList[j].feature.timeCriticality > this.ReleasePlan.featureList[maxFeature - 1].feature.timeCriticality)) {
              maxNPV = tempNPV;
              maxFeature = j + 1;

            }
          } else { //If the feature i depends on one or more feature(s)
            if (this.checkDependence(j) == true) {
              tempNPV = this.calculateNPV(j);

              if (tempNPV > maxNPV) { //If the current NPV is greater than the feature with maximum NPV
                maxNPV = tempNPV;
                maxFeature = j + 1;

              //If the NPV's are euqal but the time criticality of them are different; get the one with high time criticality
              } else if ((tempNPV == maxNPV) && (this.ReleasePlan.featureList[j].feature.timeCriticality > this.ReleasePlan.featureList[maxFeature - 1].feature.timeCriticality)) {
                maxNPV = tempNPV;
                maxFeature = j + 1;

              }
            }
          }
        }
      }

      ResultReleasePlan.featureList.push(this.ReleasePlan.featureList[maxFeature - 1].feature);

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

    //This conditiion is to check if the input workforce is suitable to finish the features in the desired sprint number
    if (realTeamCapability > ResultReleasePlan.teamCapability) {
      ResultReleasePlan.requiredTeamCapability = realTeamCapability;
      ResultReleasePlan.additionalTeamCapability = realTeamCapability - ResultReleasePlan.teamCapability; //More team capability is needed for building it on time
    } else {
      ResultReleasePlan.requiredTeamCapability = ResultReleasePlan.teamCapability; //The teamCapability is the required team capability
    }
    Util.sprintAssignation(ResultReleasePlan);

    Util.getNetPresentValueReleasePlan(ResultReleasePlan);

    return ResultReleasePlan;
  }

  /**
  * @function getTotalRequiredEffort
  * @description This function returns the total required effort to build all of the features
  */
  getTotalRequiredEffort() {
    var i;
    var totalEffort = 0;
    for (i = 0; i < this.ReleasePlan.featureList.length; i++) { //For all features in the featureList array
      totalEffort = totalEffort + this.ReleasePlan.featureList[i].feature.effort;
    }
    this.ReleasePlan.totalRequiredEffort = totalEffort;
  }

  /**
  * @function calculateCumulatedDiscountValue
  * @description This function returns the cumulated discount value in order to convert the number to the suitable percentage in terms of weekly/monthly or etc.
  */
  calculateCumulatedDiscountValue() {
    this.ReleasePlan.cumulatedDiscountValue = (Math.pow(((this.ReleasePlan.discountValue / 100.00) + 1.0), (this.ReleasePlan.sprintDuration / 52.0)) - 1.0) * 100.0;
  }

  /**
  * @function calculateNumberOfRequiredSprint
  * @description This is for calculating total number of sprints needed.
  */
  calculateNumberOfRequiredSprint() {
    return Math.ceil(this.ReleasePlan.totalRequiredEffort / (this.ReleasePlan.sprintDuration * this.ReleasePlan.teamCapability));
  }

  /**
  * @function calculateNPV
  * @description This function returns the NPV of a feature for a given starting sprint number (Since it is a greedy search; only 1 feature is considered)
  */
  calculateNPV(index: number) {
    var npv = 0;
    var e = 0.0; //The variable for using in the decrementation calculation
    var i;
    for (i = 0; i < this.ReleasePlan.featureList.length; i++) {
      e = i;
      npv += this.ReleasePlan.featureList[index].feature.businessValue / Math.pow((1.0 + (this.ReleasePlan.cumulatedDiscountValue / 100.0)), e);
    }
    return npv - this.ReleasePlan.featureList[index].feature.cost; //NPV is calculated by substracting the cost
  }

  /**
  * @function checkDependence
  * @description This function returns true if the input feature does NOT depend on any features
  */
  checkDependence(index: number) {
    var dependency = this.ReleasePlan.featureList[index].feature.dependency;
    var dependencies = dependency.split(",");

    var answer = true;
    for (var i = 0; i <= dependencies.length - 1; i++) {
      if (this.ReleasePlan.featureList[(dependencies[i]) - 1].feature.selected == false) {
        answer = false; //If the function depends on any feature, change the answer to false
      }
    }
    return answer;
  }
}

export default IFMReleasePlanningAlgorithm;
