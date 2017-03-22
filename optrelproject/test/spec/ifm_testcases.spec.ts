/**
 * @author Yijia Bei <yijiabei94@gmail.com>
 * @author Tingting Gao <uczltg1@ucl.ac.uk>
 * @author Yunan Wang <wangyunan941113@gmail.com>
 * @version 1.0
 * @license MIT License Copyright (c) 2017 OptRel team
 * 
 * @description Test Cases for IFM Algorithm
 */
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
                        {workItemId: 1, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 1, bussinesValue : 8, effort : 1, timeCriticality : 6, cost : 7, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
                },
                {
                        feature:
                        {workItemId: 2, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 2, bussinesValue : 6, effort : 2, timeCriticality : 9, cost : 5, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 3, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 3, bussinesValue : 4, effort : 3, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {        
                        feature: 
                        {workItemId: 4, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 4, bussinesValue : 5, effort : 4, timeCriticality : 6, cost : 4, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 5, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 5, bussinesValue : 4, effort : 5, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 6, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 6, bussinesValue : 4, effort : 6, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 7, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 7, bussinesValue : 4, effort : 7, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 8, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 8, bussinesValue : 4, effort : 8, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 9, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 9, bussinesValue : 4, effort : 9, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 10, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 10, bussinesValue : 4, effort : 9, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 11, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 11, bussinesValue : 4, effort : 8, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 12, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 12, bussinesValue : 4, effort : 7, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 13, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 13, bussinesValue : 4, effort : 6, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 14, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 14, bussinesValue : 4, effort : 5, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 15, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 15, bussinesValue : 4, effort : 4, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 16, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 16, bussinesValue : 4, effort : 3, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 17, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 17, bussinesValue : 4, effort : 2, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                }]


                const result = algorithmService.getOptimalReleasePlan(configFile);

 
                it("returns the totalRequiredEffort '20'", () => {
           
                expect(result.totalRequiredEffort).toEqual(89);
           

                });
        });


        describe("Test getOptimalReleasePlan.getTotalRequiredEffort() (critical value all the effort = 0", () => {

       

                algorithmService.ReleasePlan.featureList =
                [{
                        feature:
                        {workItemId: 1, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 1, bussinesValue : 8, effort : 0, timeCriticality : 6, cost : 7, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
                },
                {
                        feature:
                        {workItemId: 2, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 2, bussinesValue : 6, effort : 0, timeCriticality : 9, cost : 5, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 3, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 3, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {        
                        feature: 
                        {workItemId: 4, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 4, bussinesValue : 5, effort : 0, timeCriticality : 6, cost : 4, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 5, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 5, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 6, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 6, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 7, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 7, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 8, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 8, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 9, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 9, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 10, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 10, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 11, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 11, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 12, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 12, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 13, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 13, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 14, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 14, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 15, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 15, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 16, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 16, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                },
                {
                        feature: 
                        {workItemId: 17, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 17, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
                }]


                const result = algorithmService.getOptimalReleasePlan(configFile);

 
                it("returns the totalRequiredEffort '0'", () => {
           
                expect(result.totalRequiredEffort).toEqual(0);
           

                });
        });
        

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


                it("returns the totalRequiredEffort '35'", () => {

                        expect(result.totalRequiredEffort).toEqual(35);


                });
        });


       




        /*describe("Test calculateNumberOfRequiredSprint with normal value", () => {

 
        it("return to 2", () => {

            algorithmService.ReleasePlan.discountValue = 50;
            algorithmService.ReleasePlan.teamCapability = 50;
            algorithmService.ReleasePlan.totalRequiredEffort = 200;
            algorithmService.ReleasePlan.sprintDuration = 2;
            const result = algorithmService.calculateNumberOfRequiredSprint();

            expect(result).toEqual(2); 

        });


        it("when otalRequiredEffort = 0, return to 0 (critical value)", () => {
            

            algorithmService.ReleasePlan.discountValue = 50;
            algorithmService.ReleasePlan.teamCapability = 50;
            algorithmService.ReleasePlan.totalRequiredEffort = 0;
            algorithmService.ReleasePlan.sprintDuration = 2;

            const result = algorithmService.calculateNumberOfRequiredSprint();

            expect(result).toEqual(0); 

        });

        it("when sprintDuration = 0, return to Infinity (critical value)", () => {
            
            algorithmService.ReleasePlan.discountValue = 50;
            algorithmService.ReleasePlan.teamCapability = 50;
            algorithmService.ReleasePlan.totalRequiredEffort = 300;
            algorithmService.ReleasePlan.sprintDuration = 0;

            const result = algorithmService.calculateNumberOfRequiredSprint();

            expect(result).toEqual(Infinity); 

        });

        it("when teamCapability = 0, return to Infinity(critical value)", () => {
         
            algorithmService.ReleasePlan.discountValue = 50;
            algorithmService.ReleasePlan.teamCapability = 0;
            algorithmService.ReleasePlan.totalRequiredEffort = 200;
            algorithmService.ReleasePlan.sprintDuration = 3;

            const result = algorithmService.calculateNumberOfRequiredSprint();

            expect(result).toEqual(Infinity); 

        });


        it("when teamCapability = 0 and totalRequiredEffort = 0, return toInfinity (critical value)", () => {
        

            algorithmService.ReleasePlan.discountValue = 50;
            algorithmService.ReleasePlan.teamCapability = 0;
            algorithmService.ReleasePlan.totalRequiredEffort = 0;
            algorithmService.ReleasePlan.sprintDuration = 3;

            const result = algorithmService.calculateNumberOfRequiredSprint();
            expect(result).toEqual(NaN); 

        });


         it("when (totalRequiredEffort/sprintDuration * teamCapability) is not an integer, return to the closest integer which is bigger", () => {
            
            algorithmService.ReleasePlan.discountValue = 50;
            algorithmService.ReleasePlan.teamCapability = 2;
            algorithmService.ReleasePlan.totalRequiredEffort = 100;
            algorithmService.ReleasePlan.sprintDuration = 3;

            const result = algorithmService.calculateNumberOfRequiredSprint();
            expect(result).toEqual(17); 

        });


         it("when (totalRequiredEffort/sprintDuration * teamCapability) is not an integer, return to the closest integer which is bigger version2", () => {
         
            algorithmService.ReleasePlan.discountValue = 50;
            algorithmService.ReleasePlan.teamCapability = 500;
            algorithmService.ReleasePlan.totalRequiredEffort = 100;
            algorithmService.ReleasePlan.sprintDuration = 2;

            const result = algorithmService.calculateNumberOfRequiredSprint();
            expect(result).toEqual(1); 

        });

    });*/



        describe("Test getOptimalReleasePlan to make sure every featureilist is selected and defined ", () => {
    
        algorithmService.ReleasePlan.featureList =
        [{
                feature:
                {workItemId: 1, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 1, bussinesValue : 8, effort : 0, timeCriticality : 6, cost : 0, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature:
                {workItemId: 2, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 2, bussinesValue : 6, effort : 0, timeCriticality : 9, cost : 9, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature: 
                {workItemId: 3, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 3, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {        
                feature: 
                {workItemId: 4, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 4, bussinesValue : 5, effort : 0, timeCriticality : 6, cost : 4, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
         },
        {
                feature: 
                {workItemId: 5, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 5, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {workItemId: 6, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 6, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {workItemId: 7, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 7, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {workItemId: 8, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 8, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {workItemId: 9, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 9, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {workItemId: 10, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 10, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {workItemId: 11, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 11, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {workItemId: 12, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 12, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {workItemId: 13, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 13, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {workItemId: 14, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 14, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {workItemId: 15, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 15, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {workItemId: 16, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 16, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {workItemId: 17, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 17, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        }]


        const result = algorithmService.getOptimalReleasePlan(configFile);

 
        it("return featureList[0-16].selected = true", () => {
            // Arrange

             // Assert
            //expect(result.featureList[0].feature.selected).toEqual(true); 
            expect(result.featureList[3].selected).toBe(true); 
            expect(result.featureList[0].selected).toBe(true); 
            expect(result.featureList[1].selected).toBe(true); 
            expect(result.featureList[2].selected).toBe(true); 
            expect(result.featureList[4].selected).toBe(true); 
            expect(result.featureList[5].selected).toBe(true); 
            expect(result.featureList[6].selected).toBe(true); 
            expect(result.featureList[7].selected).toBe(true); 
            expect(result.featureList[8].selected).toBe(true); 
            expect(result.featureList[9].selected).toBe(true); 
            expect(result.featureList[10].selected).toBe(true); 
            expect(result.featureList[11].selected).toBe(true); 
            expect(result.featureList[12].selected).toBe(true); 
            expect(result.featureList[13].selected).toBe(true); 
            expect(result.featureList[14].selected).toBe(true); 
            expect(result.featureList[15].selected).toBe(true); 
            expect(result.featureList[16].selected).toBe(true); 

        });

        it("return featureList.length = 17", () => {
            expect(result.featureList.length).toEqual(17); 

        });

        it("return result.featureList[0-16].toBeDefined()", () => {
            expect(result.featureList[3]).toBeDefined();
            expect(result.featureList[0]).toBeDefined();
            expect(result.featureList[1]).toBeDefined();
            expect(result.featureList[2]).toBeDefined();
            expect(result.featureList[4]).toBeDefined();
            expect(result.featureList[5]).toBeDefined();
            expect(result.featureList[6]).toBeDefined();
            expect(result.featureList[7]).toBeDefined();
            expect(result.featureList[8]).toBeDefined();
            expect(result.featureList[9]).toBeDefined();
            expect(result.featureList[10]).toBeDefined();
            expect(result.featureList[11]).toBeDefined();
            expect(result.featureList[12]).toBeDefined();
            expect(result.featureList[13]).toBeDefined();
            expect(result.featureList[14]).toBeDefined();
            expect(result.featureList[15]).toBeDefined();
            expect(result.featureList[16]).toBeDefined();
        });
        
        it("(critical value)return undefined", () => {
            expect(result.featureList[200]).toBeUndefined(); 
            expect(result.featureList[17]).toBeUndefined(); 

        });

    });


        describe("Test getOptimalReleasePlan to get the resultfeaturelist.length which only contains one feature", () => {

        algorithmService.ReleasePlan.discountValue = 50;
        algorithmService.ReleasePlan.teamCapability = 50;
        algorithmService.ReleasePlan.totalRequiredEffort = 200;
        algorithmService.ReleasePlan.sprintDuration = 2;
        algorithmService.ReleasePlan.featureList =
        [{
                feature:
                {workItemId: 1, state: "Active", sprint: "0", dependencyWorkItemId: "0", risk: 2, id : 1, bussinesValue : 8, effort : 5, timeCriticality : 6, cost : 7, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        }]


        const result = algorithmService.getOptimalReleasePlan(configFile);

 
        it("(critical value)return featureList.length = 1", () => {
            expect(result.featureList.length).toEqual(1); 
            expect(result.featureList[0].id).toEqual(1);

        });

        it("(critical value)return undefined", () => {
            expect(result.featureList[1]).toBeUndefined(); 
            expect(result.featureList[20]).toBeUndefined(); 

        });
        });





    describe("Test getOptimalReleasePlan when the cost,timeCriticality and dependency are the same(tocheck the correctness of sorted by bussinesValue )", () => {
    //ReleasePlan.featureList[index].feature.bussinesValue/Math.pow((1.0+(this.ReleasePlan.cumulatedDiscountValue/100.0)), e);
        
        algorithmService.ReleasePlan.discountValue = 50;
        algorithmService.ReleasePlan.teamCapability = 50;
        algorithmService.ReleasePlan.totalRequiredEffort = 200;
        algorithmService.ReleasePlan.sprintDuration = 2;

        algorithmService.ReleasePlan.featureList =
        [{
                feature:
                {id : 1, bussinesValue : 16, effort : 0, timeCriticality : 2, cost : 3, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature:
                {id : 2, bussinesValue : 15, effort : 0, timeCriticality : 2, cost : 3, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature: 
                {id : 3, bussinesValue : 14, effort : 0, timeCriticality : 2, cost : 3, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {        
                feature: 
                {id : 4, bussinesValue : 13, effort : 0, timeCriticality : 2, cost : 3, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
         },
        {
                feature: 
                {id : 5, bussinesValue : 12, effort : 0, timeCriticality : 2, cost : 7, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 6, bussinesValue : 11, effort : 0, timeCriticality : 2, cost : 7, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 7, bussinesValue : 10, effort : 0, timeCriticality : 2, cost : 7, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 8, bussinesValue : 9, effort : 0, timeCriticality : 2, cost : 7, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 9, bussinesValue : 8, effort : 0, timeCriticality : 2, cost : 7, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 10, bussinesValue : 7, effort : 0, timeCriticality : 2, cost : 7, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 11, bussinesValue : 6, effort : 0, timeCriticality : 2, cost : 7, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 12, bussinesValue : 5, effort : 0, timeCriticality : 2, cost : 7, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 13, bussinesValue : 4, effort : 0, timeCriticality : 2, cost : 7, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 14, bussinesValue : 3, effort : 0, timeCriticality : 2, cost : 7, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 15, bussinesValue : 2, effort : 0, timeCriticality : 2, cost : 7, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 16, bussinesValue : 1, effort : 0, timeCriticality : 2, cost : 7, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 17, bussinesValue : 0, effort : 0, timeCriticality : 2, cost : 7, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        }]



        const result = algorithmService.getOptimalReleasePlan(configFile);

 
        it("when the cost are the same,timeCriticality, not take dependency into consideration, sorted by the bussinesValue ", () => {
            // Arrange          
           // Assert
            expect(result.featureList[0].id).toEqual(1);
            expect(result.featureList[1].id).toEqual(2);
            expect(result.featureList[2].id).toEqual(3);
            expect(result.featureList[3].id).toEqual(4);
            expect(result.featureList[4].id).toEqual(5);
            expect(result.featureList[5].id).toEqual(6);
            expect(result.featureList[6].id).toEqual(7);
            expect(result.featureList[7].id).toEqual(8);
            expect(result.featureList[8].id).toEqual(9);
            expect(result.featureList[9].id).toEqual(10);
            expect(result.featureList[10].id).toEqual(11);
            expect(result.featureList[11].id).toEqual(12);
            expect(result.featureList[12].id).toEqual(13);
            expect(result.featureList[13].id).toEqual(14);
            expect(result.featureList[14].id).toEqual(15);
            expect(result.featureList[15].id).toEqual(16);
            expect(result.featureList[16].id).toEqual(17);

        });

    });




    describe("Test getOptimalReleasePlan when the bussinesValue,timeCriticality and dependency are the same(tocheck the correctness of sorted by cost inversely", () => {
    
        
        algorithmService.ReleasePlan.discountValue = 50;
        algorithmService.ReleasePlan.teamCapability = 50;
        algorithmService.ReleasePlan.totalRequiredEffort = 200;
        algorithmService.ReleasePlan.sprintDuration = 2;

        algorithmService.ReleasePlan.featureList =
        [{
                feature:
                {id : 1, bussinesValue : 10, effort : 5, timeCriticality : 2, cost : 1, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature:
                {id : 2, bussinesValue : 10, effort : 1, timeCriticality : 2, cost : 2, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature: 
                {id : 3, bussinesValue : 10, effort : 6, timeCriticality : 2, cost : 3, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {        
                feature: 
                {id : 4, bussinesValue : 10, effort : 2, timeCriticality : 2, cost : 4, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
         },
        {
                feature: 
                {id : 5, bussinesValue : 10, effort : 8, timeCriticality : 2, cost : 5, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 6, bussinesValue : 10, effort : 9, timeCriticality : 2, cost : 6, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 7, bussinesValue : 10, effort : 4, timeCriticality : 2, cost : 7, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 8, bussinesValue : 10, effort : 3, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 9, bussinesValue : 10, effort : 4, timeCriticality : 2, cost : 9, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 10, bussinesValue : 10, effort : 9, timeCriticality : 2, cost : 10, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 11, bussinesValue : 10, effort : 5, timeCriticality : 2, cost : 11, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 12, bussinesValue : 10, effort : 9, timeCriticality : 2, cost : 12, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 13, bussinesValue : 10, effort : 6, timeCriticality : 2, cost : 13, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 14, bussinesValue : 10, effort : 3, timeCriticality : 2, cost : 14, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 15, bussinesValue : 10, effort : 3, timeCriticality : 2, cost : 15, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 16, bussinesValue : 10, effort : 5, timeCriticality : 2, cost : 16, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 17, bussinesValue : 10, effort : 4, timeCriticality : 2, cost : 17, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        }]




        const result = algorithmService.getOptimalReleasePlan(configFile);

 
        it("when the businessvalue, timeCriticality, dependency are the same, sorted by the cost inversely", () => {
           
            expect(result.featureList[0].id).toEqual(1);
            expect(result.featureList[1].id).toEqual(2);
            expect(result.featureList[2].id).toEqual(3);
            expect(result.featureList[3].id).toEqual(4);
            expect(result.featureList[4].id).toEqual(5);
            expect(result.featureList[5].id).toEqual(6);
            expect(result.featureList[6].id).toEqual(7);
            expect(result.featureList[7].id).toEqual(8);
            expect(result.featureList[8].id).toEqual(9);
            expect(result.featureList[9].id).toEqual(10);
            expect(result.featureList[10].id).toEqual(11);
            expect(result.featureList[11].id).toEqual(12);
            expect(result.featureList[12].id).toEqual(13);
            expect(result.featureList[13].id).toEqual(14);
            expect(result.featureList[14].id).toEqual(15);
            expect(result.featureList[15].id).toEqual(16);
            expect(result.featureList[16].id).toEqual(17);      

        });


    });






describe("Test getOptimalReleasePlan and only take timeCriticality  into consideration ", () => {
    
       
        algorithmService.ReleasePlan.discountValue = 50;
        algorithmService.ReleasePlan.teamCapability = 50;
        algorithmService.ReleasePlan.totalRequiredEffort = 200;
        algorithmService.ReleasePlan.sprintDuration = 2;

        algorithmService.ReleasePlan.featureList =
       [{
                feature:
                {id : 1, bussinesValue : 10, effort : 1, timeCriticality : 2, cost : 1, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature:
                {id : 2, bussinesValue : 10, effort : 1, timeCriticality : 4, cost : 1, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature: 
                {id : 3, bussinesValue : 10, effort : 1, timeCriticality : 7, cost : 1, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {        
                feature: 
                {id : 4, bussinesValue : 10, effort : 1, timeCriticality : 8, cost : 1, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
         },
        {
                feature: 
                {id : 5, bussinesValue : 10, effort : 1, timeCriticality : 3, cost : 1, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 6, bussinesValue : 10, effort : 1, timeCriticality : 5, cost : 1, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 7, bussinesValue : 10, effort : 1, timeCriticality : 6, cost : 1, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 8, bussinesValue : 10, effort : 1, timeCriticality : 1, cost : 1, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        }]
        const result = algorithmService.getOptimalReleasePlan(configFile);

 
        it("when the businessvalue are the same, sorted by the cost", () => {
        
            expect(result.featureList[0].id).toEqual(4);
            expect(result.featureList[1].id).toEqual(3);
            expect(result.featureList[2].id).toEqual(7);
            expect(result.featureList[3].id).toEqual(6);
            expect(result.featureList[4].id).toEqual(2);
            expect(result.featureList[5].id).toEqual(5);
            expect(result.featureList[6].id).toEqual(1);
            expect(result.featureList[7].id).toEqual(8);
           

        });


    });


    describe("Test getOptimalReleasePlan and only take dependency into consideration ", () => {
    
        algorithmService.ReleasePlan.discountValue = 50;
        algorithmService.ReleasePlan.teamCapability = 50;
        algorithmService.ReleasePlan.totalRequiredEffort = 200;
        algorithmService.ReleasePlan.sprintDuration = 2;

        algorithmService.ReleasePlan.featureList =
       [{
                feature:
                {id : 1, bussinesValue : 10, effort : 1, timeCriticality : 3, cost : 1, selected : false, dependency : "2,5", feature:"Feature Name 1", order: "1"}
        },
        {
                feature:
                {id : 2, bussinesValue : 10, effort : 1, timeCriticality : 3, cost : 1, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature: 
                {id : 3, bussinesValue : 10, effort : 1, timeCriticality : 3, cost : 1, selected : false, dependency : "6", feature:"Feature Name 3", order: "1"}
        },
        {        
                feature: 
                {id : 4, bussinesValue : 10, effort : 1, timeCriticality : 3, cost : 1, selected : false, dependency : "1", feature:"Feature Name 3", order: "1"}
         },
        {
                feature: 
                {id : 5, bussinesValue : 10, effort : 1, timeCriticality : 3, cost : 1, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 6, bussinesValue : 10, effort : 1, timeCriticality : 3, cost : 1, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 7, bussinesValue : 10, effort : 1, timeCriticality : 3, cost : 1, selected : false, dependency : "1,2,3,4", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 8, bussinesValue : 10, effort : 1, timeCriticality : 3, cost : 1, selected : false, dependency : "7", feature:"Feature Name 3", order: "1"}
        }]
        const result = algorithmService.getOptimalReleasePlan(configFile);

 
        it("when the businessvalue are the same, sorted by the cost", () => {
            expect(result.featureList[0].id).toEqual(2);
            expect(result.featureList[1].id).toEqual(5);
            expect(result.featureList[2].id).toEqual(1);
            expect(result.featureList[3].id).toEqual(4);
            expect(result.featureList[4].id).toEqual(6);
            expect(result.featureList[5].id).toEqual(3);
            expect(result.featureList[6].id).toEqual(7);
            expect(result.featureList[7].id).toEqual(8);
           

        });


    });


    describe("Test getOptimalReleasePlan and make sure all the values are the same(sorted by the order of the original list) ", () => {
    
        
        algorithmService.ReleasePlan.discountValue = 50;
        algorithmService.ReleasePlan.teamCapability = 50;
        algorithmService.ReleasePlan.totalRequiredEffort = 200;
        algorithmService.ReleasePlan.sprintDuration = 2;

        algorithmService.ReleasePlan.featureList =
       [{
                feature:
                {id : 1, bussinesValue : 10, effort : 1, timeCriticality : 3, cost : 1, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature:
                {id : 2, bussinesValue : 10, effort : 1, timeCriticality : 3, cost : 1, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature: 
                {id : 3, bussinesValue : 10, effort : 1, timeCriticality : 3, cost : 1, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {        
                feature: 
                {id : 4, bussinesValue : 10, effort : 1, timeCriticality : 3, cost : 1, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
         },
        {
                feature: 
                {id : 5, bussinesValue : 10, effort : 1, timeCriticality : 3, cost : 1, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 6, bussinesValue : 10, effort : 1, timeCriticality : 3, cost : 1, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 7, bussinesValue : 10, effort : 1, timeCriticality : 3, cost : 1, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 8, bussinesValue : 10, effort : 1, timeCriticality : 3, cost : 1, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        }]
        const result = algorithmService.getOptimalReleasePlan(configFile);

 
        it("when all the vaues are the same, sorted by the original order", () => {
            
            expect(result.featureList[0].id).toEqual(1);
            expect(result.featureList[1].id).toEqual(2);
            expect(result.featureList[2].id).toEqual(3);
            expect(result.featureList[3].id).toEqual(4);
            expect(result.featureList[4].id).toEqual(5);
            expect(result.featureList[5].id).toEqual(6);
            expect(result.featureList[6].id).toEqual(7);
            expect(result.featureList[7].id).toEqual(8);
           

        });



 describe("Test getOptimalReleasePlan and take dependency and timeCriticality and all the variables into consideration", () => {
    

        algorithmService.ReleasePlan.discountValue = 50;
        algorithmService.ReleasePlan.teamCapability = 50;
        algorithmService.ReleasePlan.totalRequiredEffort = 200;
        algorithmService.ReleasePlan.sprintDuration = 2;

        algorithmService.ReleasePlan.featureList =
        [{
                feature:
                {id : 1, bussinesValue : 8, effort : 5, timeCriticality : 4, cost : 1, selected : false, dependency : "3,4", feature:"Feature Name 1", order: "1"}
        },
        {
                feature:
                {id : 2, bussinesValue : 10, effort : 1, timeCriticality : 5, cost : 2, selected : false, dependency : "5", feature:"Feature Name 1", order: "1"}
        },
        {
                feature: 
                {id : 3, bussinesValue : 5, effort : 6, timeCriticality : 2, cost : 3, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {        
                feature: 
                {id : 4, bussinesValue : 4, effort : 2, timeCriticality : 5, cost : 4, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
         },
        {
                feature: 
                {id : 5, bussinesValue : 2, effort : 8, timeCriticality : 7, cost : 5, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 6, bussinesValue : 3, effort : 9, timeCriticality : 9, cost : 6, selected : false, dependency : "1,2,3", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 7, bussinesValue : 9, effort : 4, timeCriticality : 1, cost : 7, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 8, bussinesValue : 2, effort : 3, timeCriticality : 2, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 9, bussinesValue : 8, effort : 4, timeCriticality : 4, cost : 9, selected : false, dependency : "5,6", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 10, bussinesValue : 9, effort : 9, timeCriticality : 3, cost : 10, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 11, bussinesValue : 7, effort : 5, timeCriticality : 6, cost : 11, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 12, bussinesValue : 6, effort : 9, timeCriticality : 7, cost : 12, selected : false, dependency : "4,5", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 13, bussinesValue : 3, effort : 6, timeCriticality : 9, cost : 13, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 14, bussinesValue : 4, effort : 3, timeCriticality : 3, cost : 14, selected : false, dependency : "17", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 15, bussinesValue : 9, effort : 3, timeCriticality : 6, cost : 15, selected : false, dependency : "1", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 16, bussinesValue : 5, effort : 5, timeCriticality : 8, cost : 16, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {
                feature: 
                {id : 17, bussinesValue : 3, effort : 4, timeCriticality : 10, cost : 17, selected : false, dependency : "1,4,5,6", feature:"Feature Name 3", order: "1"}
        }]


        const result = algorithmService.getOptimalReleasePlan(configFile);

 
        it("when the businessvalue are the same,timeCriticality, take dependency into consideration, sorted by the cost inversely", () => {
            // Arrange          
           // Assert
            expect(result.featureList[0].id).toEqual(7);
            expect(result.featureList[1].id).toEqual(10);
            expect(result.featureList[2].id).toEqual(11);
            expect(result.featureList[3].id).toEqual(3);
            expect(result.featureList[4].id).toEqual(16);
            expect(result.featureList[5].id).toEqual(4);
            expect(result.featureList[6].id).toEqual(1);
            expect(result.featureList[7].id).toEqual(15);
            expect(result.featureList[8].id).toEqual(13);
            expect(result.featureList[9].id).toEqual(5);
            expect(result.featureList[10].id).toEqual(2);
            expect(result.featureList[11].id).toEqual(12);
            expect(result.featureList[12].id).toEqual(6);
            expect(result.featureList[13].id).toEqual(9);
            expect(result.featureList[14].id).toEqual(17);
            expect(result.featureList[15].id).toEqual(14);
            expect(result.featureList[16].id).toEqual(8);      

        });


    });



    describe("Test calculateNPV with nomal values", () => {
    
        
        algorithmService.ReleasePlan.featureList =
        [{
                feature:
                {id : 1, bussinesValue : 8, effort : 5, timeCriticality : 6, cost : 5, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature:
                {id : 2, bussinesValue : 6, effort : 4, timeCriticality : 9, cost : 3, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature: 
                {id : 3, bussinesValue : 4, effort : 3, timeCriticality : 2, cost : 0, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {        
                feature: 
                {id : 4, bussinesValue : 3, effort : 8, timeCriticality : 6, cost : 4, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        }]

       
        algorithmService.ReleasePlan.cumulatedDiscountValue = 100;
        const result1 = algorithmService.calculateNPV(0);
        const result2 = algorithmService.calculateNPV(1);
        const result3 = algorithmService.calculateNPV(2);
        const result4 = algorithmService.calculateNPV(3);


        it("return to id with values of NPV ", () => {
        
            expect(result1).toEqual(10);
            expect(result2).toEqual(8.25);
            expect(result3).toEqual(7.5);
            expect(result4).toEqual(1.625);
            
        });

    });




    describe("Test calculateNPV when discountValue = 0", () => {
    
        


        algorithmService.ReleasePlan.featureList =
        [{
                feature:
                {id : 1, bussinesValue : 8, effort : 5, timeCriticality : 6, cost : 0, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature:
                {id : 2, bussinesValue : 6, effort : 4, timeCriticality : 9, cost : 0, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature: 
                {id : 3, bussinesValue : 4, effort : 3, timeCriticality : 2, cost : 0, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {        
                feature: 
                {id : 4, bussinesValue : 5, effort : 8, timeCriticality : 6, cost : 0, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        }]

        //salgorithmService.RequiredSprint = 3;

        algorithmService.ReleasePlan.cumulatedDiscountValue = 0;
        const result1 = algorithmService.calculateNPV(1);
        const result2 = algorithmService.calculateNPV(2);
        it("return to id with the NPV ", () => {

            expect(result1).toEqual(24);
            expect(result2).toEqual(16);
            
        });

    });



    describe("Test calculateNPV when discountValue =6", () => {
    
        
       
        algorithmService.ReleasePlan.featureList =
        [{
                feature:
                {id : 1, bussinesValue : 8, effort : 5, timeCriticality : 6, cost : 3, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature:
                {id : 2, bussinesValue : 6, effort : 4, timeCriticality : 9, cost : 5, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature: 
                {id : 3, bussinesValue : 4, effort : 3, timeCriticality : 2, cost : 6, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {        
                feature: 
                {id : 4, bussinesValue : 5, effort : 8, timeCriticality : 6, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        }]


        algorithmService.ReleasePlan.cumulatedDiscountValue = 6;
        const result1 = algorithmService.calculateNPV(0);
        const result2 = algorithmService.calculateNPV(1);
        const result3 = algorithmService.calculateNPV(2);
        const result4 = algorithmService.calculateNPV(3);

        it("return to (0 - feature.cost)", () => {
            expect(result1).toEqual(26.384095595693083);
            expect(result2).toEqual(17.038071696769816);
            expect(result3).toEqual(8.692047797846541);
            expect(result4).toEqual(10.36505974730818);
            
        });

    });


    describe("Test calculateNPV version when discountValue = 0", () => {
    
    
       
        algorithmService.ReleasePlan.featureList =
        [{
                feature:
                {id : 1, bussinesValue : 8, effort : 5, timeCriticality : 6, cost : 3, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature:
                {id : 2, bussinesValue : 6, effort : 4, timeCriticality : 9, cost : 5, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature: 
                {id : 3, bussinesValue : 10, effort : 3, timeCriticality : 2, cost : 6, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {        
                feature: 
                {id : 4, bussinesValue : 5, effort : 8, timeCriticality : 6, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        }]


        algorithmService.ReleasePlan.cumulatedDiscountValue = 0;
        const result1 = algorithmService.calculateNPV(0);
        const result2 = algorithmService.calculateNPV(1);
        const result3 = algorithmService.calculateNPV(2);
        const result4 = algorithmService.calculateNPV(3);
        it("return to (feature.businessvalue - feature.cost)", () => {
            expect(result1).toEqual(29);
            expect(result2).toEqual(19);
            expect(result3).toEqual(34);
            expect(result4).toEqual(12);
            
        });

    });


    describe("Test calculateNPV version when all the businessvalue = 0", () => {
    
       
        algorithmService.ReleasePlan.featureList =
        [{
                feature:
                {id : 1, bussinesValue : 0, effort : 5, timeCriticality : 6, cost : 3, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature:
                {id : 2, bussinesValue : 0, effort : 4, timeCriticality : 9, cost : 5, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature: 
                {id : 3, bussinesValue : 0, effort : 3, timeCriticality : 2, cost : 6, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {        
                feature: 
                {id : 4, bussinesValue : 0, effort : 8, timeCriticality : 6, cost : 8, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        }]


        algorithmService.ReleasePlan.cumulatedDiscountValue = 50;
        const result1 = algorithmService.calculateNPV(0);
        const result2 = algorithmService.calculateNPV(1);
        const result3 = algorithmService.calculateNPV(2);
        const result4 = algorithmService.calculateNPV(3);

        it("return to 0", () => {
            expect(result1).toEqual(-3);
            expect(result2).toEqual(-5);
            expect(result3).toEqual(-6);
            expect(result4).toEqual(-8);
            
        });

    });

    describe("Test calculateNPV version when all the businessvalue = 0 and cost = 0", () => {
    
                
       
        algorithmService.ReleasePlan.featureList =
        [{
                feature:
                {id : 1, bussinesValue : 0, effort : 5, timeCriticality : 6, cost : 0, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature:
                {id : 2, bussinesValue : 0, effort : 4, timeCriticality : 9, cost : 0, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature: 
                {id : 3, bussinesValue : 0, effort : 3, timeCriticality : 2, cost : 0, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {        
                feature: 
                {id : 4, bussinesValue : 0, effort : 8, timeCriticality : 6, cost : 0, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        }]


        algorithmService.ReleasePlan.cumulatedDiscountValue = 50;
        const result1 = algorithmService.calculateNPV(0);
        const result2 = algorithmService.calculateNPV(1);
        const result3 = algorithmService.calculateNPV(2);
        const result4 = algorithmService.calculateNPV(3);

        it("return to 0", () => {

            expect(result1).toEqual(0);
            expect(result2).toEqual(0);
            expect(result3).toEqual(0);
            expect(result4).toEqual(0);
            
        });

    });


    describe("Test checkDependence", () => {
    

        algorithmService.ReleasePlan.featureList =
        [{
                feature:
                {id : 1, bussinesValue : 8, effort : 5, timeCriticality : 6, cost : 5, selected : false, dependency : "3,4", feature:"Feature Name 1", order: "1"}
        },
        {
                feature:
                {id : 2, bussinesValue : 6, effort : 4, timeCriticality : 9, cost : 3, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature: 
                {id : 3, bussinesValue : 4, effort : 3, timeCriticality : 2, cost : 0, selected : false, dependency : "4", feature:"Feature Name 3", order: "1"}
        },
        {
                feature:
                {id : 4, bussinesValue : 6, effort : 4, timeCriticality : 9, cost : 3, selected : true, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature:
                {id : 5, bussinesValue : 6, effort : 4, timeCriticality : 9, cost : 3, selected : false, dependency : "6", feature:"Feature Name 1", order: "1"}
        },
        {
                feature:
                {id : 6, bussinesValue : 6, effort : 4, timeCriticality : 9, cost : 3, selected : true, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {        
                feature: 
                {id : 7, bussinesValue : 3, effort : 8, timeCriticality : 6, cost : 4, selected : false, dependency : "1,2,5", feature:"Feature Name 3", order: "1"}
        }]


        it("return false ", () => {
            const result = algorithmService.checkDependence(0);
            expect(result).toEqual(false);
                  
        });

        it("return false ", () => {
            const result = algorithmService.checkDependence(2);
            expect(result).toEqual(true);
                  
        });

        it("return true", () => {
            const result = algorithmService.checkDependence(4);
            expect(result).toEqual(true);
                  
        });
        it("return true", () => {
            const result = algorithmService.checkDependence(6);
            expect(result).toEqual(false);
                  
        });

    });


    describe("Test checkDependence when two features depend on each other", () => {
    
        
        let algorithmService = new IFMReleasePlanningAlgorithm();

        algorithmService.ReleasePlan.featureList =
        [{
                feature:
                {id : 1, bussinesValue : 8, effort : 5, timeCriticality : 6, cost : 5, selected : true, dependency : "2", feature:"Feature Name 1", order: "1"}
        },
        {
                feature:
                {id : 2, bussinesValue : 6, effort : 4, timeCriticality : 9, cost : 3, selected : false, dependency : "1", feature:"Feature Name 1", order: "1"}
        },
        {
                feature: 
                {id : 3, bussinesValue : 4, effort : 3, timeCriticality : 2, cost : 0, selected : false, dependency : "4", feature:"Feature Name 3", order: "1"}
        },
        {        
                feature: 
                {id : 4, bussinesValue : 3, effort : 8, timeCriticality : 6, cost : 4, selected : false, dependency : "3", feature:"Feature Name 3", order: "1"}
        }]

    
        it("return false ", () => {
            const result = algorithmService.checkDependence(2);
            expect(result).toEqual(false);
                  
        });

        it("return false ", () => {
            const result = algorithmService.checkDependence(3);
            expect(result).toEqual(false);
                  
        });

        it("return true ", () => {
            const result = algorithmService.checkDependence(1);
            expect(result).toEqual(true);
                  
        });

        it("return false ", () => {
            const result = algorithmService.checkDependence(0);
            expect(result).toEqual(false);
                  
        });

    });


    describe("Test checkDependence when the feature depend on two others whose selected is true and the other is flase", () => {
    
        
        let algorithmService = new IFMReleasePlanningAlgorithm();
        

        algorithmService.ReleasePlan.featureList =
        [{
                feature:
                {id : 1, bussinesValue : 8, effort : 5, timeCriticality : 6, cost : 5, selected : false, dependency : "3,4", feature:"Feature Name 1", order: "1"}
        },
        {
                feature:
                {id : 2, bussinesValue : 6, effort : 4, timeCriticality : 9, cost : 3, selected : false, dependency : "0", feature:"Feature Name 1", order: "1"}
        },
        {
                feature: 
                {id : 3, bussinesValue : 4, effort : 3, timeCriticality : 2, cost : 0, selected : true, dependency : "0", feature:"Feature Name 3", order: "1"}
        },
        {        
                feature: 
                {id : 4, bussinesValue : 3, effort : 8, timeCriticality : 6, cost : 4, selected : false, dependency : "0", feature:"Feature Name 3", order: "1"}
        }]

        it("return false ", () => {
            const result = algorithmService.checkDependence(0);
            expect(result).toEqual(false);
                  
        });

    });


});
