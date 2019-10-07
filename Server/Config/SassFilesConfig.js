const sassFiles = [
    // {
    //     src: './Client/PanelApp/Assets/Scss/Bundle.scss',
    //     dependencies: [
    //         "./Client/Assets/Scss/Fonts.scss",
    //         "./Client/PanelApp/Assets/Scss/PagesGeneralStyles.scss",
    //         "./Client/PanelApp/Assets/Scss/Tab.scss",
            
    //     ],
    //     dest: './Client/PanelApp/Assets/Css/Bundle.css',
    //     watch: false
    // },
    {
        src: './TestBeds/systemjs1/Client/Examples/React/Pages/Layout/Layout.scss',
        watch: true
    },
    {
        src: './TestBeds/systemjs1/Client/Examples/React/Pages/FormElementTestPage/FormElementTestPage.scss',
        watch: true
    },
    {
        src: './TestBeds/systemjs1/Client/Examples/React/Pages/GridTest/GridTest.scss',
        watch: true
    },
    {
        src: './TestBeds/systemjs1/Client/Examples/React/Pages/SearchBarTest/SearchBarTest.scss',
        watch: true
    },
    {
        src: './ReactComponents/jb-switch-react/lib/JBSwitch.scss',
        watch: true
    },
    {
        src: './ReactComponents/jb-switch-react/lib/JBSwitch.scss',
        watch: true,
        dest:"./ReactComponents/jb-switch-react/dist/JBSwitch.css"
    },
    {
        src: './ReactComponents/jb-checkbox-react/lib/JBCheckBox.scss',
        watch: true,
        dest:"./ReactComponents/jb-checkbox-react/dist/JBCheckBox.css"
    },
    {
        src: './ReactComponents/jb-checkbox-react/lib/JBCheckBox.scss',
        watch: true,
        dest:"./ReactComponents/jb-checkbox-react/lib/JBCheckBox.css"
    },
    {
        src: './ReactComponents/jb-selectbox-react/lib/JBSelectBox.scss',
        watch: true,
        dest:"./ReactComponents/jb-selectbox-react/lib/JBSelectBox.css"
    },
    {
        src: './ReactComponents/jb-selectbox-react/lib/JBSelectBox.scss',
        watch: true,
        dest:"./ReactComponents/jb-selectbox-react/dist/JBSelectBox.css"
    },
    {
        src: './ReactComponents/jb-dateinput-react/lib/JBDateInput.scss',
        watch: true,
        dest:"./ReactComponents/jb-dateinput-react/dist/JBDateInput.css"
    },
    {
        src: './ReactComponents/jb-dateinput-react/lib/JBDateInput.scss',
        watch: true,
        dest:"./ReactComponents/jb-dateinput-react/lib/JBDateInput.css"
    },
    {
        src: './ReactComponents/jb-image-uploader-react/lib/JBImageUploader.scss',
        watch: true,
        dest:"./ReactComponents/jb-image-uploader-react/lib/JBImageUploader.css"
    },
    {
        src: './ReactComponents/jb-image-uploader-react/lib/JBImageUploader.scss',
        watch: true,
        dest:"./ReactComponents/jb-image-uploader-react/dist/JBImageUploader.css"
    },
    {
        src: './ReactComponents/jb-searchbar-react/lib/JBSearchBar.scss',
        watch: true,
        dest:"./ReactComponents/jb-searchbar-react/lib/JBSearchBar.css"
    },
    {
        src: './ReactComponents/jb-searchbar-react/lib/JBSearchBar.scss',
        watch: true,
        dest:"./ReactComponents/jb-searchbar-react/dist/JBSearchBar.css"
    },
    {
        src: './ReactComponents/jb-grid-react/lib/JBGrid.scss',
        watch: true,
        dest:"./ReactComponents/jb-grid-react/dist/JBGrid.css"
    },
    {
        src: './ReactComponents/jb-grid-react/lib/JBLoading/JBLoading.scss',
        watch: true,
        dest:"./ReactComponents/jb-grid-react/dist/JBLoading/JBLoading.css"
    },
    {
        src: './ReactComponents/jb-grid-react/lib/JBGrid.scss',
        watch: true,
        dest:"./ReactComponents/jb-grid-react/lib/JBGrid.css"
    },
    {
        src: './ReactComponents/jb-grid-react/lib/JBLoading/JBLoading.scss',
        watch: true,
        dest:"./ReactComponents/jb-grid-react/lib/JBLoading/JBLoading.css"
    },
];



exports.watchingFiles = (function() {
    var watchingFiles = [];

    //Check If Watch is True then add It
    for(let file of sassFiles) {
        if(file.watch) {
            watchingFiles.push({
                src:  file.src,
                dependencies: (file.dependencies ? file.dependencies : []),
                dest: (file.dest ? file.dest : file.src.replace("scss","css"))
            });
        }
    }

    return watchingFiles;
}());
