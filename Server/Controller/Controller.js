const Path      = require("path");
const Colors    = require('colors');
class Controller {
    
    constructor(environment) {
        this.environment = environment;
        if(this.environment == undefined){
            console.error("Controller class need to get project environment to run properly".red)
        }
        this.setProperties();
    }

    setProperties() {

        this.viewDir   = Path.resolve(__dirname, '../../TestBeds/'+this.environment+'/Client/Views');
        this.assetDir   = Path.resolve(__dirname, '../../TestBeds/'+this.environment+'/Client/Assets');
        this.path = require('path');
    }


}

module.exports = Controller;