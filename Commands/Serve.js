
var ServerApplication =require( "../Server/ServeApplication").default

var application = new ServerApplication();
application.runExpress();
application.registerPageUrls();
application.RegisterStaticFileRoutes();
application.watchScssFile();