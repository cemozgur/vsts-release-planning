/**
 * @author Yijia Bei <yijiabei94@gmail.com>
 * @author Tingting Gao <uczltg1@ucl.ac.uk>
 * @author Yunan Wang <wangyunan941113@gmail.com>
 * @version 1.0
 * @license MIT License Copyright (c) 2017 OptRel team
 * 
 * @description Test Cases for NSGA Algorithm
 */
import NSGA2ReleasePlanningAlgorithm from "../../src/logic/entities/NSGA2ReleasePlanningAlgorithm";

//1
describe("Test combinePopulations", () => {

  let algorithmService = new NSGA2ReleasePlanningAlgorithm();
  let population = [1, 2, 3, 4];
  let secondPopulation = [5, 6, 7, 8]

  const result = algorithmService.combinePopulations(population, secondPopulation);

  it("test the length of the the result", () => {

    expect(result.length).toEqual(8);

  });

});

//2
describe("Test combinePopulations", () => {

  let algorithmService = new NSGA2ReleasePlanningAlgorithm();
  let population = [2, 4, 5, 6];
  let secondPopulation = [1, 3, 0, 9]

  const result = algorithmService.combinePopulations(population, secondPopulation);


  it("test the content of result", () => {

    expect(result).toEqual([2, 4, 5, 6, 1, 3, 0, 9]);

  });

});

//3
describe("Test GA to make sure every feature is selected and defined", () => {

  let algorithmService = new NSGA2ReleasePlanningAlgorithm();

  let configFile = {
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


  it("test", () => {

    algorithmService.featureList = [
      {
        featureNumber: 1,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 2,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 3,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },

      {
        featureNumber: 4,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },

      {
        featureNumber: 5,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 6,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 7,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 8,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 9,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 10,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 11,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 12,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },



    ];


    const result = algorithmService.getOptimalReleasePlan(configFile);

    it("test the content of result", () => {

      expect(result.featureList[0]).toBeDefined();
      expect(result.featureList[1]).toBeDefined();
      expect(result.featureList[2]).toBeDefined();
      expect(result.featureList[3]).toBeDefined();
      expect(result.featureList[4]).toBeDefined();
      expect(result.featureList[5]).toBeDefined();
      expect(result.featureList[6]).toBeDefined();
      expect(result.featureList[7]).toBeDefined();
      expect(result.featureList[8]).toBeDefined();
      expect(result.featureList[9]).toBeDefined();
      expect(result.featureList[10]).toBeDefined();
      expect(result.featureList[11]).toBeDefined();
      //expect(result.featureList[12]).toBeUndefined();   
    });

  });
});

//4
describe("Test GA to make sure every feature is selected and defined", () => {

  let algorithmService = new NSGA2ReleasePlanningAlgorithm();

  let configFile = {
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


  it("test", () => {

    algorithmService.featureList = [
      {
        featureNumber: 1,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 2,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 3,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },

      {
        featureNumber: 4,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },

      {
        featureNumber: 5,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 6,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 7,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 8,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 9,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 10,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 11,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 12,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },

    ];


    const result = algorithmService.getOptimalReleasePlan(configFile);

    it("test totalRequiredEffort", () => {
      expect(result.totalRequiredEffort).toEqual(240);

    });

  });
});

//5
describe("Test GA dependency", () => {

  let algorithmService = new NSGA2ReleasePlanningAlgorithm();

  let configFile = {
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


  it("test", () => {

    algorithmService.featureList = [
      {
        featureNumber: 1,
        workItemId: 1,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 10,
        effort: 20,
        cost: 10,
        risk: 4,
        timeCriticality: 4,
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 2,
        workItemId: 2,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 20,
        effort: 20,
        cost: 20,
        risk: 3,
        timeCriticality: 4,
        dependsOn: "1",
        dependsOnWorkItemId: "1"
      },
      {
        featureNumber: 3,
        workItemId: 3,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 30,
        effort: 20,
        cost: 30,
        risk: 2,
        timeCriticality: 4,
        dependsOn: "2",
        dependsOnWorkItemId: "2"
      },

      {
        featureNumber: 4,
        workItemId: 4,
        feature: "Hili 2",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 40,
        effort: 20,
        cost: 40,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "3",
        dependsOnWorkItemId: "3"
      },
    ];


    const result = algorithmService.getOptimalReleasePlan(configFile);

    it("test the order", () => {
      console.log(result.featureList);
      expect(result.featureList[0].featureNumber.toEqual(1));
      expect(result.featureList[1].featureNumber.toEqual(2));
      expect(result.featureList[2].featureNumber.toEqual(3));
      expect(result.featureList[3].featureNumber.toEqual(4));
    });

  });
});
//6
describe("Test GA dependency and every feature denpends on f1 ", () => {

  let algorithmService = new NSGA2ReleasePlanningAlgorithm();

  let configFile = {
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


  it("test", () => {

    algorithmService.featureList = [
      {
        featureNumber: 1,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 2,
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
        dependsOn: "1",
        dependsOnWorkItemId: "1"
      },
      {
        featureNumber: 3,
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
        dependsOn: "1",
        dependsOnWorkItemId: "1"
      },

      {
        featureNumber: 4,
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
        dependsOn: "1",
        dependsOnWorkItemId: "1"
      },
    ];


    const result = algorithmService.getOptimalReleasePlan(configFile);

    it("test the dependency", () => {
      console.log(result.featureList);
      expect(result.featureList[0].featureNumber.toEqual(1));

    });

  });
});


//7
describe("Test GA dependency and every feature denpends on f3 ", () => {

  let algorithmService = new NSGA2ReleasePlanningAlgorithm();

  let configFile = {
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


  it("test", () => {

    algorithmService.featureList = [
      {
        featureNumber: 1,
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
        dependsOn: "3",
        dependsOnWorkItemId: "3"
      },
      {
        featureNumber: 2,
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
        dependsOn: "3",
        dependsOnWorkItemId: "3"
      },
      {
        featureNumber: 3,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },

      {
        featureNumber: 4,
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
        dependsOn: "3",
        dependsOnWorkItemId: "3"
      },
    ];


    const result = algorithmService.getOptimalReleasePlan(configFile);

    it("test the dependency", () => {
      console.log(result.featureList);
      expect(result.featureList[0].featureNumber.toEqual(3));

    });

  });

});

//8
describe("Test GA to check the dependency of the algorithm", () => {

  let algorithmService = new NSGA2ReleasePlanningAlgorithm();

  let configFile = {
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


  it("test", () => {

    algorithmService.featureList = [
      {
        featureNumber: 1,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 2,
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
        dependsOn: "1",
        dependsOnWorkItemId: "1"
      },
      {
        featureNumber: 3,
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
        dependsOn: "2",
        dependsOnWorkItemId: "2"
      },

      {
        featureNumber: 4,
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
        dependsOn: "3",
        dependsOnWorkItemId: "3"
      },
      {
        featureNumber: 5,
        workItemId: 5,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 10,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 6,
        workItemId: 6,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 20,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 5,
        dependsOn: "5",
        dependsOnWorkItemId: "5"
      },
      {
        featureNumber: 7,
        workItemId: 7,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 30,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "6",
        dependsOnWorkItemId: "6"
      },

      {
        featureNumber: 8,
        workItemId: 8,
        feature: "Hili 2",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 40,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "7",
        dependsOnWorkItemId: "7"
      },
    ];


    const result = algorithmService.getOptimalReleasePlan(configFile);

    it("test the dependency", () => {
      console.log(result.featureList);
      expect(result.featureList[0].featureNumber.toEqual(1));
      expect(result.featureList[1].featureNumber.toEqual(2));
      expect(result.featureList[2].featureNumber.toEqual(3));
      expect(result.featureList[3].featureNumber.toEqual(4));
      expect(result.featureList[4].featureNumber.toEqual(5));
      expect(result.featureList[5].featureNumber.toEqual(6));
      expect(result.featureList[6].featureNumber.toEqual(7));
      expect(result.featureList[7].featureNumber.toEqual(8));
    });

  });
});

//9
describe("Test GA to check the dependency of the algorithm", () => {

  let algorithmService = new NSGA2ReleasePlanningAlgorithm();

  let configFile = {
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


  it("test", () => {

    algorithmService.featureList = [
      {
        featureNumber: 1,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 2,
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
        dependsOn: "1",
        dependsOnWorkItemId: "1"
      },
      {
        featureNumber: 3,
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
        dependsOn: "2",
        dependsOnWorkItemId: "2"
      },

      {
        featureNumber: 4,
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
        dependsOn: "3",
        dependsOnWorkItemId: "3"
      },
      {
        featureNumber: 5,
        workItemId: 5,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 10,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "4",
        dependsOnWorkItemId: "4"
      },
      {
        featureNumber: 6,
        workItemId: 6,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 20,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 5,
        dependsOn: "5",
        dependsOnWorkItemId: "5"
      },
      {
        featureNumber: 7,
        workItemId: 7,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 30,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "6",
        dependsOnWorkItemId: "6"
      },

      {
        featureNumber: 8,
        workItemId: 8,
        feature: "Hili 2",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 40,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "7",
        dependsOnWorkItemId: "7"
      },

      {
        featureNumber: 9,
        workItemId: 9,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 10,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "8",
        dependsOnWorkItemId: "8"
      },
      {
        featureNumber: 10,
        workItemId: 10,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 20,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "9",
        dependsOnWorkItemId: "9"
      },
      {
        featureNumber: 11,
        workItemId: 11,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 30,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "10",
        dependsOnWorkItemId: "10"
      },

      {
        featureNumber: 12,
        workItemId: 12,
        feature: "Hili 2",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 40,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "11",
        dependsOnWorkItemId: "11"
      },
      {
        featureNumber: 13,
        workItemId: 13,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 10,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "12",
        dependsOnWorkItemId: "12"
      },
      {
        featureNumber: 14,
        workItemId: 14,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 20,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 5,
        dependsOn: "13",
        dependsOnWorkItemId: "13"
      },
      {
        featureNumber: 15,
        workItemId: 15,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 30,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "14",
        dependsOnWorkItemId: "14"
      },

      {
        featureNumber: 16,
        workItemId: 16,
        feature: "Hili 2",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 40,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "15",
        dependsOnWorkItemId: "15"
      },
    ];


    const result = algorithmService.getOptimalReleasePlan(configFile);

    it("test the dependency", () => {
      console.log(result.featureList);
      expect(result.featureList[0].featureNumber.toEqual(1));
      expect(result.featureList[1].featureNumber.toEqual(2));
      expect(result.featureList[2].featureNumber.toEqual(3));
      expect(result.featureList[3].featureNumber.toEqual(4));
      expect(result.featureList[4].featureNumber.toEqual(5));
      expect(result.featureList[5].featureNumber.toEqual(6));
      expect(result.featureList[6].featureNumber.toEqual(7));
      expect(result.featureList[7].featureNumber.toEqual(8));
      expect(result.featureList[8].featureNumber.toEqual(9));
      expect(result.featureList[9].featureNumber.toEqual(10));
      expect(result.featureList[10].featureNumber.toEqual(11));
      expect(result.featureList[11].featureNumber.toEqual(12));
      expect(result.featureList[12].featureNumber.toEqual(13));
      expect(result.featureList[13].featureNumber.toEqual(14));
      expect(result.featureList[14].featureNumber.toEqual(15));
      expect(result.featureList[15].featureNumber.toEqual(16));
    });

  });
});

//10
describe("Test GA dependency when two features depend on each other, it will throw error ", () => {

  let algorithmService = new NSGA2ReleasePlanningAlgorithm();

  let configFile = {
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


  it("test", () => {

    algorithmService.featureList = [
      {
        featureNumber: 1,
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
        dependsOn: "2",
        dependsOnWorkItemId: "2"
      },
      {
        featureNumber: 2,
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
        dependsOn: "1",
        dependsOnWorkItemId: "1"
      },
      {
        featureNumber: 3,
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
        dependsOn: "1",
        dependsOnWorkItemId: "1"
      },

      {
        featureNumber: 4,
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
        dependsOn: "1",
        dependsOnWorkItemId: "1"
      },
    ];


    it("test the error throw", () => {

      expect(algorithmService.getOptimalReleasePlan(configFile)).toThrow();;

    });

  });
});

//11
describe("Test features'cost", () => {

  let algorithmService = new NSGA2ReleasePlanningAlgorithm();

  let configFile = {
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


  it("test", () => {

    algorithmService.featureList = [
      {
        featureNumber: 1,
        workItemId: 1,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 10,
        effort: 20,
        cost: 10,
        risk: 4,
        timeCriticality: 4,
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 2,
        workItemId: 2,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 20,
        effort: 20,
        cost: 20,
        risk: 3,
        timeCriticality: 4,
        dependsOn: "1",
        dependsOnWorkItemId: "1"
      },
      {
        featureNumber: 3,
        workItemId: 3,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 30,
        effort: 20,
        cost: 30,
        risk: 2,
        timeCriticality: 4,
        dependsOn: "2",
        dependsOnWorkItemId: "2"
      },

      {
        featureNumber: 4,
        workItemId: 4,
        feature: "Hili 2",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 40,
        effort: 20,
        cost: 40,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "3",
        dependsOnWorkItemId: "3"
      },
    ];


    const result = algorithmService.getOptimalReleasePlan(configFile);


    it("test the cost", () => {
      console.log(result.featureList);
      expect(result.featureList[0].cost.toEqual(10));
      expect(result.featureList[1].cost.toEqual(20));
      expect(result.featureList[2].cost.toEqual(30));
      expect(result.featureList[3].cost.toEqual(40));
    });
  });
});

//12
describe("Test features'selected ", () => {

  let algorithmService = new NSGA2ReleasePlanningAlgorithm();

  let configFile = {
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


  it("test", () => {

    algorithmService.featureList = [
      {
        featureNumber: 1,
        workItemId: 1,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 10,
        effort: 20,
        cost: 10,
        risk: 4,
        timeCriticality: 4,
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 2,
        workItemId: 2,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 20,
        effort: 20,
        cost: 20,
        risk: 3,
        timeCriticality: 4,
        dependsOn: "1",
        dependsOnWorkItemId: "1"
      },
      {
        featureNumber: 3,
        workItemId: 3,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 30,
        effort: 20,
        cost: 30,
        risk: 2,
        timeCriticality: 4,
        dependsOn: "2",
        dependsOnWorkItemId: "2"
      },

      {
        featureNumber: 4,
        workItemId: 4,
        feature: "Hili 2",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 40,
        effort: 20,
        cost: 40,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "3",
        dependsOnWorkItemId: "3"
      },
    ];


    const result = algorithmService.getOptimalReleasePlan(configFile);


    it("test the selected ", () => {
      console.log(result.featureList);
      expect(result.featureList[0].selected.toEqual(true));
      expect(result.featureList[1].selected.toEqual(true));
      expect(result.featureList[2].selected.toEqual(true));
      expect(result.featureList[3].selected.toEqual(true));
    });
  });
});

//13
describe("Test GA dependency", () => {

  let algorithmService = new NSGA2ReleasePlanningAlgorithm();

  let configFile = {
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


  it("test risk", () => {

    algorithmService.featureList = [
      {
        featureNumber: 1,
        workItemId: 1,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 10,
        effort: 20,
        cost: 10,
        risk: 4,
        timeCriticality: 4,
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 2,
        workItemId: 2,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 20,
        effort: 20,
        cost: 20,
        risk: 3,
        timeCriticality: 4,
        dependsOn: "1",
        dependsOnWorkItemId: "1"
      },
      {
        featureNumber: 3,
        workItemId: 3,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 30,
        effort: 20,
        cost: 30,
        risk: 2,
        timeCriticality: 4,
        dependsOn: "2",
        dependsOnWorkItemId: "2"
      },

      {
        featureNumber: 4,
        workItemId: 4,
        feature: "Hili 2",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 40,
        effort: 20,
        cost: 40,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "3",
        dependsOnWorkItemId: "3"
      },
    ];


    const result = algorithmService.getOptimalReleasePlan(configFile);


    it("test the risk", () => {

      expect(result.featureList[0].risk.toEqual(4));
      expect(result.featureList[1].risk.toEqual(3));
      expect(result.featureList[2].risk.toEqual(2));
      expect(result.featureList[3].risk.toEqual(1));
    });
  });
});


//14
describe("Test checkIfUsed", () => {

  let algorithmService = new NSGA2ReleasePlanningAlgorithm();
  let featureNumber = "11";
  let usedFeatures = "11";

  const result = algorithmService.checkIfUsed(featureNumber, usedFeatures);


  it("return true ", () => {

    expect(result).toBe(true);

  });

});

//15

describe("Test checkIfUsed", () => {

  let algorithmService = new NSGA2ReleasePlanningAlgorithm();
  let featureNumber = "11";
  let usedFeatures = "12，14，15，1，9";

  const result = algorithmService.checkIfUsed(featureNumber, usedFeatures);


  it("return false", () => {

    expect(result).toBe(false);

  });

});

//16

describe("Test checkIfUsed", () => {

  let algorithmService = new NSGA2ReleasePlanningAlgorithm();
  let featureNumber = "1";
  let usedFeatures = "1,2,3,4,5";

  const result = algorithmService.checkIfUsed(featureNumber, usedFeatures);


  it("return true", () => {

    expect(result).toBe(true);

  });

});

//17
describe("Test getObjectiveValueRange", () => {

  let j = 0;
  let algorithmService = new NSGA2ReleasePlanningAlgorithm();
  const result = algorithmService.getObjectiveValueRange(j);


  it("return true", () => {

    expect(result).toBe(99999999.0);

  });

});

//18
describe("Test getObjectiveValueRange", () => {

  let j = 1;
  let algorithmService = new NSGA2ReleasePlanningAlgorithm();
  const result = algorithmService.getObjectiveValueRange(j);


  it("return true", () => {

    expect(result).toBe(5.0);

  });

});

//19
describe("Test GA to check the dependency of the algorithm", () => {

  let algorithmService = new NSGA2ReleasePlanningAlgorithm();

  let configFile = {
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


  it("test", () => {

    algorithmService.featureList = [
      {
        featureNumber: 1,
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
        dependsOn: "16",
        dependsOnWorkItemId: "16"
      },
      {
        featureNumber: 2,
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
        dependsOn: "16",
        dependsOnWorkItemId: "16"
      },
      {
        featureNumber: 3,
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
        dependsOn: "16",
        dependsOnWorkItemId: "16"
      },

      {
        featureNumber: 4,
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
        dependsOn: "16",
        dependsOnWorkItemId: "16"
      },
      {
        featureNumber: 5,
        workItemId: 5,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 10,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "16",
        dependsOnWorkItemId: "16"
      },
      {
        featureNumber: 6,
        workItemId: 6,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 20,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 5,
        dependsOn: "16",
        dependsOnWorkItemId: "16"
      },
      {
        featureNumber: 7,
        workItemId: 7,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 30,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "16",
        dependsOnWorkItemId: "16"
      },

      {
        featureNumber: 8,
        workItemId: 8,
        feature: "Hili 2",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 40,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "16",
        dependsOnWorkItemId: "16"
      },

      {
        featureNumber: 9,
        workItemId: 9,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 10,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "16",
        dependsOnWorkItemId: "16"
      },
      {
        featureNumber: 10,
        workItemId: 10,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 20,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "16",
        dependsOnWorkItemId: "16"
      },
      {
        featureNumber: 11,
        workItemId: 11,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 30,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "16",
        dependsOnWorkItemId: "16"
      },

      {
        featureNumber: 12,
        workItemId: 12,
        feature: "Hili 2",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 40,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "16",
        dependsOnWorkItemId: "16"
      },
      {
        featureNumber: 13,
        workItemId: 13,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 10,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "16",
        dependsOnWorkItemId: "16"
      },
      {
        featureNumber: 14,
        workItemId: 14,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 20,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 5,
        dependsOn: "16",
        dependsOnWorkItemId: "16"
      },
      {
        featureNumber: 15,
        workItemId: 15,
        feature: "Hili",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 30,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "16",
        dependsOnWorkItemId: "16"
      },

      {
        featureNumber: 16,
        workItemId: 16,
        feature: "Hili 2",
        state: "Active",
        sprint: "0",
        selected: false,
        businessValue: 40,
        effort: 20,
        cost: 10,
        risk: 1,
        timeCriticality: 4,
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
    ];


    const result = algorithmService.getOptimalReleasePlan(configFile);

    it("test the dependency", () => {
      expect(result.featureList[0].featureNumber.toEqual(16));
    });
  });
});