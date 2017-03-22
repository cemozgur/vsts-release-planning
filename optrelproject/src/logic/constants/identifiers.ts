/**
* @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
* @author Suwichak Fungprasertkul <suwichak@outlook.com>
* @version 1.0
* @license MIT License Copyright (c) 2017 OptRel team
* @description Type identifier for the interface in order for use in Dependency Injection Design Pattern
*/

let TYPES = {
    IReleasePlanningAlgorithm: Symbol("IReleasePlanningAlgorithm"),
    IFeatureService: Symbol("IFeatureService"),
    IDataSimulator: Symbol("IDataSimulator")
};

export default TYPES;
