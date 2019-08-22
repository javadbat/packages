const rollup = require('rollup');
const BuildClass = require('../Commands/Build/BuildClass').defualt;
var config = require('../Commands/Config')
class WatchJsFile{
    constructor(){
        console.log('watch started.');
        this.builder = new BuildClass();
        this.registerWatches();
    }
    registerWatches(){
        config.rollupConfig.reactComponentsEntryPoints.forEach((rollupComponent)=>{
            var inputOptions = this.builder.getInputOptions(rollupComponent);
            var outputOptions = this.builder.getOutputOptions(rollupComponent);
            var watcher =  rollup.watch({
                ...inputOptions.es,
                output:outputOptions.es,
                watch:{
                    exclude:rollupComponent.exclude
                }
            });
            watcher.addListener()
            watcher.on('event',event=>{
                if (event.code === 'BUNDLE_START') {
                    console.log('Bundling...');
                  } else if (event.code === 'BUNDLE_END') {
                    console.log('Bundled in ' + event.duration + 'ms.');
                  } else if (event.code === 'ERROR' || event.code === 'FATAL') {
                    console.error(event.error);
                  }
            });
        });
    }
}
exports.defualt = WatchJsFile
