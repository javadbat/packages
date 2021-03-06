import RequestData from 'jb-modules/RequestModule/dist/RequestData.min'
import {fetchResponseHandler,fetchErrorHandler} from 'jb-modules/FetchHandler/dist/FetchHandler.min'
import JBImageEditor from 'jb-image-editor-react/lib/JBImageEditor'
import JBSelectBoxData from 'jb-selectbox-react/dist/JBSelectBoxData.min';
import ReactDOM         from 'react-dom'
import { observable }   from 'mobx'
import React             from 'react'
class FormElementTestPageModel{
    @observable formData= {
        checkbox1:true,
        imageName:'',
        selectBox1:1,
        fromDate:"2008-02-04T12:00:00:00.000"
    }
    fromDateConfig={
        inputMask:"yyyy-MM-ddTHH:mm:ss.SSS",
    }
    imageUploaderConfig={
        urls:{
            showImage:'/api/testimagedownload/{value}',
            uploadImage:'/api/testimageupload',
        },
        callBacks:{
            openEditor:(imageFile)=>this.onOpenImageEditor(imageFile)
        },
        formKey:'image',
    }
    JBImageEditorConfig ={
        callBacks:{
            onClose:()=>this.onImageEditorClosed(),
            onApprove:(imageURI)=>this.onImageEditorApproved(imageURI),
        }
    }
    JBSelectBoxConfig = new JBSelectBoxData()
    elements={
        imageEditorDOM:null
    }
    constructor(){
        this.configSelectBox();
        
    }
    configSelectBox(){
        this.JBSelectBoxConfig.fieldsNames = {
            value:'id',
            caption:'name'
        }
        this.JBSelectBoxConfig.options = [
            {
                id:1,
                name:'گزینه 1'
            },
            {
                id:2,
                name:'گزینه 2'
            },
            {
                id:3,
                name:'گزینه 3'
            }
        ]
    }
    onChange(e,obj,prop){
        obj[prop] = e.target.value;
    }
    sendFakePostRequest(){
        var request = new RequestData({
            url:'/api/testimageupload',
            method:'POST',
            body:{
                a:'a'
            }
        });
        fetch(request.request).then(fetchResponseHandler(request)).then((data)=>{
            debugger;
        }).catch(fetchErrorHandler);
    }
    onSuccessImageUpload(response) {
        this.formData.imageName=response.data.name;
    }
    onErrorImageUpload(e) {
        showMessage('در هنگام آپلود تصویر مشکلی پیش آمده است','error',e)
    }

    onProgressImageUpload(p) {
    }
    onOpenImageEditor(imageFile){
        this.elements.imageEditorDOM= document.createElement('div');
        this.elements.imageEditorDOM.classList.add('jb-image-editor-float-container')
        var body = document.getElementsByTagName("body");
        body[0].appendChild(this.elements.imageEditorDOM);
        //TODO make it pluggable so if they want editor they inject editor as a parameter
        //به این صورت شود که یک تابعی به نام اپن ادیتور نوشته شود و بعد با فعال کردن مکانیزم ادیتور آن تابع صدا زده شود تا ادیتور فعال گردد
        ReactDOM.render(React.createElement( JBImageEditor,{config:this.JBImageEditorConfig,imageFile:imageFile}),this.elements.imageEditorDOM,this.onImageEditorLoadComplete());

    }
    onImageEditorLoadComplete(){
        
    }
    onImageEditorClosed(){
        this.virtualInputFile.value = '';
        this.elements.imageEditorDOM.parentNode.removeChild(this.elements.imageEditorDOM);
        this.elements.imageEditorDOM = null;
    }
    onImageEditorApproved(imageURI){
        var file = this.dataURItoBlob(imageURI);
        debugger;
        this.imageUploaderConfig.triggers.uploadImageBlob(file);
        //this.uploadImage(file);
        //return it to defualt value
        this.useImageEditor = false;
        this.elements.imageEditorDOM.parentNode.removeChild(this.elements.imageEditorDOM);
        this.elements.imageEditorDOM = null;
    }
    dataURItoBlob(dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: this.selectedImageType});
    }
    changeSelectBoxData(){
        this.formData.selectBox1 = 2;
    }
}
export default FormElementTestPageModel;