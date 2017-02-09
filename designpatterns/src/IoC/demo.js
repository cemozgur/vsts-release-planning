"use strict";
var inversify_config_1 = require("./inversify.config");
var types_1 = require("./types");
var algorithm = inversify_config_1.ConcreteContainer.get(types_1.default.IAlgorithm);
console.log(algorithm.getAlgorithmType());
