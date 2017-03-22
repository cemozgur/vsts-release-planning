/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2016 OptRel team
 * 
 * @description WebPack configuration file
 */
const webpack = require('webpack');

module.exports = {
    //output contains the name of the production single javascript file
    output: {
        filename: "bundle.js",
        libraryTarget: "amd"
    },
    externals: [{
        "q": true,
        "react": true,
        "react-dom": true
    },
        /^TFS\//, // Ignore TFS/* since they are coming from VSTS host 
        /^VSS\//  // Ignore VSS/* since they are coming from VSTS host
    ],
    resolve: {
        alias: { "OfficeFabric": "../node_modules/office-ui-fabric-react/lib-amd" }
    }
    /*,
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ] */   
};