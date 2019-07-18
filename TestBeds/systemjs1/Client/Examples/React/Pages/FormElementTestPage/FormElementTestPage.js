import React     from 'react'
import { observer }     from 'mobx-react'
import JBCheckBox from '/jb-checkbox-react/dist/JBCheckBox.systemjs.min'
import FormElementTestPageModel from './FormElementTestPageModel'
import JBImageUploader from 'jb-image-uploader-react/dist/JBImageUploader.systemjs.min'
import './FormElementTestPage.css!'
@observer
class FormElementTestPage extends React.Component{
    constructor(){
        super();
        this.model = new FormElementTestPageModel();
    }
    render(){
        var layout = 
        <div className="form-element-test-wrapper">
            <h1>چک باکس</h1>
            <JBCheckBox title="تست چک باکس" value={this.model.formData.checkbox1} onChange={(e)=>this.model.onChange(e,this.model.formData,'checkbox1')}></JBCheckBox>
            <JBImageUploader config={this.model.imageUploaderConfig} value={this.model.formData.imageName} onSuccess={(e)=>this.model.onSuccessImageUpload(e)} onProgress={(e)=>this.model.onProgressImageUpload(e)} onError={(e)=>this.model.onErrorImageUpload(e)}></JBImageUploader>
            <button onClick={(e)=>this.model.sendFakePostRequest()}>send post req</button>
        </div>
        return(layout);
    }
}
export default FormElementTestPage;