"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var inversify_config_1 = require("./logic/config/inversify.config");
var identifiers_1 = require("./logic/constants/identifiers");
var ReleasePlanningComponent_1 = require("./components/ReleasePlanningComponent");
var NoFeaturesComponent_1 = require("./components/NoFeaturesComponent");
function init(containerId) {
    var featureService = inversify_config_1.default.get(identifiers_1.default.IFeatureService);
    var vstsProjectId = VSS.getWebContext().project.id;
    var description = "These features will be used to generate a release plan. Testing AREA.";
    featureService.getAllFeatureByProjectResult(vstsProjectId).then(function (features) {
        if (features.queryResult.workItems.length > 0) {
            ReactDOM.render(React.createElement(ReleasePlanningComponent_1.ReleasePlanningComponent, { description: description, features: features }), document.getElementById(containerId));
        }
        else {
            ReactDOM.render(React.createElement(NoFeaturesComponent_1.NoFeaturesComponent, null), document.getElementById(containerId));
        }
    });
}
exports.init = init;
