"use strict";
var random_1 = require("./random");
var MonteCarloSimulation = (function () {
    function MonteCarloSimulation(config, distribution) {
        this.config = config;
        if (this.config.populationSize == 0) {
            this.config.populationSize == 10000;
        }
        this.sum = 0;
        if (distribution.name === "triangular") {
            for (var i = 0; i < this.config.populationSize; i++) {
                var rand = new random_1.default(Math.random() * 10);
                var temp = rand.triangular(distribution.value.lowerBound, distribution.value.mode, distribution.value.upperBound);
                if (this.config.debug == true) {
                    console.log(temp);
                }
                this.sum = this.sum + temp;
            }
        }
    }
    MonteCarloSimulation.prototype.getExpectedValue = function () {
        return this.sum / this.config.populationSize;
    };
    return MonteCarloSimulation;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MonteCarloSimulation;
var config = {
    populationSize: 30000,
    debug: false
};
var distribution = {
    name: "triangular",
    value: {
        lowerBound: 10,
        upperBound: 100,
        mode: 12
    }
};
var test = new MonteCarloSimulation(config, distribution);
console.log("Expected Value: " + test.getExpectedValue());
