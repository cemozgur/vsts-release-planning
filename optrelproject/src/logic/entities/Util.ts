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



    static sprintAssignation(ResultReleasePlan: any): number {
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
        return sprintIteration;
    }
}