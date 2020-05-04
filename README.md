# packages

## sub modules

    this repo conatin too many sub modules of jb-* so it can build and test them if you want to work with it correctly read this part

### clone repo with its sub modules

 run `git clone --recurse-submodules https://github.com/javadbat/packages`

### work with sub module after

 if you clone this repo and dont get forget to use `--recurse-submodules` flag you can run `git submodule update --init`  
 if you remove `--init` it just sync current loaded submodules with repository

### add sub module to repo by

    `git submodule add https://github.com/javadbat/jb-select.git WebComponents/jb-select`

## Run project

    `npm run serve`
