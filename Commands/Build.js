const Gulp          = require('gulp');
const Path          = require('path');
const Colors        = require('colors');
const jeditor       = require("gulp-json-editor");
//for rollup individual bundle 
const rollup              = require('rollup');
const rollupBabel         = require('rollup-plugin-babel') ;
const rollupResolve       = require('rollup-plugin-node-resolve');
const rollupMinify        = require('rollup-plugin-babel-minify');
const rollupScss          = require('rollup-plugin-scss')
const cleanup             = require('rollup-plugin-cleanup');
// const rollupCss           = require('rollup-plugin-css-porter') 
const config = require('./Config');
class BuildClass{
    constructor(){
        
    }
    run(){
        this.bundleJBModules();
        this.bundleJBReactComponents();
    }
    bundleJBModules() {
        config.rollupConfig.packagesEntryPoints.forEach(function(rollupPackage){
            let inputOptions = {
                input:Path.join("",rollupPackage.path),
                external:rollupPackage.exclude,
                plugins: [
                    //rollupCss(),
                    rollupBabel({
                        exclude: 'node_modules/**',
                        externalHelpers :true,
                        babelrc: false,
                        presets: [
                            "@babel/preset-env",
                            //"babel-preset-stage-0",
                            "@babel/preset-react",
                            
                        ],
                        plugins:[
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-syntax-dynamic-import"
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
                if(rollupPackage.cjsDest){
                    bundle.write(cjsoutputOption).then(function(output){
                        console.log("     ", rollupPackage.cjsDest.rainbow);
                        
                    });
                }
                if(rollupPackage.systemjsDest){
                    bundle.write(systemOutputOption).then(function(output){
                        console.log("     ", rollupPackage.systemjsDest.rainbow);
                        
                    });
                }
            });
        });
        console.log("\n","Publish JSPM client modules:".black.bgWhite, "Published".green);
    }
    bundleJBReactComponents(){
        config.rollupConfig.reactComponentsEntryPoints.forEach(function(rollupPackage){
            let inputOptions = {
                input:Path.join("",rollupPackage.path),
                external:rollupPackage.exclude,
                plugins: [
                    rollupScss(),
                    //rollupCss(),
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
                    //rollupMinify(),
                    rollupScss(),
                    //cleanup()
                  ]
            }
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
                if(rollupPackage.cjsDest){
                    bundle.write(cjsoutputOption).then(function(output){
                        console.log("     ", rollupPackage.cjsDest.rainbow);
                        
                    });
                }
                if(rollupPackage.systemjsDest){
                    bundle.write(systemOutputOption).then(function(output){
                        console.log("     ", rollupPackage.systemjsDest.rainbow);
                        
                    });
                }
            });
        });
        console.log("\n","Publish JSPM client modules:".black.bgWhite, "Published".green);
    }
}
var build = new BuildClass()
console.log("build started!");
build.run();
