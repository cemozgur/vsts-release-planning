import IFMReleasePlanningAlgorithm from "../../src/logic/entities/IFMReleasePlanningAlgorithm";

describe("IFM Algorithm", () => {

        let algorithmService = new IFMReleasePlanningAlgorithm();

        let configFile = {
                discountValue: {
                        Min: 15,
                        Expected: 20,
                        Max: 25
                },
                teamCapability: {
                        Min: 15,
                        Expected: 20,
                        Max: 25
                },
                numberOfSprint: 4,
                sprintDuration: 5,
        };

        describe("Test getOptimalReleasePlan.getTotalRequiredEffort()", () => {


                algorithmService.ReleasePlan.featureList =
                        [{
                                feature:
                                {
                                        id: 1,
                                        workItemId: 1,//has to be the same as id
                                        feature: "Feature Name 1",
                                        state: "Active",// has to be Active
                                        sprint: "0",//has to be 0
                                        selected: false,

                                        bussinesValue: 8,
                                        effort: 1,
                                        cost: 7,
                                        risk: 2,//it does not matter the value

                                        timeCriticality: 6,
                                        dependency: "0",
                                        dependencyWorkItemId: "0",//has to be the same as dependeency
                                }
                        },
                        {
                                feature:
                                {
                                        id: 2,
                                        workItemId: 2,//has to be the same as id
                                        feature: "Feature Name 2",
                                        state: "Active",// has to be Active
                                        sprint: "0",//has to be 0
                                        selected: false,

                                        bussinesValue: 15,
                                        effort: 33,
                                        cost: 7,
                                        risk: 2,//it does not matter the value

                                        timeCriticality: 6,
                                        dependency: "0",
                                        dependencyWorkItemId: "0",//has to be the same as dependeency
                                }
                        },
                        {
                                feature:
                                {
                                        id: 3,
                                        workItemId: 3,//has to be the same as id
                                        feature: "Feature Name 3",
                                        state: "Active",// has to be Active
                                        sprint: "0",//has to be 0
                                        selected: false,

                                        bussinesValue: 8,
                                        effort: 1,
                                        cost: 7,
                                        risk: 2,//it does not matter the value

                                        timeCriticality: 6,
                                        dependency: "0",
                                        dependencyWorkItemId: "0",//has to be the same as dependeency
                                }
                        }
                        ]


                const result = algorithmService.getOptimalReleasePlan(configFile);


                it("returns the totalRequiredEffort '20'", () => {

                        expect(result.totalRequiredEffort).toEqual(35);


                });
        });

});
