"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Label_1 = require("../../../node_modules/office-ui-fabric-react/lib-amd/components/Label/Label");
var GAReleasePlanResult = (function (_super) {
    __extends(GAReleasePlanResult, _super);
    function GAReleasePlanResult() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * To implement
     */
    GAReleasePlanResult.prototype.render = function () {
        return React.createElement(Label_1.Label, null, "GA still working on..");
    };
    return GAReleasePlanResult;
}(React.Component));
exports.GAReleasePlanResult = GAReleasePlanResult;
