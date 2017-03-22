/**
 * @author Ytalo Elias Borja Mori <ytaloborjam@gmail.com>
 * @version 1.0
 * @license 
 * MIT License Copyright (c) 2016 OptRel team
 * 
 * @description Gulp Task Configuration, it compiles the whole project into just one file (bundle.js)
 */
const path = require("path");
const gulp = require('gulp');
const template = require('gulp-template');
const webpack = require('gulp-webpack');
const rename = require('gulp-rename');
const ts = require("gulp-typescript"); //https://www.npmjs.com/package/gulp-typescript
const yargs = require("yargs");

var exec = require('child_process').exec;

const tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});

let argv = yargs.argv;
console.log(argv);


const isBundled = argv.local ? false : true;
const windowsEnvironment = argv.windows ? true : false;

const vstsPersonalToken = argv.token;
const publisherIdOverride = argv.publisher || "";
const vstsUser = argv.uservst;
const extension_vsts_id = argv.extensionvstsid;//DEV wants to change the extension id

let tfxCommand;
if (windowsEnvironment) {
    tfxCommand = path.join(__dirname, "node_modules", ".bin", "tfx.cmd");
} else {
    //For Unix environment
    tfxCommand = path.join(__dirname, "node_modules", ".bin", "tfx");
}

const distFolder = 'dist';//Folder name for Production
const contentFolder = isBundled ? distFolder : '.';

var templateValues = {};


if (isBundled) {
    templateValues.head = `
    <link href="css/fabric.min.css" rel="stylesheet" />
    <link href="css/main.css" rel="stylesheet" />
    <script src="scripts/VSS.SDK.min.js"></script>
    `;

    templateValues.init = `
        VSS.init({
            usePlatformScripts: true, 
            usePlatformStyles: true
        });

        VSS.require(["scripts/Bundle"], function (Bundle) {
            Bundle.init("work-item-search-view");
        });    
    `;
}
else {
    templateValues.head = `
    <link href="node_modules/office-ui-fabric-react/dist/css/fabric.css" rel="stylesheet" />
    <link href="css/main.css" rel="stylesheet" />
    <script src="node_modules/vss-web-extension-sdk/lib/VSS.SDK.js"></script>
    `;

    templateValues.init = `
        VSS.init({
            usePlatformScripts: true, 
            usePlatformStyles: true,
            moduleLoaderConfig: {
                paths: {
                    "OfficeFabric": "node_modules/office-ui-fabric-react/lib-amd",
                    "@microsoft/load-themed-styles": "node_modules/office-ui-fabric-react/node_modules/@microsoft/load-themed-styles/lib-amd/index"
                }
            }
        });

        VSS.require(["scripts/WorkItemSearchComponent"], function (WorkItemSearchComponent) {
            WorkItemSearchComponent.init("work-item-search-view");
        });    
    `;
}

/**
 * @description Task name: teamplate. It will generate the final index.html for production.
 */
gulp.task('template', () => {
    return gulp.src('index.html.template')
        .pipe(template(templateValues))
        .pipe(rename(function (path) {
            path.basename = 'index';
            path.extname = '.html';
        }))
        .pipe(gulp.dest(contentFolder));
});

/**
 * @description Task name: build. It will compile typescript into javascript.
 */
gulp.task('build', () => {
    var tsResult = gulp.src(['src/**/*.tsx', 'src/**/*.ts'])
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('src'));
});

/**
 * @description Task name: copy. Copy the required java scripts files, images, styles into production distribution
 */
gulp.task('copy', ['build'], () => {
    if (isBundled) {
        gulp.src('node_modules/vss-web-extension-sdk/lib/VSS.SDK.min.js')
            .pipe(gulp.dest(contentFolder + '/scripts'));

        gulp.src('node_modules/jquery/dist/jquery.min.js')
            .pipe(gulp.dest(contentFolder + '/scripts'));

        gulp.src('node_modules/jquery-validation/dist/jquery.validate.min.js')
            .pipe(gulp.dest(contentFolder + '/scripts'));

        gulp.src('static/feature-template-extension.html')
            .pipe(gulp.dest(contentFolder));

        gulp.src('static/css/main.css')
            .pipe(gulp.dest(contentFolder + '/css'));

        gulp.src('static/css/fabric.components.min.css')
            .pipe(gulp.dest(contentFolder + '/css'));

        gulp.src('static/images/*.png')
            .pipe(gulp.dest(contentFolder + '/images'));

        gulp.src('static/js/feature-template-extension.js')
            .pipe(gulp.dest(contentFolder + '/scripts'));

        gulp.dest(contentFolder + '/vsts_extension');

        return gulp.src(['node_modules/office-ui-fabric-react/dist/*css/*.min.css'])
            .pipe(gulp.dest(contentFolder));
    } else {
        return true;
    }
});

/**
 * @description Task name: webpack. bundle all business layer and front-end layer into one javascript file.
 */
gulp.task('webpack', ['copy'], () => {
    if (isBundled) {
        return gulp.src('./src/index.js')
            .pipe(webpack(require('./webpack.config.js')))
            .pipe(gulp.dest(contentFolder + "/scripts"));

    } else {
        return true;
    }
});

/**
 * @description Task name: tfxpack. Generate vsix file to be deployed into the VSTS Market Place
 */
gulp.task('tfxpack', () => {
    const rootArg = `--root ${contentFolder}`;
    const vsix_folder = distFolder + "/vsts_extension";
    const outputPathArg = `--output-path ${vsix_folder}`;
    const manifestsArg = `--manifests ${isBundled ? '../' : ''}manifests/base.json`;
    const overridesFileArg = `--overrides-file manifests/${isBundled ? 'bundled.json' : 'local.json'}`;
    const publisherOverrideArg = publisherIdOverride != "" ? `--publisher ${publisherIdOverride}` : '';
    const extensionIdOverrideArg = extension_vsts_id != "" ? `--extension-id ${extension_vsts_id}` : '';

    exec(`${tfxCommand} extension create ${rootArg} ${outputPathArg} ${manifestsArg} ${overridesFileArg} ${publisherOverrideArg} ${extensionIdOverrideArg} --rev-version`,
        (err, stdout, stderr) => {
            if (err) {
                console.log(err);
            }
            console.log(stdout);
            console.log(stderr);
        });
});

/**
 * @description Task name: tfxpublish. It Publish the vsix file on the Publisher
 */
gulp.task('tfxpublish', () => {
    const rootArg = `--root ${contentFolder}`;
    const vsix_folder = distFolder + "/vsts_extension";
    const outputPathArg = `--output-path ${vsix_folder}`;
    const manifestsArg = `--manifests ${isBundled ? '../' : ''}manifests/base.json`;
    const overridesFileArg = `--overrides-file manifests/${isBundled ? 'bundled.json' : 'local.json'}`;
    const publisherOverrideArg = publisherIdOverride != "" ? `--publisher ${publisherIdOverride}` : '';
    const extensionIdOverrideArg = extension_vsts_id != "" ? `--extension-id ${extension_vsts_id}` : '';
    const shareWithAccountArg = vstsUser != "" ? `--share-with ${vstsUser}` : '';
    const personalPublisherTokenArg = vstsPersonalToken != "" ? `--token ${vstsPersonalToken}` : '';

    exec(`${tfxCommand} extension publish ${rootArg} ${outputPathArg} ${manifestsArg} ${overridesFileArg} ${publisherOverrideArg} ${extensionIdOverrideArg} ${shareWithAccountArg} ${personalPublisherTokenArg} --rev-version`,
        (err, stdout, stderr) => {
            if (err) {
                console.log(err);
            }
            console.log(stdout);
            console.log(stderr);
        });
});

/**
 * @description Task name: tfxinstall. It install OptRel plug-in into the specified VSTS accounts
 */
gulp.task('tfxinstall', () => {
    exec(`${tfxCommand} extension install --publisher ${publisherIdOverride}  --extension-id ${extension_vsts_id} --accounts ${vstsUser} --token ${vstsPersonalToken}`,
        (err, stdout, stderr) => {
            if (err) {
                console.log(err);
            }
            console.log(stdout);
            console.log(stderr);
        });
});

gulp.task('buildoptrel', ['template', 'webpack']);

/**
 * @description Task name: publishoptrel. It invokes the task buildoptrel, then it publish the plug-in into the VSTS accounts
 */
gulp.task('publishoptrel', ['buildoptrel'], () => {
    const rootArg = `--root ${contentFolder}`;
    const vsix_folder = distFolder + "/vsts_extension";
    const outputPathArg = `--output-path ${vsix_folder}`;
    const manifestsArg = `--manifests ${isBundled ? '../' : ''}manifests/base.json`;
    const overridesFileArg = `--overrides-file manifests/${isBundled ? 'bundled.json' : 'local.json'}`;
    const publisherOverrideArg = publisherIdOverride != "" ? `--publisher ${publisherIdOverride}` : '';
    const extensionIdOverrideArg = extension_vsts_id != "" ? `--extension-id ${extension_vsts_id}` : '';
    const shareWithAccountArg = vstsUser != "" ? `--share-with ${vstsUser}` : '';
    const personalPublisherTokenArg = vstsPersonalToken != "" ? `--token ${vstsPersonalToken}` : '';

    exec(`${tfxCommand} extension publish ${rootArg} ${outputPathArg} ${manifestsArg} ${overridesFileArg} ${publisherOverrideArg} ${extensionIdOverrideArg} ${shareWithAccountArg} ${personalPublisherTokenArg} --rev-version`,
        (err, stdout, stderr) => {
            if (err) {
                console.log(err);
            }
            console.log(stdout);
            console.log(stderr);
        });
});


gulp.task('default', ['build', 'tfxpack']);