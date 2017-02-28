"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Label_1 = require("../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label");
var algorithmType_1 = require("../../logic/constants/algorithmType");
var CONFIG_KEY = {
    discountValue: "discountValue",
    teamCapability: "teamCapability",
    numberOfSprint: "numberOfSprint",
    sprintDuration: "sprintDuration"
};
var ReleasePlanInput = (function (_super) {
    __extends(ReleasePlanInput, _super);
    function ReleasePlanInput(props) {
        return _super.call(this, props) || this;
    }
    ReleasePlanInput.prototype.render = function () {
        var algorithmType = this.props.algorithmType;
        var inputSection = null;
        switch (algorithmType) {
            case algorithmType_1.default.IFM:
                inputSection = this._getIFMInputSection();
                break;
            case algorithmType_1.default.GA:
                inputSection = null;
                break;
        }
        return React.createElement("div", null, inputSection);
    };
    ReleasePlanInput.prototype._getIFMInputSection = function () {
        return React.createElement("div", null,
            React.createElement("div", { className: "ifm-section" },
                React.createElement(Label_1.Label, null, "Number of Sprint"),
                React.createElement("input", { type: "text", placeholder: "How many iterations for the project?", required: true, className: "release-input", onChange: this._handleNumberOfSprintChange.bind(this) })),
            React.createElement("div", { className: "ifm-section" },
                React.createElement(Label_1.Label, null, "Sprint Duration"),
                React.createElement("input", { type: "text", placeholder: "How many weeks last each sprint?", required: true, className: "release-input", onChange: this._handleSprintDurationChange.bind(this) })),
            React.createElement("div", { className: "ifm-section" },
                React.createElement(Label_1.Label, null, "Team Capability"),
                React.createElement("input", { placeholder: "(Min) Available Hours", name: "Min", required: true, className: "release-input", type: "text", onChange: this._handleTeamCapabilityChange.bind(this) }),
                React.createElement("input", { placeholder: "(Expected) Available Hours", name: "Expected", required: true, className: "release-input", type: "text", onChange: this._handleTeamCapabilityChange.bind(this) }),
                React.createElement("input", { placeholder: "(Max) Available Hours", name: "Max", required: true, className: "release-input", type: "text", onChange: this._handleTeamCapabilityChange.bind(this) })),
            React.createElement("div", { className: "ifm-section" },
                React.createElement(Label_1.Label, null, "Discount Value"),
                React.createElement("input", { placeholder: "(Min)", name: "Min", required: true, className: "release-input", type: "text", onChange: this._handleDiscountValueChange.bind(this) }),
                React.createElement("input", { placeholder: "(Expected)", name: "Expected", required: true, className: "release-input", type: "text", onChange: this._handleDiscountValueChange.bind(this) }),
                React.createElement("input", { placeholder: "(Max)", name: "Max", required: true, className: "release-input", type: "text", onChange: this._handleDiscountValueChange.bind(this) })));
    };
    ReleasePlanInput.prototype._handleSprintDurationChange = function (event) {
        var target = event.target;
        var value = target.value;
        var name = target.name;
        this.props.updateStateConfig(CONFIG_KEY.sprintDuration, null, value);
    };
    ReleasePlanInput.prototype._handleNumberOfSprintChange = function (event) {
        var target = event.target;
        var value = target.value;
        var name = target.name;
        this.props.updateStateConfig(CONFIG_KEY.numberOfSprint, null, value);
    };
    ReleasePlanInput.prototype._handleDiscountValueChange = function (event) {
        var target = event.target;
        var value = target.value;
        var name = target.name;
        this.props.updateStateConfig(CONFIG_KEY.discountValue, name, value);
    };
    ReleasePlanInput.prototype._handleTeamCapabilityChange = function (event) {
        var target = event.target;
        var value = target.value;
        var name = target.name;
        this.props.updateStateConfig(CONFIG_KEY.teamCapability, name, value);
    };
    return ReleasePlanInput;
}(React.Component));
exports.ReleasePlanInput = ReleasePlanInput;
