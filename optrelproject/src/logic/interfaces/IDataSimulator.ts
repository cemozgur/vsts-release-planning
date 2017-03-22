/**
* @author Suwichak Fungprasertkul <suwichak@outlook.com>
* @version 1.0
* @license MIT License Copyright (c) 2017 OptRel team
* @description The interface for Data Simulator function (Monte Carlo Simulation and other potential simulation) which will br used in Optimal Release Plan Generation.
*/

export interface IDataSimulator {
  /**
    * @function getExpectedValue
    * @description Obtaining the output expected value after the simulation.
    */
    getExpectedValue(): number;
}

export default IDataSimulator;
