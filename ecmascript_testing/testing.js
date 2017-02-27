const value = "1,2,3";
const value1 = "1,23433r";

const regexp = new RegExp('^[0-9]+,[0-9]+,[0-9]+$');


console.log(regexp.test(value));
console.log(regexp.test(value1));


console.log(Math.floor(Math.random() * 3) + 1);
console.log(Math.floor(Math.random() * 3) + 1);
console.log(Math.floor(Math.random() * 3) + 1);


function isValidReleaseTriangularInput(infoObject) {
    if (!infoObject) {
        return false;
    }
    if( infoObject.hasOwnProperty("Min") && infoObject["Min"] && infoObject["Min"].length > 0
        && infoObject.hasOwnProperty("Expected") && infoObject["Expected"] && infoObject["Expected"].length > 0
        && infoObject.hasOwnProperty("Max") && infoObject["Max"] && infoObject["Max"].length > 0){
            return true;
    }
    return false;   
}

let test = {
    Min: "2",
    Expected: "1"
}

console.log(isValidReleaseTriangularInput(test));