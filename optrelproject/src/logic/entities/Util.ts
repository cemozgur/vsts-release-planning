import { IFM_Approach_message, NSGA2_Approach_message } from '../../logic/constants/algorithmViewSection';
import ALGORITHM_TYPE from "../../logic/constants/algorithmType"

/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @author Cem Ozgur <cem.ozgur@live.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description Util contains common functions
 */
export class Util {

    /**
     * @function isValidReleaseTriangularInput
     * @param infoObject contains the object with the attributes for triangular distribution
     * @description It validates if the object contains the attribute Min,Expected and Max, also if the values are correct number, and
     * min value <= expected value <= max value
     * */
     static isValidReleaseTriangularInput(infoObject: Object): boolean {
        if (!infoObject) {
            return false;
        }
        if (infoObject.hasOwnProperty("Min") && infoObject["Min"] && (infoObject["Min"].length > 0)
            && infoObject.hasOwnProperty("Expected") && infoObject["Expected"] && (infoObject["Expected"].length > 0)
            && infoObject.hasOwnProperty("Max") && infoObject["Max"] && (infoObject["Max"].length > 0)) {
            if (Util.isNumber(infoObject["Min"]) && Util.isNumber(infoObject["Expected"]) && Util.isNumber(infoObject["Max"])) {
                let min = Number(infoObject["Min"]);
                let expected = Number(infoObject["Expected"]);
                let max = Number(infoObject["Max"]);

                if ((min <= expected) && (expected <= max)) {
                    return true;
                } else {
                    return false;
                }

            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * @function isNumber
     * @param value
     * @description it validate if value is a number, if yes returns true, otherwise returns false
     * */
    static isNumber(value): boolean {
        if (value && isNaN(Number(value))) {
            return false;
        } else {
            let valueNumber = Number(value);
            if (valueNumber > 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * @function getRandomValue
     * @param info contains object with a triangular distribution (Min, Expected and Max)
     * @description it returns randomly the value of any attribute Min, Expected and Max from an object with a triangular distribution
     * */
    static getRandomValue(info: any): string {
        let order = Math.floor(Math.random() * 3) + 1;
        if (order == 1) {
            return info.Min;
        } else if (order == 2) {
            return info.Expected
        } else {
            return info.Max;
        }
    }

    /**
     * @function getReleasePlanExplanation
     * @param releasePlan contains object that contains a Release Plan object 
     * @description it returns a message indicating a recommendation for a user according to the Release Plan object
     * */
    static getReleasePlanExplanation(releasePlan: any): string[] {
        let message = [];
        message.push("The release plan was generated considering a discount value of " + releasePlan.discountValue + "%. And the Net Present Value for the optimal release plan is £ " + parseFloat(releasePlan.finalNPV).toFixed(2) + ".");
        message.push("All " + releasePlan.featureList.length + " features are placed in " + releasePlan.numberOfSprint + " sprints, where each sprint last " + releasePlan.sprintDuration + " weeks. Additionally, per sprint the whole team can work " + releasePlan.teamCapability + " hours.");
        //if the release plan requires to add more hours to the team capability to conform the number of sprints
        if (releasePlan.additionalTeamCapability > 0) {
            message.push("Considering the amount of required effort to finish all features, it is required to increase the team capacity per sprint by " + parseFloat(releasePlan.additionalTeamCapability).toFixed(2) + " hours.");
        }
        return message;
    }

    /**
     * @function getReleasePlanExplanationHistory
     * @param releasePlan contains object that contains a Release Plan object 
     * @description it returns a message indicating a recommendation for a user according to the Release Plan object for revision
     * */
    static getReleasePlanExplanationHistory(releasePlan: any): string[] {
        let message = [];
        if (ALGORITHM_TYPE.IFM == releasePlan.algorithmType) {
            message.push("Release Planning Approach: " + IFM_Approach_message);
        } else if (ALGORITHM_TYPE.GA == releasePlan.algorithmType) {
            message.push("Release Planning Approach: " + NSGA2_Approach_message);
        }
        this.getReleasePlanExplanation(releasePlan).map(feedback => {
            message.push(feedback);
        });
        return message;
    }
    /**
     * @function getNetPresentValueReleasePlan
     * @description This function calculates the NPV of te project after the features are allocated to the sprints.
     */
    static getNetPresentValueReleasePlan(ResultReleasePlan: any) {
        var finalNPV = 0.0;
        var separatedSprints = [];
        var maxSprintForIncome = "";
        var minSprintForCost = "";

        var discountValue = ResultReleasePlan.discountValue;
        var numberOfSprints = ResultReleasePlan.numberOfSprint;


        ResultReleasePlan.featureList.map((featureTarget, index) => {
            separatedSprints = featureTarget.sprint.split(",");
            minSprintForCost = separatedSprints[0];
            maxSprintForIncome = separatedSprints[separatedSprints.length - 1];
            finalNPV -= parseFloat(featureTarget.cost) / Math.pow((1.0 + (discountValue / 100.0)), (parseFloat(minSprintForCost) - 1));

            finalNPV += this.calculateIncome(ResultReleasePlan.featureList, index, discountValue, (numberOfSprints - parseInt(maxSprintForIncome))) / Math.pow((1.0 + (discountValue / 100.0)), parseFloat(maxSprintForIncome));

        });
        ResultReleasePlan.finalNPV = finalNPV;
    }

     /**
     * @function calculateIncome
     * @description This function calculates the NPV of just a feature in order to use it in the getNetPresentValueReleasePlan function.
     */
    private static calculateIncome(features: any, j: number, discountValue: number, numberOfSprints: number) {
        var miniNpv = 0;
        var e = 0.0;

        for (var i = 1; i <= numberOfSprints; i++) {
            e = i;
            miniNpv += parseFloat(features[j].businessValue) / Math.pow((1.0 + (discountValue / 100.0)), e);
        }

        return miniNpv;
    }


    /**
     * @function sprintAssignation
     * @param ResultReleasePlan contains object that contains a Release Plan object, with an attribute featureList that contains the order of features 
     * @description This function assignes the features, which are sequenced by the algorithm, into sprints.
     */
    static sprintAssignation(ResultReleasePlan: any) {
        var workedHours = 0;
        var sprintIteration = 1;
        var hoursPerSprint = ResultReleasePlan.requiredTeamCapability;
        
        let availableHours = 0;

        //iteration of all features for the release plans
        ResultReleasePlan.featureList.map((featureTarget) => {
  
            availableHours = (sprintIteration * hoursPerSprint) - workedHours;
            if (availableHours >= featureTarget.effort) {
                featureTarget.sprint = sprintIteration.toString();//if the available hours is greater or equals to the required effort, we save.
                workedHours += featureTarget.effort;
                availableHours = (sprintIteration * hoursPerSprint) - workedHours;
                if (availableHours == 0) {
                    sprintIteration++;
                }
            } else {
                let requiredSprints = [];
                let hoursToFinishFeature = featureTarget.effort;

                availableHours = (sprintIteration * hoursPerSprint) - workedHours;
                while (hoursToFinishFeature > 0) {
                    //available hours will be great than 0, always the first time entering the loop, after that it is not guaranteed
                    availableHours = (sprintIteration * hoursPerSprint) - workedHours;
                    if (availableHours < hoursToFinishFeature) {
                        requiredSprints.push(sprintIteration);
                        hoursToFinishFeature -= availableHours;
                        workedHours += availableHours;
                        sprintIteration++;
                    } else {
                        //we kill the loop, because the feature has been allocated successfully
                        requiredSprints.push(sprintIteration);
                        workedHours += hoursToFinishFeature;
                        hoursToFinishFeature = 0;

                        if (workedHours == sprintIteration * hoursPerSprint) {
                            sprintIteration++;
                        }
                    }
                }

                featureTarget.sprint = requiredSprints.join(",");
            }

        });

    }
}
