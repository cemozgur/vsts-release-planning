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
            return true;
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
    static sprintAssignation(ResultReleasePlan: any): number {
        //updating sprint selection
        let working = 0.0;
        let sprintStatus = 1;
        let sprintArray = [];
        let featureEffortTemp = 0;
        let workTempAdvance = 0;
        let sprintDurationCalc = ResultReleasePlan.teamCapability;


        ResultReleasePlan.featureList.map((featureWork) => {
            if (((sprintStatus * sprintDurationCalc) - working) >= featureWork.effort) {
                featureWork.sprint = sprintStatus.toString();
                working += featureWork.effort;
            } else {
                sprintArray = [];
                featureEffortTemp = featureWork.effort;
                workTempAdvance = 0;

                while (((sprintStatus * sprintDurationCalc) - working) <= featureEffortTemp) {
                    if (((sprintStatus * sprintDurationCalc) - working) != 0) {
                        sprintArray.push(sprintStatus);
                    }
                    workTempAdvance = ((sprintStatus * sprintDurationCalc) - working);
                    featureEffortTemp -= workTempAdvance
                    working += workTempAdvance;
                    sprintStatus++;
                }

                if (featureEffortTemp != 0) {
                    sprintArray.push(sprintStatus);
                    working += featureEffortTemp;
                }
                featureWork.sprint = sprintArray.join(",");
            }

        });

        return sprintStatus;
    }
}