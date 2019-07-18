const Controller = require("./Controller");

class TestApi extends Controller {

    constructor(environment) {
        super(environment);
    }

    async Testimageupload(request, response) {
        if(!request.files) {
            response.send({
                status: false,
                message: 'No file uploaded'
            });
        }else{
            //Use the name of the input field (i.e. "image") to retrieve the uploaded file
            let image = request.files.image;
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            image.mv(this.assetDir +'/Images/UploadedImage/'+ image.name);

            //send response
            return response.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: image.name,
                    mimetype: image.mimetype,
                    size: image.size
                }
            });
        }

        return response;
    }
    Testimagedownload(request , response){
        let file = this.path.join(this.assetDir +'/Images/UploadedImage/'+ request.params.imageName);
        response.sendFile(file);
    }
}

module.exports = TestApi;