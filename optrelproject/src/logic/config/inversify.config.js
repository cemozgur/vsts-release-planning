"use strict";
var inversify_1 = require("inversify");
var identifiers_1 = require("../constants/identifiers");
var algorithmType_1 = require("../constants/algorithmType");
var GAReleasePlanningAlgorithm_1 = require("../entities/GAReleasePlanningAlgorithm");
var IFMReleasePlanningAlgorithm_1 = require("../entities/IFMReleasePlanningAlgorithm");
var FeatureServiceImpl_1 = require("../entities/FeatureServiceImpl");
/**
 * This is the only place in which there is some coupling.
 * In the rest of your application your classes should be free of references to other classes.
 */
var container = new inversify_1.Container();
container.bind(identifiers_1.default.IReleasePlanningAlgorithm).to(GAReleasePlanningAlgorithm_1.default).whenTargetNamed(algorithmType_1.default.GA);
container.bind(identifiers_1.default.IReleasePlanningAlgorithm).to(IFMReleasePlanningAlgorithm_1.default).whenTargetNamed(algorithmType_1.default.IFM);
container.bind(identifiers_1.default.IFeatureService).to(FeatureServiceImpl_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = container;
