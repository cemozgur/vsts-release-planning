var MathFunction = (function () {
    function MathFunction() {
    }
    Object.defineProperty(MathFunction, "default", {
        get: function () {
            if (!MathFunction._default) {
                MathFunction._default = new MathFunction();
            }
            return MathFunction._default;
        },
        enumerable: true,
        configurable: true
    });
    MathFunction.prototype.Mean = function (sum, number) {
        return sum / number;
    };
    MathFunction.prototype.MonteCarloSimulation = function (SimulationSize, Probability) {
        return 'To Be Implemented';
    };
    return MathFunction;
}());
var test = MathFunction["default"];
console.log(test.MonteCarloSimulation(10000, 0.3));
