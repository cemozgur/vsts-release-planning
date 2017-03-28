/**
 * @author Yijia Bei <yijiabei94@gmail.com>
 * @author Tingting Gao <uczltg1@ucl.ac.uk>
 * @author Yunan Wang <wangyunan941113@gmail.com>
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license MIT License Copyright (c) 2017 OptRel team
 *
 * @description Test Cases for NSGA Algorithm
 */
import IFMReleasePlanningAlgorithm from "../../src/logic/entities/IFMReleasePlanningAlgorithm";


describe("Evaluation for the final report Optimus Music Project using IFM release planning approach", () => {
  var result;
  var originalTimeout;
  var algorithmService;
  var configFile;
  var start;
  var end;

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
    };

    algorithmService.ReleasePlan.featureList = [
      {
        feature: {
          id: 1,
          workItemId: 1,
          feature: "register",
          state: "Active",
          sprint: "0",
          selected: false,
          businessValue: 1700,
          effort: 500,
          cost: 170,
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
          feature: "login",
          state: "Active",
          sprint: "0",
          selected: false,
          businessValue: 140,
          effort: 105,
          cost: 170,
          risk: 1,
          timeCriticality: 4,
          dependency: "1",
          dependencyWorkItemId: "1"
        }
      },
      {
        feature: {
          id: 3,
          workItemId: 3,
          feature: "password",
          state: "Active",
          sprint: "0",
          selected: false,
          businessValue: 16500,
          effort: 6500,
          cost: 200,
          risk: 1,
          timeCriticality: 4,
          dependency: "1",
          dependencyWorkItemId: "1"
        }
      },

      {
        feature: {
          id: 4,
          workItemId: 4,
          feature: "searchsong",
          state: "Active",
          sprint: "0",
          selected: false,
          businessValue: 21000,
          effort: 12500,
          cost: 150,
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
          feature: "collect",
          state: "Active",
          sprint: "0",
          selected: false,
          businessValue: 14000,
          effort: 4000,
          cost: 88,
          risk: 1,
          timeCriticality: 4,
          dependency: "4",
          dependencyWorkItemId: "4"
        }
      },
      {
        feature: {
          id: 6,
          workItemId: 6,
          feature: "recentsong",
          state: "Active",
          sprint: "0",
          selected: false,
          businessValue: 1650,
          effort: 950,
          cost: 90,
          risk: 1,
          timeCriticality: 4,
          dependency: "2",
          dependencyWorkItemId: "2"
        }
      },
      {
        feature: {
          id: 7,
          workItemId: 7,
          feature: "download",
          state: "Active",
          sprint: "0",
          selected: false,
          businessValue: 8600,
          effort: 4200,
          cost: 180,
          risk: 1,
          timeCriticality: 4,
          dependency: "4",
          dependencyWorkItemId: "4"
        }
      },
      {
        feature: {
          id: 8,
          workItemId: 8,
          feature: "listen",
          state: "Active",
          sprint: "0",
          selected: false,
          businessValue: 1500,
          effort: 1000,
          cost: 80,
          risk: 1,
          timeCriticality: 4,
          dependency: "4",
          dependencyWorkItemId: "4"
        }
      },
      {
        feature: {
          id: 9,
          workItemId: 9,
          feature: "share",
          state: "Active",
          sprint: "0",
          selected: false,
          businessValue: 3000,
          effort: 1200,
          cost: 80,
          risk: 1,
          timeCriticality: 4,
          dependency: "4",
          dependencyWorkItemId: "4"
        }
      },
      {
        feature: {
          id: 10,
          workItemId: 10,
          feature: "adjust",
          state: "Active",
          sprint: "0",
          selected: false,
          businessValue: 6000,
          effort: 1500,
          cost: 85,
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
          feature: "match",
          state: "Active",
          sprint: "0",
          selected: false,
          businessValue: 659,
          effort: 460,
          cost: 90,
          risk: 1,
          timeCriticality: 4,
          dependency: "4",
          dependencyWorkItemId: "4"
        }
      },
      {
        feature: {
          id: 12,
          workItemId: 12,
          feature: "recommand",
          state: "Active",
          sprint: "0",
          selected: false,
          businessValue: 5000,
          effort: 2500,
          cost: 80,
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
          feature: "classification",
          state: "Active",
          sprint: "0",
          selected: false,
          businessValue: 545,
          effort: 353,
          cost: 85,
          risk: 1,
          timeCriticality: 4,
          dependency: "5",
          dependencyWorkItemId: "5"
        }
      },
      {
        feature: {
          id: 14,
          workItemId: 14,
          feature: "remove",
          state: "Active",
          sprint: "0",
          selected: false,
          businessValue: 660,
          effort: 440,
          cost: 85,
          risk: 1,
          timeCriticality: 4,
          dependency: "2",
          dependencyWorkItemId: "2"
        }
      }
    ];

    start = Date.now();
    result = algorithmService.getOptimalReleasePlan(configFile);
    end = Date.now();
  });

  it("Verify the result of featurelist is greater than 0 ", () => {
    expect(result).toBeDefined();
    expect(result.featureList).toBeDefined();
    expect(result.featureList.length).toBeGreaterThan(0);
  });

  it("Validate the generation time is less than a minute (60 000 milliseconds) for 14 features ", () => {
    expect(end - start).toBeLessThan(60000);
  });


  it("Validate correct dependencies of the alternative release plans.", () => {
    var valid = true;

    var featureDependency = [];

    result.featureList.map((feature) => {
      if (feature.feature.dependency) {
        var dependencies = feature.feature.dependency.split(',');
        dependencies.map((id) => {
          var find = featureDependency.filter((el) => {
            if (el == id) {
              return el;
            }
          });
          if (find.length <= 0) {
            valid = false;
          }
        });
      }
      featureDependency.push(feature.feature.id);
    });
    expect(valid).toBeTruthy();
  });

  afterAll(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});