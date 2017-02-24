import IFMReleasePlanningAlgorithm from "../../src/logic/entities/IFMReleasePlanningAlgorithm";

describe("IFM Algorithm", () => {
 
    describe("type", () => {
 
        it("returns IFM Algortihm", () => {
            // Arrange
            let algorithmService = new IFMReleasePlanningAlgorithm();
            // Act
            const result = algorithmService.getReleasePlanType();
 
            // Assert
            expect(result).toEqual("IFM Algortihm");
        });

    });
});