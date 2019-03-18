var config = {
    rollupConfig:{
        packagesEntryPoints:[
            {
                path:"Modules/jb-module/Culture/PersianCulture.js",
                dest:"Modules/jb-module/Culture/dist/PersianCulture.min.js",
                cjsDest:"Modules/jb-module/Culture/dist/PersianCulture.cjs.min.js",
                systemjsDest:"Modules/jb-module/Culture/dist/PersianCulture.systemjs.min.js",
                exclude:[]
            },
            {
                path:"Modules/jb-module/DateTimeModule/lib/DateTimeConverter.js",
                dest:"Modules/jb-module/DateTimeModule/dist/DateTimeConverter.min.js",
                cjsDest:"Modules/jb-module/DateTimeModule/dist/DateTimeConverter.cjs.min.js",
                systemjsDest:"Modules/jb-module/DateTimeModule/dist/DateTimeConverter.systemjs.min.js",
                exclude:[]
            },
            {
                path:"Modules/jb-module/ExceptionHandler/lib/ExceptionHandler.js",
                dest:"Modules/jb-module/ExceptionHandler/dist/ExceptionHandler.min.js",
                cjsDest:"Modules/jb-module/ExceptionHandler/dist/ExceptionHandler.cjs.min.js",
                systemjsDest:"Modules/jb-module/ExceptionHandler/dist/ExceptionHandler.systemjs.min.js",
                exclude:[]
            },
            {
                path:"Modules/jb-module/FetchHandler/lib/FetchHandler.js",
                dest:"Modules/jb-module/FetchHandler/dist/FetchHandler.min.js",
                cjsDest:"Modules/jb-module/FetchHandler/dist/FetchHandler.cjs.min.js",
                systemjsDest:"Modules/jb-module/FetchHandler/dist/FetchHandler.systemjs.min.js",
                exclude:[]
            },
            {
                path:"Modules/jb-router/lib/Router.js",
                dest:"Modules/jb-router/dist/Router.min.js",
                cjsDest:"Modules/jb-router/dist/Router.cjs.min.js",
                systemjsDest:"Modules/jb-router/dist/Router.systemjs.min.js",
                exclude:[
                    "react",
                    "react-dom",
                    "jb-modules/ExceptionHandler/dist/ExceptionHandler.min",
                    "jb-modules/ExceptionHandler/dist/ExceptionHandler.cjs.min",
                    "jb-modules/ExceptionHandler/dist/ExceptionHandler.systemjs.min"
                ]
            },
            {
                path:"Modules/jb-module/RequestModule/lib/RequestData.js",
                dest:"Modules/jb-module/RequestModule/dist/RequestData.min.js",
                cjsDest:"Modules/jb-module/RequestModule/dist/RequestData.cjs.min.js",
                systemjsDest:"Modules/jb-module/RequestModule/dist/RequestData.systemjs.min.js",
                exclude:[
                    "../../ExceptionHandler/dist/ExceptionHandler.min",
                    "../../ExceptionHandler/dist/ExceptionHandler.systemjs.min",
                    "../../ExceptionHandler/dist/ExceptionHandler.cjs.min"
                ]
            },
            {
                path:"Modules/jb-module/RequestModule/lib/UploadFileRequest.js",
                dest:"Modules/jb-module/RequestModule/dist/UploadFileRequest.min.js",
                cjsDest:"Modules/jb-module/RequestModule/dist/UploadFileRequest.cjs.min.js",
                systemjsDest:"Modules/jb-module/RequestModule/dist/UploadFileRequest.systemjs.min.js",
                exclude:[]
            }
        ],
        reactComponentsEntryPoints:[
            {
                path:"ReactComponents/jb-switch-react/lib/JBSwitch.js",
                dest:"ReactComponents/jb-switch-react/dist/JBSwitch.min.js",
                cjsDest:"ReactComponents/jb-switch-react/dist/JBSwitch.cjs.min.js",
                systemjsDest:"ReactComponents/jb-switch-react/dist/JBSwitch.systemjs.min.js",
                exclude:["react","mobx","mobx-react","./JBSwitch.css","./JBSwitch.css!"]
            },
            {
                path:"ReactComponents/jb-checkbox-react/lib/JBCheckBox.js",
                dest:"ReactComponents/jb-checkbox-react/dist/JBCheckBox.min.js",
                cjsDest:"ReactComponents/jb-checkbox-react/dist/JBCheckBox.cjs.min.js",
                systemjsDest:"ReactComponents/jb-checkbox-react/dist/JBCheckBox.systemjs.min.js",
                exclude:["react","mobx","mobx-react","prop-types","./JBCheckBox.css","./JBCheckBox.css!"]
            },
        ]
    }
}
module.exports = config;