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
}