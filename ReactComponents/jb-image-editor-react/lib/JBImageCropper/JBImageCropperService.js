import React             from 'react'
import {observable, computed} from "mobx";
class JBImageCropperService extends React.Component{
    @observable cropperStyle = {
        width:0,
        height:0,
        top:0,
        left:0
    }
    @observable cropperImageStyle = {
        width:0,
        height:0,
        clipPath:'inset(0 0 0 0)'
    }
    oldMousePos = {
        top:0,
        left:0
    }
    IsDragingCropper= false;
    //if it set to null mean we are not resize crop frame; else it has point name in it for exampe topRight
    CropperResizingPoint=null;
    constructor(props){
        super(props);
        this.props = props;
        this.props.triggers.crop = (e)=>this.CropImageFile(e);
        this.initCropper()
    }
    initCropper(){
        var widthQuarter = this.props.style.width / 4;
        var heightQuarter = this.props.style.height / 4;
        this.cropperStyle.top = heightQuarter ;
        this.cropperStyle.left = widthQuarter;
        this.cropperStyle.width = widthQuarter*2;
        this.cropperStyle.height = heightQuarter*2;
        this.cropperImageStyle.width = this.props.style.width ;
        this.cropperImageStyle.height = this.props.style.height; ;
        this.cropperImageStyle.clipPath = "inset(" + heightQuarter + "px " + widthQuarter + "px " + heightQuarter + "px " +  widthQuarter + "px)";
    }
    onCropFrameDragStart(e){
        this.IsDragingCropper = true;
        this.oldMousePos.top= e.pageY;
        this.oldMousePos.left= e.pageX;
        e.preventDefault();
    }
    onCropFrameDragEnd(e){
        this.IsDragingCropper = false;
        e.preventDefault();
    }
    onMouseMove(e){
        
        if(this.IsDragingCropper || this.CropperResizingPoint){
            var diffX,diffY;
            diffX = e.pageX - this.oldMousePos.left;
            diffY = e.pageY - this.oldMousePos.top;
            var newY = this.cropperStyle.top + diffY;
            var newX = this.cropperStyle.left + diffX;
            this.oldMousePos.top= e.pageY;
            this.oldMousePos.left= e.pageX;
            if(this.IsDragingCropper && this.CropperResizingPoint == null){
                this.moveCropFrame(newX,newY);
            }
            if(this.CropperResizingPoint){
                this.resizeCropperFrame(diffX,diffY,newX,newY);
            }

        }
        
    }
    moveCropFrame(newX,newY){
        var endPointY = this.props.style.height - (newY + this.cropperStyle.height);
        var endPointX = this.props.style.width - (newX + this.cropperStyle.width);
        if(newY<0 || endPointY<0){
            return false;
        }
        if(newX<0 || endPointX<0){
            return false;
        }
        // if(newX< this.props.style.width){
        //     this.cropperStyle.left = newX;
        // }
        // if(newY< this.props.style.height){
        //     this.cropperStyle.top = newY;
        // }
        this.cropperStyle.top = newY;
        this.cropperStyle.left = newX;
        this.cropperImageStyle.clipPath = "inset(" + newY + "px " + endPointX + "px " + endPointY + "px " +  newX + "px)";
    }
    resizeCropperFrame(diffX,diffY,newX,newY){
        var endPointY = this.props.style.height - (newY + this.cropperStyle.height);
        var endPointX = this.props.style.width - (newX + this.cropperStyle.width);
        this.cropperImageStyle.clipPath = "inset(" + newY + "px " + endPointX + "px " + endPointY + "px " +  newX + "px)";
        switch(this.CropperResizingPoint){
            case 'topRight':
                this.cropperStyle.width += diffX
                this.cropperStyle.top += diffY
                this.cropperStyle.height -= diffY
            break;
            case 'topLeft':
            this.cropperStyle.width -= diffX
            this.cropperStyle.left += diffX
            this.cropperStyle.top += diffY
            this.cropperStyle.height -= diffY
            break;
            case 'bottomRight':
                this.cropperStyle.width += diffX
                this.cropperStyle.height += diffY
            break;
            case 'bottomLeft':
            this.cropperStyle.width -= diffX
            this.cropperStyle.left += diffX
            this.cropperStyle.height += diffY
        break;
        }
    }
    startCornerBtnDrag(e,pointName){
        this.CropperResizingPoint = pointName;
        this.oldMousePos.top= e.pageY;
        this.oldMousePos.left= e.pageX;
        e.preventDefault();
        document.body.addEventListener('mouseup',(e)=>this.stopCornerBtnDrag(e),{once:true});

    }
    stopCornerBtnDrag(e){
        this.CropperResizingPoint = null;
        e.preventDefault();
    }
    CropImageFile(){
        return new Promise ((resolved, rejected)=>{
            //first we calculate our point and size for real size image.
            var realPoints ={
                width:0,
                height:0,
                top:0,
                left:0
            }
            realPoints = this.calculateCropPointinOrginalSize();
             this.croppedCanvas = document.createElement('canvas');
             this.croppedCanvas.class = "cropped-canvas";
             this.croppedCanvas.width = realPoints.width;
             this.croppedCanvas.height = realPoints.height;
             var croppedCanvasContext = this.croppedCanvas.getContext("2d");
             croppedCanvasContext.clearRect(0, 0, realPoints.width, realPoints.height);
             var orginalImageWrapper = document.createElement('img');
             orginalImageWrapper.src = this.props.imageSource;
             croppedCanvasContext.drawImage(orginalImageWrapper, realPoints.left, realPoints.top, realPoints.width, realPoints.height, 0, 0, realPoints.width,realPoints.height);
             var imageBase64Data = croppedCanvasContext.canvas.toDataURL(this.props.imageInfo.imageType,1);
             resolved(imageBase64Data);
            })
    }
    calculateCropPointinOrginalSize(){
        var realPoints ={
            width:0,
            height:0,
            top:0,
            left:0
        }
        var zarib = this.props.imageInfo.width / this.cropperImageStyle.width
        realPoints.width= zarib * this.cropperStyle.width;
        realPoints.height = zarib * this.cropperStyle.height;
        realPoints.top = zarib* this.cropperStyle.top;
        realPoints.left = zarib* this.cropperStyle.left;
        return realPoints;
    }
}
export default JBImageCropperService