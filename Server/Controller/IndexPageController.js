const Controller = require("./Controller");

class IndexPageController extends Controller {

    constructor() {
        super();
    }

    index(request, respond) {

        let file = this.path.join(this.viewDir, "Index.html");
        respond.sendFile(file);
    }
}

module.exports = IndexPageController;