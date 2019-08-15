/*TODO:
1-policy to check access of page for user in server side rendering list
2-parameter base load url
3-type of link is react ,pure,vue,jquery,etc
4-branch management of route
5- Router Extra Parameters
*/
class RouterData {
    instanceName='reactExamples';
    //the base we want to remove in SPA load
    basePath = '/Examples/React';
    //the tag we want to replace
    pageContainerTagId = 'PagePlace';

    //we add this url before every componentPath in data to load from server
    componentsPathPrefix = "";

    //Pages Title Prefix
    pagesTitlePrefix = "React-";
    standardPageRoutes = {
    };
    routes = [
                {
                    url:                "/",
                    type:               "REACT",
                    reactComponentPath: "/Client/Examples/React/Pages/Dashboard/Dashboard.js",
                    name:               "Dashboard",
                    title:              "داشبورد"
                },
                {
                    url:                "/FormExamples",
                    name:               "FormExamples",
                    type:               "REACT",
                    settings: {
                        group: "FormExamples"
                    },
                    title:              "form examples",
                    reactComponentPath: "/Client/Examples/React/Pages/FormElementTestPage/FormElementTestPage.js"
                },
                {
                    url:                "/gridTest",
                    name:               "gridtest",
                    type:               "REACT",
                    settings: {
                        group: "gridExamples"
                    },
                    title:              "grid test",
                    reactComponentPath: "/Client/Examples/React/Pages/GridTest/GridTest.js"
                },
            ];

}
export default new RouterData();
