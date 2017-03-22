/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2016 OptRel team
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
            'test/**/*.ts'
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

        plugins: [
            require("karma-jasmine"),
            require("karma-phantomjs-launcher"),
            require("karma-webpack")
        ]
    });
};