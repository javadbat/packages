import React     from 'react'
import { observer }     from 'mobx-react'
import JBCheckBox from '/jb-checkbox-react/dist/JBCheckBox.systemjs.min'
import FormElementTestPageModel from './FormElementTestPageModel'
import JBImageUploader from 'jb-image-uploader-react/dist/JBImageUploader.systemjs.min'
import JBSelectBox from 'jb-selectbox-react/dist/JBSelectBox.systemjs.min'
import JBSwitch from 'jb-switch-react/dist/JBSwitch.systemjs.min'
import JBDateInput from 'jb-dateinput-react/dist/JBDateInput.min';
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
            <JBSelectBox value={this.model.formData.selectBox1} className={"form-element "} config={this.model.JBSelectBoxConfig} onChange={(e)=>this.model.onChange(e,this.model.formData,"selectBox1")}></JBSelectBox>
            <button onClick={(e)=>this.model.sendFakePostRequest()}>send post req</button>
            <button onClick={(e)=>this.model.changeSelectBoxData()}>change selectbox value dynamically</button>
            <br></br>
            <JBDateInput className="form-element" value={this.model.formData.fromDate} config={this.model.fromDateConfig}  onChange={(e)=>this.model.onChange(e,this.model.formData,"fromDate")}></JBDateInput>
            <JBSwitch value={this.model.formData.checkbox1} trueTitle="صحیح" falseTitle="غلط"  onChange={(e)=>this.model.onChange(e,this.model.formData,'checkbox1')}></JBSwitch>
        </div>
        return(layout);
    }
}
export default FormElementTestPage;