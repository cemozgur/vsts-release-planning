/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2017 OptRel team
 * 
 * @description Karma configuration file, it runs with PhantomJS
 */
const path = require("path");

const webpackConfig = require(__dirname+"/test.webpack.config");

module.exports = function (config) {
    config.set({
        basePath: '',
        // add the installed frameworks here
        frameworks: ["jasmine"],
        //passing the folder path for OptRel test
        files: [
            'test/**/*.ts',
         './node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
        ],
        exclude: [
        ],
        preprocessors: {
            'test/**/*.ts': ['webpack']
        },

        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        concurrency: Infinity,

        browserDisconnectTimeout:300000,
        browserDisconnectTolerance: 2,
        browserNoActivityTimeout: 30000,

        plugins: [
            require("karma-jasmine"),
            require("karma-phantomjs-launcher"),
            require("karma-webpack")        ]
    });
};