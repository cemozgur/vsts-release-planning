"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var inversify_config_1 = require("./logic/config/inversify.config");
var identifiers_1 = require("./logic/constants/identifiers");
var FeatureComponent_1 = require("./components/FeatureComponent");
function init(containerId) {
    var featureService = inversify_config_1.default.get(identifiers_1.default.IFeatureService);
    var vstsProjectId = VSS.getWebContext().project.id;
    var description = "These features will be used to generate a release plan. InversifyJS";
    featureService.getAllFeatureByProjectResult(vstsProjectId).then(function (features) {
        console.log("VSTS Features");
        console.log(features);
        ReactDOM.render(React.createElement(FeatureComponent_1.WorkItemSearchComponent, { description: description, features: features }), document.getElementById(containerId));
    });
}
exports.init = init;
