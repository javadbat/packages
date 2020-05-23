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
const postcss = require('rollup-plugin-postcss');
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
                    //'.css':".css!"
                }
                break;
        }
        var plugins = [
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
                    ["@babel/plugin-proposal-class-properties", { loose: true }],
                    "@babel/plugin-syntax-dynamic-import",
                    "@babel/plugin-proposal-nullish-coalescing-operator"
                ]
            }),
            postcss({
                extensions: [ '.css' ],
            }),
            rollupResolve({
                jsnext: true,
                main: true,
                browser: true
            }),
        ]
        if(config.rollupConfig.minify == true){
            plugins.push(rollupMinify())
        }
        plugins.push(cleanup());
        let inputOptions = {
            input:Path.join("",rollupPackage.path),
            external:rollupPackage.exclude,
            plugins: plugins
        }
        return inputOptions;
    }
    getInputOptions(rollupPackage){
        let inputOptions = this._createInputOption("",rollupPackage);
        let cjsInputOptions = this._createInputOption("cjs",rollupPackage);
        let systemjsInputOptions = this._createInputOption("systemjs",rollupPackage);
        return({
            es:inputOptions,
            cjs:cjsInputOptions,
            systemjs:systemjsInputOptions
        })
    }
    getOutputOptions(rollupPackage){
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
        return({
            es:outputOptions,
            cjs:cjsoutputOption,
            systemjs:systemOutputOption
        })
    }
    bundleJBReactComponents(){
        config.rollupConfig.reactComponentsEntryPoints.forEach((rollupPackage)=>{
            let inputOptions = this.getInputOptions(rollupPackage);
            let outputOptions = this.getOutputOptions(rollupPackage);
            let bundlePromise = rollup.rollup(inputOptions.es);
            bundlePromise.then(function(bundle){
                bundle.write(outputOptions.es).then(function(output){
                    console.log("     ", rollupPackage.dest.rainbow);
                    
                });
            });
            if(rollupPackage.cjsDest){
                let bundlePromise = rollup.rollup(inputOptions.cjs);
                bundlePromise.then(function(bundle){
                    bundle.write(outputOptions.cjs).then(function(output){
                        console.log("     ", rollupPackage.cjsDest.rainbow);
                        
                    });
                });

            }
            if(rollupPackage.systemjsDest){
                let bundlePromise = rollup.rollup(inputOptions.systemjs);
                bundlePromise.then(function(bundle){
                    bundle.write(outputOptions.systemjs).then(function(output){
                        console.log("     ", rollupPackage.systemjsDest.rainbow);
                        
                    });
                });

            }
        });
    }
}
exports.defualt = BuildClass;