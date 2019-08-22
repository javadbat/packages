
var express = require('express');
const Path    = require("path");
const RoutesData = require("./Routes/RoutesData").default;
const watch       = require('gulp-watch');
const sass        = require('gulp-sass');
const gulp        = require('gulp');
const path        = require('path');
const Colors        = require('colors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const scssWatchFile = require("./Config/SassFilesConfig").watchingFiles
var WatchJsFile = require("./WatchJsFile").defualt
class ServeApplication{
    constructor(environment){
        process.env.NODE_ENV = "development";
        this.expressApp = new express();
        this.registerRequestParsers();
        this.port = 100;
        this.environment = environment;
    }
    runExpress(){
        this.expressApp.listen(this.port,()=>{
            console.log("Server Runing On http://localhost:"+this.port);
            console.log("environment:"+this.environment.green);
        })
    }
    registerRequestParsers(){
        // enable files upload
        this.expressApp.use(fileUpload({
            createParentPath: true
        }));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({extended: true}));
    }
    registerPageUrls(){
        RoutesData.forEach(routeData => {
            if(routeData.method == "POST"){
                this.expressApp.post(routeData.url,this.getContollerMethod(routeData));
            }else{
                this.expressApp.get(routeData.url,this.getContollerMethod(routeData));
            }
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
        this.expressApp.use('/jb-checkbox-react', express.static('./ReactComponents/jb-checkbox-react'));
        this.expressApp.use('/jb-image-uploader-react', express.static('./ReactComponents/jb-image-uploader-react'));
        this.expressApp.use('/jb-image-editor-react', express.static('./ReactComponents/jb-image-editor-react'));
        this.expressApp.use('/jb-selectbox-react', express.static('./ReactComponents/jb-selectbox-react'));
        this.expressApp.use('/jb-switch-react', express.static('./ReactComponents/jb-switch-react'));
        this.expressApp.use('/jb-dateinput-react', express.static('./ReactComponents/jb-dateinput-react'));
        this.expressApp.use('/jb-searchbar-react', express.static('./ReactComponents/jb-searchbar-react'));
        this.expressApp.use('/jb-grid-react', express.static('./ReactComponents/jb-grid-react'));
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
    WatchJsFile(){
        this.jsWatcher = new WatchJsFile();
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