"use strict";
var inversify_1 = require("inversify");
var types_1 = require("./types");
var IFMAlgorithm_1 = require("./Concrete/IFMAlgorithm");
var ConcreteContainer = new inversify_1.Container();
exports.ConcreteContainer = ConcreteContainer;
ConcreteContainer.bind(types_1.default.IAlgorithm).to(IFMAlgorithm_1.IFMAlgorithm);
