import GAReleasePlanningAlgorithm from "../../src/logic/entities/GAReleasePlanningAlgorithm";


describe("Genetic Algorithm", () => {
 
    describe("Type", () => {
        it("returns GA Algortihm", () => {
            // Arrange
            let algorithmService = new GAReleasePlanningAlgorithm();
            // Act
            const result = algorithmService.getReleasePlanType();
 
            // Assert
            expect(result).toEqual("GA Algortihm");
        });
        
    });
});