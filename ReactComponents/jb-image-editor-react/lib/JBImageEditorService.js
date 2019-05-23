import React             from 'react'
import {observable, computed} from "mobx";
class JBImageEditorService {
    @observable config={
        // callbacks:{

        // }
    }
    @observable prop={
        imageFile:null,
    }
    //keep base 64 image data value
    @observable mainImageSource;
    //keep image main data like orginal width /height ,etc
    mainImageInfo;
    @observable mainImageStyles={
        width:0,
        height:0,
        top:0,
        left:0
    }
    elements = {
        canvas:null
    }
    cropperTriggers = {
        crop:null,
        cancel:null
    }
    @observable currentMode = "normal";
    constructor(prop){
        Object.assign(this.config,prop.config);
        this.prop = prop
        
    }
    async initEditor(){
        //TODO: enable loading
        await this.initMainImage()
        
        this.calcSize();
        //TODO: hide loading
    }
    initMainImage(){
        return new Promise ((resolved, rejected)=>{
            var reader = new FileReader();
            reader.onload = e => {
                this.mainImageSource =  e.target.result;
                this.getBase64ImagInfo(this.mainImageSource).then((info)=>{
                    this.mainImageInfo = info
                    this.mainImageInfo.imageType = this.prop.imageFile.type;
                    resolved();
                });
            };
            reader.readAsDataURL(this.prop.imageFile);
            
        });
    }

    async calcSize(){
        var cw = this.elements.canvas.offsetWidth;
        var ch = this.elements.canvas.offsetHeight;
        var zarib = 0;
        if(this.mainImageInfo.width>this.mainImageInfo.height){
            
            zarib = cw/this.mainImageInfo.width;
            if(zarib * this.mainImageInfo.height>ch){
                zarib = ch/this.mainImageInfo.height;
            }
        }else{
            zarib = ch/this.mainImageInfo.height;
            if(zarib * this.mainImageInfo.width > cw){
                zarib = cw/this.mainImageInfo.width;
            }
        }
        this.mainImageStyles.height = zarib * this.mainImageInfo.height;
        this.mainImageStyles.width = zarib * this.mainImageInfo.width;
        this.mainImageStyles.top = (ch - this.mainImageStyles.height)/2
        this.mainImageStyles.left = (cw - this.mainImageStyles.width)/2
    }
    getBase64ImagInfo(file) {
        //return orginal base64 image information 
        return new Promise (function (resolved, rejected) {
          var i = new Image()
          i.onload = function(){
            if(i.width>i.height){
                i.orientation = "landscape";
            }else{
                i.orientation = "portriat";
            }
            resolved(i)
          };
          i.src = file
        })
      }
    onCloseEditor(){
        if(this.config.callBacks.onClose){
            this.config.callBacks.onClose();
        }
    }
    approveImage(){
        if(this.config.callBacks.onApprove){
            this.config.callBacks.onApprove(this.mainImageSource);
        }
    }
    toggleCropMode(){
        this.currentMode = "crop"
    }
    onAcceptBtnClick(){
        //when user click on accept btn in picture edit mode like crop
        switch(this.currentMode){
            case 'crop':
            this.cropperTriggers.crop().then((newImageBase64Data)=>{
                this.currentMode = 'normal';
                this.InitImageAfterEdit(newImageBase64Data);
            });
            break;
        }
        
    }
    InitImageAfterEdit(newImageBase64Data){
        this.getBase64ImagInfo(newImageBase64Data).then((info)=>{
            this.mainImageInfo = info;
            this.mainImageSource = newImageBase64Data;
        })
    }
    
}
export default JBImageEditorService;