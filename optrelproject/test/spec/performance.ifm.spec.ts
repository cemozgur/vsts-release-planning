/**
 * @author Yijia Bei <yijiabei94@gmail.com>
 * @author Tingting Gao <uczltg1@ucl.ac.uk>
 * @author Yunan Wang <wangyunan941113@gmail.com>
 * @version 1.0
 * @license MIT License Copyright (c) 2017 OptRel team
 * 
 * @description Test Cases for NSGA Algorithm
 */
import IFMReleasePlanningAlgorithm from "../../src/logic/entities/IFMReleasePlanningAlgorithm";

xdescribe("Evaluation for IFM performance", () => {
    xdescribe("Evaluation for 12 features ", () => {
        var result;
        var originalTimeout;
        var algorithmService;
        var configFile;

        beforeAll(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
            algorithmService = new IFMReleasePlanningAlgorithm();
            configFile = {
                discountValue: {
                    Min: 10,
                    Expected: 50,
                    Max: 100
                },
                teamCapability: {
                    Min: 0,
                    Expected: 500,
                    Max: 1000
                },
                numberOfSprint: 4,
                sprintDuration: 5,
            }
            algorithmService.featureList = [
                {
                    feature: {
                        id: 1,
                        workItemId: 1,
                        feature: "Hili",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 10,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 2,
                        workItemId: 2,
                        feature: "Hili",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 20,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 3,
                        workItemId: 3,
                        feature: "Hili",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 30,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },

                {
                    feature: {
                        id: 4,
                        workItemId: 4,
                        feature: "Hili 2",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 40,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },

                {
                    feature: {
                        id: 5,
                        workItemId: 5,
                        feature: "Hili 2",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 50,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 6,
                        workItemId: 6,
                        feature: "Hili 2",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 60,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 7,
                        workItemId: 7,
                        feature: "Hili 2",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 70,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 8,
                        workItemId: 8,
                        feature: "Hili 2",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 80,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 9,
                        workItemId: 9,
                        feature: "Hili 2",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 90,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 10,
                        workItemId: 10,
                        feature: "Hili 2",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 100,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 11,
                        workItemId: 11,
                        feature: "Hili 2",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 110,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 12,
                        workItemId: 12,
                        feature: "Hili 2",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 120,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
            ];

        });

        it("Validate the generation time is less than a minute (60 000 milliseconds) for 12 features ", () => {
            var start = Date.now();
            var result = algorithmService.getOptimalReleasePlan(configFile);
            var end = Date.now();
            expect(end - start).toBeLessThan(60000);
        });

        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });

    });

    xdescribe("Evaluation for 15 features ", () => {
        var result;
        var originalTimeout;
        var algorithmService;
        var configFile;

        beforeAll(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
            algorithmService = new IFMReleasePlanningAlgorithm();
            configFile = {
                discountValue: {
                    Min: 10,
                    Expected: 50,
                    Max: 100
                },
                teamCapability: {
                    Min: 0,
                    Expected: 500,
                    Max: 1000
                },
                numberOfSprint: 4,
                sprintDuration: 5,
            }
            algorithmService.featureList = [
                {
                    feature: {
                        id: 1,
                        workItemId: 1,
                        feature: "Hili",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 10,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 2,
                        workItemId: 2,
                        feature: "Hili",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 20,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 3,
                        workItemId: 3,
                        feature: "Hili",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 30,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },

                {
                    feature: {
                        id: 4,
                        workItemId: 4,
                        feature: "Hili 2",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 40,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },

                {
                    feature: {
                        id: 5,
                        workItemId: 5,
                        feature: "Hili 2",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 50,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 6,
                        workItemId: 6,
                        feature: "Hili 2",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 60,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 7,
                        workItemId: 7,
                        feature: "Hili 2",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 70,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 8,
                        workItemId: 8,
                        feature: "Hili 2",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 80,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 9,
                        workItemId: 9,
                        feature: "Hili 2",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 90,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 10,
                        workItemId: 10,
                        feature: "Hili 2",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 100,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 11,
                        workItemId: 11,
                        feature: "Hili 2",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 110,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 12,
                        workItemId: 12,
                        feature: "Hili 2",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 120,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 13,
                        workItemId: 13,
                        feature: "Hili 13",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 120,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 14,
                        workItemId: 14,
                        feature: "Hili 14",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 120,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
                {
                    feature: {
                        id: 15,
                        workItemId: 15,
                        feature: "Hili 15",
                        state: "Active",
                        sprint: "0",
                        selected: false,
                        businessValue: 120,
                        effort: 20,
                        cost: 10,
                        risk: 1,
                        timeCriticality: 4,
                        dependency: "0",
                        dependencyWorkItemId: "0"
                    }
                },
            ];

        });

        it("Validate the generation time is less than a minute (60 000 milliseconds) for 12 features ", () => {
            var start = Date.now();
            var result = algorithmService.getOptimalReleasePlan(configFile);
            var end = Date.now();
            expect(end - start).toBeLessThan(60000);
        });

        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });

    });
});