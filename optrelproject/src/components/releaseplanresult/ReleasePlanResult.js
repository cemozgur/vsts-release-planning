"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var algorithmType_1 = require("../../logic/constants/algorithmType");
var IFMReleasePlanResult_1 = require("./IFMReleasePlanResult");
var GAReleasePlanResult_1 = require("./GAReleasePlanResult");
var ReleasePlanResult = (function (_super) {
    __extends(ReleasePlanResult, _super);
    function ReleasePlanResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReleasePlanResult.prototype.render = function () {
        var releasePlanResult = null;
        switch (this.props.algorithmType) {
            case algorithmType_1.default.IFM:
                releasePlanResult = React.createElement(IFMReleasePlanResult_1.IFMReleasePlanResult, { result: this.props.result });
                break;
            case algorithmType_1.default.GA:
                releasePlanResult = React.createElement(GAReleasePlanResult_1.GAReleasePlanResult, { result: this.props.result });
                break;
        }
        return React.createElement("div", null, releasePlanResult);
    };
    return ReleasePlanResult;
}(React.Component));
exports.ReleasePlanResult = ReleasePlanResult;
