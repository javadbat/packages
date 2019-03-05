const Controller = require("./Controller");

class ReactExamples extends Controller {

    constructor() {
        super();
    }

    Systemjs(request, respond) {

        let file = this.path.join(this.viewDir, "/Examples/React/Systemjs.html");
        respond.sendFile(file);
    }
}

module.exports = ReactExamples;