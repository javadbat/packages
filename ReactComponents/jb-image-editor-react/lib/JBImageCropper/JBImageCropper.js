import React             from 'react'
import JBImageCropperService from "./JBImageCropperService";
import { observer }   from 'mobx-react'
import './JBImageCropper.css!'
@observer
class JBImageCropper extends JBImageCropperService {
    constructor(props){
        super(props)
    }
    render(){
        var renderDom = 
        <div className="jb-image-cropper-component" style={this.props.style} onMouseMove={(e)=>this.onMouseMove(e)}>
        <div className="cropper-wrapper">
            <img className="cropper-image" src={this.props.imageSource} style={{clipPath:this.cropperImageStyle.clipPath,width:this.cropperImageStyle.width,height:this.cropperImageStyle.height}}/>
            <div className={"cropper-frame "} style={{top:this.cropperStyle.top,left:this.cropperStyle.left,width:this.cropperStyle.width,height:this.cropperStyle.height}} onMouseDown={(e)=>{this.onCropFrameDragStart(e)}} onMouseUp={(e)=>{this.onCropFrameDragEnd(e)}} >
                <div className="corner-btn top-right" onMouseDown={(e)=>this.startCornerBtnDrag(e,'topRight')}></div>
                <div className="corner-btn top-left" onMouseDown={(e)=>this.startCornerBtnDrag(e,'topLeft')}></div>
                <div className="corner-btn bottom-right" onMouseDown={(e)=>this.startCornerBtnDrag(e,'bottomRight')}></div>
                <div className="corner-btn bottom-left" onMouseDown={(e)=>this.startCornerBtnDrag(e,'bottomLeft')}></div>
            </div>

        </div>   
        </div>
        return renderDom;
    }
}
export default JBImageCropper