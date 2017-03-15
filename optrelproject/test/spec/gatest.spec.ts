import NSGA2ReleasePlanningAlgorithm from "../../src/logic/entities/NSGA2ReleasePlanningAlgorithm";




describe("Test GA", () => {

  let algorithmService = new NSGA2ReleasePlanningAlgorithm();

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
  }




  algorithmService.featureList = [
    {
      featureNumber: 1,
      workItemId: 1,
      feature: "Hili",
      state: "Active",
      sprint: "0",
      selected: false,
      businessValue: 100,
      effort: 20,
      cost: 1500,
      risk: 5,
      timeCriticality: 4,
      dependsOn: "",
      dependsOnWorkItemId: ""
    },
    {
      featureNumber: 2,
      workItemId: 2,
      feature: "Hili 2",
      state: "Active",
      sprint: "0",
      selected: false,
      businessValue: 100,
      effort: 20,
      cost: 156,
      risk: 1,
      timeCriticality: 40,
      dependsOn: "",
      dependsOnWorkItemId: ""
    },
    {
      featureNumber: 3,
      workItemId: 3,
      feature: "Hili 3",
      state: "Active",
      sprint: "0",
      selected: false,
      businessValue: 100,
      effort: 20,
      cost: 1500,
      risk: 5,
      timeCriticality: 4,
      dependsOn: "",
      dependsOnWorkItemId: ""
    },

  ];


  const result = algorithmService.getOptimalReleasePlan(configFile);

  it("test", () => {

    expect(result.featureList[0].featureNumber).toEqual(2);


  });

});
