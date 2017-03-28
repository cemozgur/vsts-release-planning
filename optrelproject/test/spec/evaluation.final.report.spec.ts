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
import NSGA2ReleasePlanningAlgorithm from "../../src/logic/entities/NSGA2ReleasePlanningAlgorithm";


describe("Evaluation for the final report Optimus Music Project", () => {
  var result;
  var originalTimeout;
  var algorithmService;
  var configFile;
  var start;
  var end;

  beforeAll(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    algorithmService = new NSGA2ReleasePlanningAlgorithm();
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

    algorithmService.featureList = [
      {
        featureNumber: 1,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 2,
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
        dependsOn: "1",
        dependsOnWorkItemId: "1"
      },
      {
        featureNumber: 3,
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
        dependsOn: "1",
        dependsOnWorkItemId: "1"
      },

      {
        featureNumber: 4,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },

      {
        featureNumber: 5,
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
        dependsOn: "4",
        dependsOnWorkItemId: "4"
      },
      {
        featureNumber: 6,
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
        dependsOn: "2",
        dependsOnWorkItemId: "2"
      },
      {
        featureNumber: 7,
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
        dependsOn: "4",
        dependsOnWorkItemId: "4"
      },
      {
        featureNumber: 8,
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
        dependsOn: "4",
        dependsOnWorkItemId: "4"
      },
      {
        featureNumber: 9,
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
        dependsOn: "4",
        dependsOnWorkItemId: "4"
      },
      {
        featureNumber: 10,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 11,
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
        dependsOn: "4",
        dependsOnWorkItemId: "4"
      },
      {
        featureNumber: 12,
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
        dependsOn: "",
        dependsOnWorkItemId: ""
      },
      {
        featureNumber: 13,
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
        dependsOn: "5",
        dependsOnWorkItemId: "5"
      },
      {
        featureNumber: 14,
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
        dependsOn: "2",
        dependsOnWorkItemId: "2"
      }
    ];

    start = Date.now();
    result = algorithmService.getOptimalReleasePlan(configFile);
    end = Date.now();
  });

  it("Verify the result is greater or equals than 0 and lesser or equals to 3", () => {
    expect(result.length).toBeGreaterThan(0);
  });

  it("Validate the generation time is less than a minute (60 000 milliseconds) for 14 features ", () => {
    expect(end - start).toBeLessThan(60000);
  });

  it("Validate correct dependencies of the alternative release plans.", () => {
    var valid = true;
    result.map((releasePlan) => {
      var featureDependency = [];
      releasePlan.featureList.map((feature) => {
        if (feature.dependsOn) {
          var dependencies = feature.dependsOn.split(',');
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
        featureDependency.push(feature.featureNumber);
      });
    });
    expect(valid).toBeTruthy();
  });

  afterAll(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

});
