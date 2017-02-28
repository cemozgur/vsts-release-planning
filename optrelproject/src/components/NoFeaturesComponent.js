"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var NoFeaturesComponent = (function (_super) {
    __extends(NoFeaturesComponent, _super);
    function NoFeaturesComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoFeaturesComponent.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement("span", null, "There is no feature available to process."));
    };
    return NoFeaturesComponent;
}(React.Component));
exports.NoFeaturesComponent = NoFeaturesComponent;
