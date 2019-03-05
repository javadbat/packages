const Path = require("path");

class Controller {

    constructor() {

        this.setProperties();
    }

    setProperties() {

        this.viewDir   = Path.resolve(__dirname, '../../Client/Views');
        this.path = require('path');
    }


}

module.exports = Controller;