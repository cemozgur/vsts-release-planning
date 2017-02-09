class MathFunction {
  private static _default: MathFunction;

  static get default(): MathFunction {
    if (!MathFunction._default) {
      MathFunction._default = new MathFunction();
    }
    return MathFunction._default;
  }

  public Mean(sum: number, number: number) {
    return sum / number;
  }

  public MonteCarloSimulation(SimulationSize: number, Probability: number) {
    return 'To Be Implemented';
  }

}

let test = MathFunction.default;

console.log(test.MonteCarloSimulation(10000,0.3));
