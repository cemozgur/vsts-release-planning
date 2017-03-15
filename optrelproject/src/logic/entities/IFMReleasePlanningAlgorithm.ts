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

  private ReleasePlan = {
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

        Util.isValidReleaseTriangularInput(detailInfo[0].BusinessValue) ? feature.bussinesValue = parseInt((new MonteCarloSimulation(monteCarloConfig, { name: "triangular", value: { lowerBound: Number(detailInfo[0].BusinessValue.Min), mode: Number(detailInfo[0].BusinessValue.Expected), upperBound: Number(detailInfo[0].BusinessValue.Max) } }).getExpectedValue()).toString(), 10) : success = false;
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
      error: "Please fill all the fields on the above section."
    };

    if (!(config.numberOfSprint && Util.isNumber(config.numberOfSprint))) {
      return {
        success: false,
        error: "Please, fill a correct Number of Sprint."
      }
    }
    if (!(config.sprintDuration && Util.isNumber(config.sprintDuration))) {
      return {
        success: false,
        error: "Please, fill a correct Sprint Duration."
      }
    }
    if (!Util.isValidReleaseTriangularInput(config.teamCapability)) {
      return {
        success: false,
        error: "Please, fill a correct Team Capability."
      }
    }
    if (!Util.isValidReleaseTriangularInput(config.discountValue)) {
      return {
        success: false,
        error: "Please, fill a correct discount value."
      }
    }
    return { success: true };
  }


  testDataGeneration(config: any) {
    this.ReleasePlan.discountValue = config.discountValue;
    this.ReleasePlan.teamCapability = config.teamCapability;
    this.ReleasePlan.totalRequiredEffort = config.totalRequiredEffort;
    this.ReleasePlan.numberOfSprint = config.numberOfSprint;
    this.ReleasePlan.sprintDuration = config.sprintDuration;

    /**
     * featureNumber, vsts feature total.
     * discountValue is the Discount Rate i created.
     * teamCapability, can be three, it is going to be the capacity of the team per sprint. (in hours, integer)
     * totalRequiredEffort, is going to be sum of all feature input effort (the picked value by the random guy)
     * number of sprint, single value, user input (only one field)
     * sprint duration, per week (how many week), integer
     */
    for (var i = 0; i <= config.featureNumber - 1; i++) {
      var feature = {
        id: i + 1,//ok
        bussinesValue: Math.random() * 100 + 1,//ok
        effort: Math.random() * 50 + 1,//ok
        timeCriticality: Math.random() * 5 + 1,//ok
        cost: Math.random() * 50 + 1,//ok
        selected: false,//ok
        dependency: "0",//ok
        feature: "Feature Name #",//ok
        order: "1"//ok
      }
      this.ReleasePlan.featureList.push({ feature });
    }

    this.ReleasePlan.featureList[1].feature.dependency = "1";//ok
    this.ReleasePlan.featureList[4].feature.dependency = "2,3";//ok

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
      featureList: [], teamCapability: 0, totalRequiredEffort: 0,
      numberOfSprint: 0, sprintDuration: 0,
      additional: false,
      algorithmType: ALGORITHM_TYPE.IFM
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



    let totalSprintRequired = Util.sprintAssignation(ResultReleasePlan);
    if (totalSprintRequired > ResultReleasePlan.numberOfSprint) {
      ResultReleasePlan.additional = true;
    }
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
