import React             from 'react'
import JBImageEditorService from "./JBImageEditorService";
import './JBImageEditor.css!'
import { observer }   from 'mobx-react'
import JBImageCropper from './JBImageCropper/JBImageCropper'
@observer
class JBImageEditor extends React.Component {
    constructor(props){
        super(props);
        this.service = new JBImageEditorService(props);
    }
    componentDidMount() {
        this.service.initEditor();
    }
    render(){
        var renderDom = 
        <div className="jb-image-editor-component">
            <div className="title-wrapper">
                <div className="close-btn" onClick={(e)=>this.service.onCloseEditor()}>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 493.456 493.456" xlink="http://www.w3.org/1999/xlink" space="preserve">
                        <g>
                            <g>
                                <path d="M246.73,0C110.682,0,0.002,110.684,0.002,246.744c0,136.032,110.68,246.712,246.728,246.712    s246.724-110.68,246.724-246.712C493.454,110.684,382.778,0,246.73,0z M360.258,348.776l-11.112,11.12    c-2.808,2.836-7.82,2.836-10.644,0l-88.68-88.672c-0.728-0.74-1.704-1.136-2.732-1.136c-1.028,0-2.004,0.4-2.732,1.136    L155.682,359.9c-2.82,2.836-7.828,2.836-10.648,0l-11.108-11.12c-1.412-1.404-2.196-3.304-2.196-5.3    c0-2.02,0.784-3.916,2.196-5.344l88.68-88.672c1.508-1.512,1.508-3.948,0-5.452l-88.68-88.68c-1.412-1.416-2.196-3.308-2.196-5.32    c0-2.02,0.784-3.916,2.196-5.328l11.108-11.108c2.82-2.82,7.828-2.82,10.648,0l88.68,88.672c1.444,1.444,4.016,1.444,5.46,0    l88.676-88.676c2.824-2.824,7.836-2.824,10.644,0l11.112,11.112c2.928,2.924,2.928,7.716,0,10.648l-88.692,88.676    c-1.504,1.504-1.504,3.94,0,5.452l88.696,88.672C363.186,341.072,363.186,345.844,360.258,348.776z"/>
                            </g>
                        </g>
                    </svg>
                </div>
                <div className="title">ویرایش تصویر</div>
            </div>
            <div className="editor-wrapper">
                <div className="tools-wrapper">
                    <div className="tool-btn" onClick={()=>this.service.toggleCropMode()}>
                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg"  version="1.1" id="Capa_1"  viewBox="0 0 533.333 533.333" >
                                <g>
                                    <path d="M433.333,133.333l100-100L500,0L400,100H166.667V0H100v100H0v66.667h100v266.667h266.667v100h66.667v-100h100v-66.666h-100   V133.333z M166.667,166.667h166.667L166.667,333.333V166.667z M200,366.667L366.667,200v166.667H200z" />
                                </g>
                            </svg>
                        </div>
                        <div className="caption">
                        برش تصویر
                        </div>
                    </div>
                    {   
                        this.service.currentMode == 'normal' &&
                        <div className="final-approval-btn" onClick={()=>this.service.approveImage()}>
                            <svg xmlns="http://www.w3.org/2000/svg"  version="1.1" id="Capa_1" viewBox="0 0 55.702 55.702" >
                                <g>
                                    <g>
                                        <path d="M27.851,0C12.494,0,0,12.494,0,27.851s12.494,27.851,27.851,27.851s27.851-12.494,27.851-27.851    C55.701,12.494,43.208,0,27.851,0z M27.851,51.213c-12.882,0-23.362-10.48-23.362-23.363c0-12.882,10.48-23.362,23.362-23.362    s23.362,10.481,23.362,23.363S40.733,51.213,27.851,51.213z"/>
                                        <path d="M36.729,18.97l-13,13.001l-4.757-4.757c-0.876-0.877-2.297-0.877-3.173,0    c-0.877,0.876-0.877,2.297,0,3.173l6.344,6.344c0.438,0.438,1.013,0.658,1.587,0.658s1.148-0.219,1.586-0.658l14.587-14.587    c0.876-0.877,0.876-2.297,0-3.174C39.026,18.094,37.606,18.094,36.729,18.97z"/>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    }

                    { this.service.currentMode == 'crop' &&
                        <div className="cancel-accept-btn-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg"  version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512">
                                <path style={{fill:"#fff"}} d="M256,480c-3.2,0-5.6,0-8.8,0l0.8-16c4.8,0,10.4,0,15.2,0l0.8,16C261.6,480,258.4,480,256,480z   M288.8,477.6l-2.4-16c4.8-0.8,10.4-1.6,15.2-2.4l3.2,16C299.2,476,294.4,476.8,288.8,477.6z M328.8,468l-4.8-15.2  c4.8-1.6,9.6-3.2,14.4-5.6l6.4,14.4C339.2,464,334.4,466.4,328.8,468z M366.4,451.2l-8-13.6c4.8-2.4,8.8-5.6,12.8-8l8.8,13.6  C376,444.8,371.2,448,366.4,451.2z M400.8,427.2l-10.4-12c4-3.2,8-6.4,11.2-10.4l11.2,11.2C408.8,420,404.8,423.2,400.8,427.2z   M429.6,397.6l-12-10.4c3.2-4,6.4-8,9.6-12L440,384C436.8,388.8,432.8,393.6,429.6,397.6z M452.8,363.2l-14.4-8  c2.4-4.8,4.8-8.8,7.2-13.6L460,348C457.6,353.6,455.2,358.4,452.8,363.2z M468.8,324.8l-15.2-4.8c1.6-4.8,3.2-9.6,4-15.2l15.2,4  C472,314.4,471.2,320,468.8,324.8z M478.4,284.8l-16-2.4c0.8-4.8,0.8-10.4,1.6-15.2l16,0.8C479.2,273.6,479.2,279.2,478.4,284.8z   M48,243.2l-16-0.8c0-5.6,0.8-11.2,1.6-16.8l16,2.4C48.8,232.8,48.8,238.4,48,243.2z M54.4,205.6l-15.2-4c1.6-5.6,3.2-10.4,4.8-16  l15.2,4.8C56.8,195.2,55.2,200.8,54.4,205.6z M67.2,168.8l-14.4-6.4c2.4-4.8,4.8-9.6,7.2-15.2l14.4,8  C71.2,160,68.8,164.8,67.2,168.8z M86.4,136l-12.8-9.6c3.2-4.8,6.4-8.8,10.4-12.8L96,124C92,127.2,88.8,132,86.4,136z M111.2,106.4  L100,95.2c4-4,8-7.2,12-11.2l10.4,12C118.4,99.2,115.2,103.2,111.2,106.4z M140.8,82.4L132,68.8c4.8-3.2,9.6-5.6,14.4-8.8l8,13.6  C149.6,76.8,145.6,80,140.8,82.4z M175.2,64l-6.4-14.4c4.8-2.4,10.4-4,15.2-5.6l4.8,15.2C184.8,60.8,180,62.4,175.2,64z M212,52.8  l-3.2-16c5.6-0.8,11.2-2.4,16-3.2l2.4,16C221.6,50.4,216.8,52,212,52.8z M265.6,48c-4.8,0-10.4,0-15.2,0l-0.8-16  c5.6,0,11.2,0,16.8,0L265.6,48z"/>
                                <path style={{fill:"#FFFFFF"}} d="M136,247.2L136,247.2c-71.2,0-128,57.6-128,128l0,0c0,71.2,57.6,128,128,128l0,0  c71.2,0,128-57.6,128-128l0,0C264.8,304.8,207.2,247.2,136,247.2z"/>
                                <path style={{fill:"#00a7ff"}} d="M136,239.2c-75.2,0-136,60.8-136,136s60.8,136,136,136s136-60.8,136-136  C272.8,300.8,211.2,239.2,136,239.2z M136,496c-65.6,0-120-53.6-120-120s53.6-120,120-120s120,53.6,120,120S202.4,496,136,496z"/>
                                <path style={{fill:"#FDBF5E"}} d="M136,472c-52.8,0-96-43.2-96-96s43.2-96,96-96s96,43.2,96,96C232.8,428.8,189.6,472,136,472z"/>
                                <g className="accept-btn" onClick={(e)=>{this.service.onAcceptBtnClick()}}>
                                    <path style={{fill:"#FFFFFF"}}  d="M376,8L376,8c-71.2,0-128,57.6-128,128l0,0c0,71.2,57.6,128,128,128l0,0c71.2,0,128-57.6,128-128l0,0  C504,65.6,446.4,8,376,8z"/>
                                    <path style={{fill:"#00a7ff"}} d="M376,272.8c-75.2,0-136-60.8-136-136s60.8-136,136-136s136,60.8,136,136  C512,211.2,451.2,272.8,376,272.8z M376,16c-66.4,0-120,53.6-120,120s53.6,120,120,120s120-53.6,120-120S442.4,16,376,16z"/>
                                    <path style={{fill:"#4FBF9F"}} d="M376,232.8c-52.8,0-96-43.2-96-96s43.2-96,96-96s96,43.2,96,96S428.8,232.8,376,232.8z"/>
                                    <polygon style={{fill:"#193651"}} points="422.4,91.2 349.6,163.2 330.4,128.8 316,136.8 346.4,189.6 433.6,102.4  "/>
                                </g>
                                
                                
                                <g>
                                    <polygon style={{fill:"#193651"}} points="170.4,330.4 136,364 102.4,330.4 91.2,341.6 124.8,376 91.2,409.6 102.4,420.8 136,387.2    170.4,420.8 181.6,409.6 148,376 181.6,341.6  "/>
                                </g>
                            </svg>
                        </div>
                    }
                </div>
                <div className="canvas-wrapper">
                    <div className="canvas" ref={(elem)=>{this.service.elements.canvas= elem}}>
                        <img src={this.service.mainImageSource} style={{width:this.service.mainImageStyles.width,height:this.service.mainImageStyles.height,top:this.service.mainImageStyles.top,left:this.service.mainImageStyles.left}}/>
                        {
                            this.service.currentMode=="crop" &&
                            <JBImageCropper imageInfo={this.service.mainImageInfo} imageSource={this.service.mainImageSource} style={{width:this.service.mainImageStyles.width,height:this.service.mainImageStyles.height,top:this.service.mainImageStyles.top,left:this.service.mainImageStyles.left}} triggers={this.service.cropperTriggers}></JBImageCropper>
                        }
                    </div>
                </div>
            
            </div>
        </div>
        return renderDom;
    }
}
export default JBImageEditor