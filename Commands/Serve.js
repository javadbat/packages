
var ServerApplication =require( "../Server/ServeApplication").default
var args = process.argv;
var testbedEnvirement = args[2]?args[2]:'systemjs1'

var application = new ServerApplication(testbedEnvirement);
application.runExpress();
application.registerPageUrls();
application.RegisterStaticFileRoutes();
application.watchScssFile();
application.WatchJsFile();