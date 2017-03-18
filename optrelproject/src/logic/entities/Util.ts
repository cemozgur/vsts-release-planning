import { IFM_Approach_message, NSGA2_Approach_message } from '../../logic/constants/algorithmViewSection';
import ALGORITHM_TYPE from "../../logic/constants/algorithmType"


export class Util {

    static printHello(): void {
        console.log("Hello");
    }

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

    static getReleasePlanExplanation(releasePlan: any): string[] {
        let message = [];
        message.push("The release plan was generated considering a discount value of " + releasePlan.discountValue + "%. And the Net Present Value for the optimal release plan is £ " + parseFloat(releasePlan.finalNPV).toFixed(3) + ".");
        message.push("All " + releasePlan.featureList.length + " features are placed in " + releasePlan.numberOfSprint + " sprints, where each sprint last " + releasePlan.sprintDuration + " weeks. Additionally, per sprint the whole team can work " + releasePlan.teamCapability + " hours.");
        if (releasePlan.additional) {
            message.push("Considering the amount of required effort to finish all features, it is required to increase the capacity of the team per sprint, or increment the number of the sprints.");
        }
        return message;
    }

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
    private static calculateIncome(features: any, j: number, discountValue: number, numberOfSprints: number) {
        var miniNpv = 0;
        var e = 0.0;

        for (var i = 1; i <= numberOfSprints; i++) {
            e = i;
            miniNpv += parseFloat(features[j].businessValue) / Math.pow((1.0 + (discountValue / 100.0)), e);
        }

        return miniNpv;
    }



    static sprintAssignation(ResultReleasePlan: any) {
        var workedHours = 0;
        var sprintIteration = 1;
        var hoursPerSprint = ResultReleasePlan.teamCapability;
        let availableHours = 0;

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
                        //we kill the loop
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


        if (sprintIteration > ResultReleasePlan.numberOfSprint) {
            ResultReleasePlan.additional = true;
        }
    }
}