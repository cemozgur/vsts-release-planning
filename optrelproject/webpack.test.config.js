const webpack = require('webpack');

module.exports = {
    output: {
        filename: "spec.js",
        libraryTarget : "amd"
    },
    externals: [
        /^TFS\//, // Ignore TFS/* since they are coming from VSTS host 
        /^VSS\//  // Ignore VSS/* since they are coming from VSTS host
    ],

};