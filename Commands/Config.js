var config = {
    rollupConfig:{
        minify:false,
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
                exclude:["react","mobx","mobx-react"]
            },
            {
                path:"ReactComponents/jb-checkbox-react/lib/JBCheckBox.js",
                dest:"ReactComponents/jb-checkbox-react/dist/JBCheckBox.min.js",
                cjsDest:"ReactComponents/jb-checkbox-react/dist/JBCheckBox.cjs.min.js",
                systemjsDest:"ReactComponents/jb-checkbox-react/dist/JBCheckBox.systemjs.min.js",
                exclude:["react","mobx","mobx-react","prop-types"]
            },
            {
                path:"ReactComponents/jb-selectbox-react/lib/JBSelectBox.js",
                dest:"ReactComponents/jb-selectbox-react/dist/JBSelectBox.min.js",
                cjsDest:"ReactComponents/jb-selectbox-react/dist/JBSelectBox.cjs.min.js",
                systemjsDest:"ReactComponents/jb-selectbox-react/dist/JBSelectBox.systemjs.min.js",
                exclude:["react","mobx","mobx-react",
                "./JBSelectBoxData$Build_Type_Prefix.min","./JBSelectBoxData.cjs.min","./JBSelectBoxData.min","./JBSelectBoxData.systemjs.min"]
            },
            {
                path:"ReactComponents/jb-selectbox-react/lib/JBSelectBoxData.js",
                dest:"ReactComponents/jb-selectbox-react/dist/JBSelectBoxData.min.js",
                cjsDest:"ReactComponents/jb-selectbox-react/dist/JBSelectBoxData.cjs.min.js",
                systemjsDest:"ReactComponents/jb-selectbox-react/dist/JBSelectBoxData.systemjs.min.js",
                exclude:["mobx"]
            },
            {
                path:"ReactComponents/jb-dateinput-react/lib/JBDateInput.js",
                dest:"ReactComponents/jb-dateinput-react/dist/JBDateInput.min.js",
                cjsDest:"ReactComponents/jb-dateinput-react/dist/JBDateInput.cjs.min.js",
                systemjsDest:"ReactComponents/jb-dateinput-react/dist/JBDateInput.systemjs.min.js",
                exclude:["react","mobx",'mobx-react','jb-modules/DateTimeModule/dist/DateTimeConverter.cjs.min']
            },
            {
                path:"ReactComponents/jb-image-uploader-react/lib/JBImageUploader.js",
                dest:"ReactComponents/jb-image-uploader-react/dist/JBImageUploader.min.js",
                cjsDest:"ReactComponents/jb-image-uploader-react/dist/JBImageUploader.cjs.min.js",
                systemjsDest:"ReactComponents/jb-image-uploader-react/dist/JBImageUploader.systemjs.min.js",
                exclude:["react","mobx",'mobx-react','react-dom','jb-modules/RequestModule/dist/UploadFileRequest.cjs.min']
            },
            {
                path:"ReactComponents/jb-searchbar-react/lib/JBSearchBar.js",
                dest:"ReactComponents/jb-searchbar-react/dist/JBSearchBar.min.js",
                cjsDest:"ReactComponents/jb-searchbar-react/dist/JBSearchBar.cjs.min.js",
                systemjsDest:"ReactComponents/jb-searchbar-react/dist/JBSearchBar.systemjs.min.js",
                exclude:["react","mobx",'mobx-react','react-dom',
                'jb-selectbox-react/dist/JBSelectBox$Build_Type_Prefix.min',
                'jb-selectbox-react/dist/JBSelectBox.systemjs.min',
                'jb-selectbox-react/dist/JBSelectBox.cjs.min',
                'jb-selectbox-react/dist/JBSelectBox.min',
                'jb-selectbox-react/dist/JBSelectBoxData.min',
                'jb-selectbox-react/dist/JBSelectBoxData.systemjs.min',
                'jb-selectbox-react/dist/JBSelectBoxData.cjs.min',
                'jb-selectbox-react/dist/JBSelectBoxData$Build_Type_Prefix.min',
                'jb-dateinput-react/dist/JBDateInput$Build_Type_Prefix.min',
                'jb-dateinput-react/dist/JBDateInput.systemjs.min',
                'jb-dateinput-react/dist/JBDateInput.cjs.min',
                'jb-dateinput-react/dist/JBDateInput.min',]
            },
            {
                path:"ReactComponents/jb-searchbar-react/lib/JBSearchBarData.js",
                dest:"ReactComponents/jb-searchbar-react/dist/JBSearchBarData.min.js",
                cjsDest:"ReactComponents/jb-searchbar-react/dist/JBSearchBarData.cjs.min.js",
                systemjsDest:"ReactComponents/jb-searchbar-react/dist/JBSearchBarData.systemjs.min.js",
                exclude:['mobx']
            },
            {
                path:"ReactComponents/jb-grid-react/lib/JBGrid.js",
                dest:"ReactComponents/jb-grid-react/dist/JBGrid.min.js",
                cjsDest:"ReactComponents/jb-grid-react/dist/JBGrid.cjs.min.js",
                systemjsDest:"ReactComponents/jb-grid-react/dist/JBGrid.systemjs.min.js",
                exclude:["react","mobx",'mobx-react','react-dom',
                    'jb-searchbar-react/dist/JBSearchBar$Build_Type_Prefix.min.min',
                    'jb-searchbar-react/dist/JBSearchBar.systemjs.min',
                    'jb-searchbar-react/dist/JBSearchBar.cjs.min',
                    'jb-searchbar-react/dist/JBSearchBar.min',
                    'jb-modules/Culture/dist/PersianCulture.cjs.min',
                    'jb-searchbar-react/dist/JBSearchBarData$Build_Type_Prefix.min',
                    'jb-searchbar-react/dist/JBSearchBarData.systemjs.min',
                    'jb-searchbar-react/dist/JBSearchBarData.cjs.min',
                    'jb-searchbar-react/dist/JBSearchBarData.min'
                ]
            },
            {
                path:"ReactComponents/jb-grid-react/lib/JBGridData.js",
                dest:"ReactComponents/jb-grid-react/dist/JBGridData.min.js",
                cjsDest:"ReactComponents/jb-grid-react/dist/JBGridData.cjs.min.js",
                systemjsDest:"ReactComponents/jb-grid-react/dist/JBGridData.systemjs.min.js",
                exclude:['mobx']
            },
        ]
    }
}
module.exports = config;