import HelloTypeScript from '../HelloTypeScript';
/*
import container from "../../logic/config/inversify.config";
import IReleasePlanningAlgorithm from "../../logic/interfaces/IReleasePlanningAlgorithm";
import SERVICE_IDENTIFIER from "../../logic/constants/identifiers";
import ALGORITHM_TYPE from "../../logic/constants/algorithmType"
*/

describe("Greeter", () => {
 
    describe("greet", () => {
 
        it("returns Hello World", () => {
            //let algorithmService = container.getNamed<IReleasePlanningAlgorithm>(SERVICE_IDENTIFIER.IReleasePlanningAlgorithm, ALGORITHM_TYPE.IFM);

            // Arrange
            let greeter = new HelloTypeScript();
 
            // Act
            let result = greeter.greeter("IFM Algortihm");
 
            // Assert
            expect(result).toEqual("Hello IFM Algortihm");
        });
    });
});