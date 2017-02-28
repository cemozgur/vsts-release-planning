"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ChoiceGroup_1 = require("../../../node_modules/office-ui-fabric-react/lib-amd/components/ChoiceGroup");
var algorithmType_1 = require("../../logic/constants/algorithmType");
var AlgorithmChoice = (function (_super) {
    __extends(AlgorithmChoice, _super);
    function AlgorithmChoice(props) {
        return _super.call(this, props) || this;
    }
    AlgorithmChoice.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement(ChoiceGroup_1.ChoiceGroup, { options: [
                    {
                        key: algorithmType_1.default.IFM,
                        text: 'Release Planning that maximises the Net Present Value of the project.',
                        checked: true
                    },
                    {
                        key: algorithmType_1.default.GA,
                        text: 'Release Planning that maximises Net Present Value and minimises Time Criticality of the Project.'
                    }
                ], label: 'Select the release planning optimisation for your project.', onChange: this.props.updateAlgorithmState.bind(this), required: true, disabled: this.props.disabled }));
    };
    return AlgorithmChoice;
}(React.Component));
exports.AlgorithmChoice = AlgorithmChoice;
