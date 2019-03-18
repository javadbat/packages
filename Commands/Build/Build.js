const Gulp          = require('gulp');
const Path          = require('path');
const Colors        = require('colors');
const jeditor       = require("gulp-json-editor");
//for rollup individual bundle 
const rollup              = require('rollup');
const rollupBabel         = require('rollup-plugin-babel') ;
const rollupResolve       = require('rollup-plugin-node-resolve');
const rollupMinify        = require('rollup-plugin-babel-minify');
// const rollupScss          = require('rollup-plugin-scss')
const cleanup             = require('rollup-plugin-cleanup');
const rollupReplace             = require('rollup-plugin-replace');
// const rollupCss           = require('rollup-plugin-css-porter') 
const config = require('../Config');
class BuildClass{
    constructor(){
        
    }
    run(){
        this.bundleJBModules();
        this.bundleJBReactComponents();
    }
    bundleJBModules() {
        config.rollupConfig.packagesEntryPoints.forEach((rollupPackage)=>{
            let inputOptions = this._createInputOption("",rollupPackage);
            let cjsInputOptions = this._createInputOption("cjs",rollupPackage);
            let systemjsInputOptions = this._createInputOption("systemjs",rollupPackage);
            let outputOptions = {
                // core output options
                sourcemap: false,
                file:Path.join("",rollupPackage.dest),
                format:'es' //es for native code , system for systemjs known module
            }
            let cjsoutputOption = {
                sourcemap: false,
                file:Path.join("",rollupPackage.cjsDest?rollupPackage.cjsDest:""),
                format:'cjs' 
            }
            let systemOutputOption = {
                sourcemap: false,
                file:Path.join("",rollupPackage.systemjsDest?rollupPackage.systemjsDest:""),
                format:'system' 
            }
            let bundlePromise = rollup.rollup(inputOptions);
            bundlePromise.then(function(bundle){
                bundle.write(outputOptions).then(function(output){
                    console.log("     ", rollupPackage.dest.rainbow);
                });
            });
                    //create special bundle for each file
        if(rollupPackage.cjsDest){
            let cjsBundlePromise = rollup.rollup(cjsInputOptions);
            cjsBundlePromise.then(function(bundle){
                bundle.write(cjsoutputOption).then(function(output){
                    console.log("     ", rollupPackage.cjsDest.rainbow);
                    
                });
            });
             console.log("\n","Publish JSPM client modules:".black.bgWhite, "Published".green);
        }
        if(rollupPackage.systemjsDest){
            let systemjsBundlePromise = rollup.rollup(systemjsInputOptions);
            systemjsBundlePromise.then(function(bundle){
                bundle.write(systemOutputOption).then(function(output){
                    console.log("     ", rollupPackage.systemjsDest.rainbow); 
                });
            })
            
        }
        });

    }
    _createInputOption(buildType,rollupPackage){
        var rollupReplaceConfig = {
            '$Build_Type_Prefix': ""
        };
        switch(buildType){
            case "cjs":
                rollupReplaceConfig = {
                    '$Build_Type_Prefix': ".cjs"
                }
                break;
            case "systemjs":
                rollupReplaceConfig = {
                    '$Build_Type_Prefix': ".systemjs",
                    '.css':".css!"
                }
                break;
        }
        let inputOptions = {
            input:Path.join("",rollupPackage.path),
            external:rollupPackage.exclude,
            plugins: [
                rollupReplace(rollupReplaceConfig),
                rollupBabel({
                    exclude: 'node_modules/**',
                    externalHelpers :true,
                    babelrc: false,
                    presets: [
                        
                        "@babel/preset-env",
                        "@babel/preset-react",
                        
                    ],
                    plugins:[
                        ["@babel/plugin-proposal-decorators",{ "legacy": true }],
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-syntax-dynamic-import",
                    ]
                }),
                rollupResolve({
                    jsnext: true,
                    main: true,
                    browser: true
                }),
                rollupMinify(),
                cleanup()
              ]
        }
        return inputOptions;
    }
    bundleJBReactComponents(){
        config.rollupConfig.reactComponentsEntryPoints.forEach((rollupPackage)=>{
            let inputOptions = this._createInputOption("",rollupPackage);
            let cjsInputOptions = this._createInputOption("cjs",rollupPackage);
            let systemjsInputOptions = this._createInputOption("systemjs",rollupPackage);
            // let inputOptions = {
            //     input:Path.join("",rollupPackage.path),
            //     external:rollupPackage.exclude,
            //     plugins: [
            //         rollupBabel({
            //             exclude: 'node_modules/**',
            //             externalHelpers :true,
            //             babelrc: false,
            //             presets: [
            //                 "@babel/preset-env",
            //                 "@babel/preset-react",
                            
            //             ],
            //             plugins:[
            //                 ["@babel/plugin-proposal-decorators",{ "legacy": true }],
            //                 "@babel/plugin-proposal-class-properties",
            //                 "@babel/plugin-syntax-dynamic-import",
                            
            //             ]
            //         }),
            //         rollupResolve({
            //             jsnext: true,
            //             main: true,
            //             browser: true
            //         }),
            //         rollupMinify(),
            //         cleanup()
            //       ]
            // }
            let outputOptions = {
                // core output options
                sourcemap: false,
                file:Path.join("",rollupPackage.dest),
                format:'es' //es for native code , system for systemjs known module
            }
            let cjsoutputOption = {
                sourcemap: false,
                file:Path.join("",rollupPackage.cjsDest?rollupPackage.cjsDest:""),
                format:'cjs' 
            }
            let systemOutputOption = {
                sourcemap: false,
                file:Path.join("",rollupPackage.systemjsDest?rollupPackage.systemjsDest:""),
                format:'system' 
            }
            let bundlePromise = rollup.rollup(inputOptions);
            bundlePromise.then(function(bundle){
                bundle.write(outputOptions).then(function(output){
                    console.log("     ", rollupPackage.dest.rainbow);
                    
                });
            });
            if(rollupPackage.cjsDest){
                let bundlePromise = rollup.rollup(cjsInputOptions);
                bundlePromise.then(function(bundle){
                    bundle.write(cjsoutputOption).then(function(output){
                        console.log("     ", rollupPackage.cjsDest.rainbow);
                        
                    });
                });

            }
            if(rollupPackage.systemjsDest){
                let bundlePromise = rollup.rollup(systemjsInputOptions);
                bundlePromise.then(function(bundle){
                    bundle.write(systemOutputOption).then(function(output){
                        console.log("     ", rollupPackage.systemjsDest.rainbow);
                        
                    });
                });

            }
        });
        console.log("\n","Publish JSPM client modules:".black.bgWhite, "Published".green);
    }
}
var build = new BuildClass()
console.log("build started!");
build.run();
