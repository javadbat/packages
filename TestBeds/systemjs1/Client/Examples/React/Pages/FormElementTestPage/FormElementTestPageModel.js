import RequestData from 'jb-modules/RequestModule/dist/RequestData.min'
import {fetchResponseHandler,fetchErrorHandler} from 'jb-modules/FetchHandler/dist/FetchHandler.min'
import { observable }   from 'mobx'
class FormElementTestPageModel{
    @observable formData= {
        checkbox1:true
    }
    constructor(){

    }
    onChange(e,obj,prop){
        obj[prop] = e.target.value;
    }

}
export default FormElementTestPageModel;