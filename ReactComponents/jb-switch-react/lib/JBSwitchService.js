
import { observable}   from 'mobx'
class JBSwitchService{
    JBSwitchComponentDom = null;
    @observable isLoading = false;
    constructor(props){
        this.config = observable(props);
    }

    onClick(){
        var newValue = !this.config.value
        if(typeof this.config.onBeforeChange == "function"){
            var response = this.config.onBeforeChange(newValue);
            if(typeof response.then =="function"){
                //if we had a promise
                //show loading
                this.showLoading();
                response.then((data)=>{
                    this.callOnChange(newValue);
                    this.hideLoading();
                }).catch((e)=>{
                    //stop loadind and fall back
                    this.hideLoading();
                })
            }else{
                this.callOnChange(newValue);
            }
        }else{
            this.callOnChange(newValue);
        }
        
    }
    showLoading(){
        this.isLoading = true;
    }
    hideLoading(){
        this.isLoading = false;
    }
    callOnChange(newValue){
        //call onChange callback
        var event = new Event("change",{
            detail: {
                oldValue:this.config.value,
                newValue:newValue
			},
			bubbles: true,
			cancelable: true
        });
        event.simulated = true;
        let tracker = this.JBSwitchComponentDom._valueTracker;
        if (tracker) {
            tracker.setValue(newValue);
        }
        this.JBSwitchComponentDom.value = newValue;
        if(this.config.onChange){
            this.JBSwitchComponentDom.onchange = (e)=>this.config.onChange(e);
        }
        this.JBSwitchComponentDom.dispatchEvent(event);
    }
}
export default JBSwitchService