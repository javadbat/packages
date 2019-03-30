
var express = require('express');
const Path    = require("path");
const RoutesData = require("./Routes/RoutesData").default;
const watch       = require('gulp-watch');
const sass        = require('gulp-sass');
const gulp        = require('gulp');
const path        = require('path');
const Colors        = require('colors');
const scssWatchFile = require("./Config/SassFilesConfig").watchingFiles
class ServeApplication{
    constructor(environment){
        process.env.NODE_ENV = "development";
        this.expressApp = new express();
        this.port = 100;
        this.environment = environment;
    }
    runExpress(){
        this.expressApp.listen(this.port,()=>{
            console.log("Server Runing On http://localhost:"+this.port);
            console.log("environment:"+this.environment.green);
        })
    }
    registerPageUrls(){
        RoutesData.forEach(routeData => {
            this.expressApp.get(routeData.url,this.getContollerMethod(routeData));
        });
    }
    getContollerMethod(routeData) {
        var controller = new(require('./Controller/'+routeData.controller))(this.environment);
        return controller[routeData.action].bind(controller);
    }
    RegisterStaticFileRoutes(){
        this.expressApp.use('/jspm_packages', express.static('./TestBeds/'+this.environment+'/jspm_packages'));
        this.expressApp.use('/Client', express.static('./TestBeds/'+this.environment+'/Client'));
        //regiser local package address as a new address
        this.expressApp.use('/jb-modules', express.static('./Modules/jb-module'));
        this.expressApp.use('/', express.static('./'));
    }
    watchScssFile(){
        //For SCSS File
        for(let file of scssWatchFile) {
            //Watch Dependency
            if(file.dependencies) {
                for(let dep of file.dependencies) {

                    watch(dep, (e) => {
                        this.compileSass(file);
                    });
                }
            }

            watch(file.src , (e) => {
                this.compileSass(file);
            });
        }
    }
    compileSass(file){
        console.log(file);

        if(file.dest) {

            gulp.src(file.src)
                .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
                .pipe(gulp.dest(path.resolve(file.dest, '../')));
        }else {

            gulp.src(file.src)
                .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
                .pipe(gulp.dest(path.resolve(file.src, '../')));
        }
    }
}
exports.default = ServeApplication