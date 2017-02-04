define(["require", "exports", "react", "react-dom", "./components/FeatureComponent", "./logic/Feature"], function (require, exports, React, ReactDOM, FeatureComponent_1, Feature_1) {
    "use strict";
    function init(containerId) {
        var description = "These features will be used to generate a release plan.";
        Feature_1.Instance.getAllFeatureByProjectResult().then(function (features) {
            console.log("VSTS Features");
            console.log(features);
            ReactDOM.render(React.createElement(FeatureComponent_1.WorkItemSearchComponent, { description: description, features: features }), document.getElementById(containerId));
        });
    }
    exports.init = init;
});
