/**
 * @author Yijia Bei <yijiabei94@gmail.com>
 * @author Tingting Gao <uczltg1@ucl.ac.uk>
 * @author Yunan Wang <wangyunan941113@gmail.com>
 * @version 1.0
 * @license MIT License Copyright (c) 2017 OptRel team
 * 
 * @description Test Cases for MonteCarlo
 */

import MonteCarloSimulation from "../../src/logic/entities/MonteCarloSimulation";

describe("Evaluation for the distribution on MonteCarlo", () => {
    var monteCarloConfig;
    beforeAll(function () {
        monteCarloConfig = {
            populationSize: 10000,
            debug: false
        };
    });

    it("The value between the range 5 and 60", () => {
        var min = 5;
        var expected = 20;
        var max = 60;
        var result = new MonteCarloSimulation(monteCarloConfig, { name: "triangular", value: { lowerBound: min, mode: expected, upperBound: max } }).getExpectedValue()

        expect(result).not.toBeLessThan(5);
        expect(result).not.toBeGreaterThan(60);
    });

    it("The value between the range 2 and 1000", () => {
        var min = 2;
        var expected = 20;
        var max = 1000;
        var result = new MonteCarloSimulation(monteCarloConfig, { name: "triangular", value: { lowerBound: min, mode: expected, upperBound: max } }).getExpectedValue()

        expect(result).not.toBeLessThan(5);
        expect(result).not.toBeGreaterThan(1000);
    });

    it("The time generation should be less than 10 seconds", () => {
        var min = 5;
        var expected = 20;
        var max = 60;
        var start = Date.now();
        var result = new MonteCarloSimulation(monteCarloConfig, { name: "triangular", value: { lowerBound: min, mode: expected, upperBound: max } }).getExpectedValue()
        var end =  Date.now();
        expect( (end-start)/1000 ).toBeLessThan(10);
    });

    afterEach(function () {

    });

});