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
        src: './Client/Examples/React/Pages/Layout/Layout.scss',
        watch: true
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
