"use strict";
var Random_1 = require("./Random");
var MonteCarloSimulation = (function () {
    function MonteCarloSimulation(config, distribution) {
        this.config = config;
        if (this.config.populationSize == 0) {
            this.config.populationSize == 10000;
        }
        this.sum = 0;
        if (distribution.name === "triangular") {
            for (var i = 0; i < this.config.populationSize; i++) {
                var rand = new Random_1.default(Math.random() * 10);
                var temp = rand.triangular(distribution.value.lowerBound, distribution.value.upperBound, distribution.value.mode);
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
