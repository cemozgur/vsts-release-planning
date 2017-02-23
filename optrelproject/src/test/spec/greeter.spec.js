"use strict";
var HelloTypeScript_1 = require("../HelloTypeScript");
/*
import container from "../../logic/config/inversify.config";
import IReleasePlanningAlgorithm from "../../logic/interfaces/IReleasePlanningAlgorithm";
import SERVICE_IDENTIFIER from "../../logic/constants/identifiers";
import ALGORITHM_TYPE from "../../logic/constants/algorithmType"
*/
describe("Greeter", function () {
    describe("greet", function () {
        it("returns Hello World", function () {
            //let algorithmService = container.getNamed<IReleasePlanningAlgorithm>(SERVICE_IDENTIFIER.IReleasePlanningAlgorithm, ALGORITHM_TYPE.IFM);
            // Arrange
            var greeter = new HelloTypeScript_1.default();
            // Act
            var result = greeter.greeter("IFM Algortihm");
            // Assert
            expect(result).toEqual("Hello IFM Algortihm");
        });
    });
});
