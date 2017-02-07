"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var FeatureComponent_1 = require("./components/FeatureComponent");
var Feature_1 = require("./logic/Feature");
function init(containerId) {
    var description = "These features will be used to generate a release plan. InversifyJS";
    Feature_1.Instance.getAllFeatureByProjectResult().then(function (features) {
        console.log("VSTS Features");
        console.log(features);
        ReactDOM.render(React.createElement(FeatureComponent_1.WorkItemSearchComponent, { description: description, features: features }), document.getElementById(containerId));
    });
}
exports.init = init;
