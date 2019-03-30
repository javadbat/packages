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
    }
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
