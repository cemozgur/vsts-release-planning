const path = require("path");
const gulp = require('gulp');
const template = require('gulp-template');
const webpack = require('gulp-webpack');
const rename = require('gulp-rename');
//https://www.npmjs.com/package/gulp-typescript
const ts = require("gulp-typescript");
const yargs = require("yargs");

var exec = require('child_process').exec;

/**
 * VSTS values for configuration
 */
const vstsPersonalToken = "n5hzm74vlbdf5sql6qoe5xoj65kc76e7fp7fkkan6hjmg4eamzuq";
const vstsUser = "ytachi0026";
const vstsPublisher = "ytaloborjamori";
const optRelId="vsts-extensions-optrel";


const tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});

var argv = yargs.string("publisher").argv;

const publisherIdOverride = argv.publisher || "";
const isBundled = argv.local ? false : true;    
const distFolder = 'dist';
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

gulp.task('template', () => {
    return gulp.src('index.html.template')
        .pipe(template(templateValues))
        .pipe(rename(function(path) {
            path.basename = 'index';
            path.extname = '.html';
        }))
        .pipe(gulp.dest(contentFolder));
});

gulp.task('build', () => {
    var tsResult = gulp.src(['src/**/*.tsx', 'src/**/*.ts'])
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('src'));
});

gulp.task('copy', ['build'], () => {
    if (isBundled) {
        gulp.src('node_modules/vss-web-extension-sdk/lib/VSS.SDK.min.js')
            .pipe(gulp.dest(contentFolder + '/scripts'));

        return gulp.src(['node_modules/office-ui-fabric-react/dist/*css/*.min.css'])
            .pipe(gulp.dest(contentFolder));
    } else {
        return true;
    }
});

gulp.task('webpack', ['copy'], () => {
    if (isBundled) {
        return gulp.src('./src/index.js')
            .pipe(webpack(require('./webpack.config.js')))
            .pipe(gulp.dest(contentFolder + "/scripts"));

    } else {
        return true;
    }
});

gulp.task('tfxpack', ['webpack'], ()=> {
    const vsts_dist = distFolder+"/vsts_extension";
    const rootArg = `--root ${contentFolder}`;
    const outputPathArg = `--output-path ${vsts_dist}`;
    const manifestsArg = `--manifests ${isBundled ? '../' : ''}manifests/base.json`; 
    const overridesFileArg = `--overrides-file manifests/${isBundled ? 'bundled.json' : 'local.json'}`;
    const publisherOverrideArg = publisherIdOverride != "" ? `--publisher ${publisherIdOverride}` : '';


    exec(`${path.join(__dirname, "node_modules", ".bin", "tfx.cmd")} extension create ${rootArg} ${outputPathArg} ${manifestsArg} ${overridesFileArg} ${publisherOverrideArg} --rev-version`,
        (err, stdout, stderr) => {
            if (err) {
                console.log(err);
            }
            console.log(stdout);
            console.log(stderr);
        });
});

gulp.task('tfxpublish', ['webpack'], ()=> {
    const vsts_dist = distFolder+"/vsts_extension";
    const rootArg = `--root ${contentFolder}`;
    const outputPathArg = `--output-path ${vsts_dist}`;
    const manifestsArg = `--manifests ${isBundled ? '../' : ''}manifests/base.json`; 
    const overridesFileArg = `--overrides-file manifests/${isBundled ? 'bundled.json' : 'local.json'}`;
    const publisherOverrideArg = publisherIdOverride != "" ? `--publisher ${publisherIdOverride}` : '';


    exec(`${path.join(__dirname, "node_modules", ".bin", "tfx.cmd")} extension publish ${rootArg} ${outputPathArg} ${manifestsArg} ${overridesFileArg} ${publisherOverrideArg} --rev-version --share-with ${vstsUser} --token ${vstsPersonalToken}`,
        (err, stdout, stderr) => {
            if (err) {
                console.log(err);
            }
            console.log(stdout);
            console.log(stderr);
        });
});

gulp.task('tfxinstall', ()=> {
    exec(`${path.join(__dirname, "node_modules", ".bin", "tfx.cmd")} extension install --publisher ${vstsPublisher}  --extension-id ${optRelId} --accounts ${vstsUser} --token ${vstsPersonalToken}`,
        (err, stdout, stderr) => {
            if (err) {
                console.log(err);
            }
            console.log(stdout);
            console.log(stderr);
        });
});

gulp.task('default', ['template', 'tfxpack']);
gulp.task('publishoptrel', ['template', 'tfxpublish']);