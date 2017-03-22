/**
* @author Suwichak Fungprasertkul <suwichak@outlook.com>
* @author Binghao Chai <cbhindex@gmail.com>
* @version 1.0
* @license MIT License Copyright (c) 2017 OptRel team
* @description Monte Carolo Simluation for dealing the uncertainty of the given input with Triangular distribution
*/

import Random from "./Random";
import IDataSimulator from "../interfaces/IDataSimulator";

class MonteCarloSimulation implements IDataSimulator {

  private config;
  sum;

  constructor(config : any, distribution : any){
    this.config = config;
    if(this.config.populationSize == 0){
      this.config.populationSize == 10000;
    }

    this.sum = 0;
    if(distribution.name === "triangular"){
      for(var i = 0 ; i < this.config.populationSize ; i++ ){
        var rand = new Random(Math.random()*10);
        var temp = rand.triangular(distribution.value.lowerBound,distribution.value.upperBound,distribution.value.mode);
        if(this.config.debug == true){
          console.log(temp);
        }
        this.sum = this.sum + temp;
      }
    }
  }

  getExpectedValue(){
    return this.sum / this.config.populationSize;
  }
}

export default MonteCarloSimulation;
