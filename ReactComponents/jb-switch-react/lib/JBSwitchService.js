import React                                        from 'react'
import { observable , extendObservable ,computed}   from 'mobx'
import { observer }                                 from 'mobx-react'
@observer
class JBSwitchService extends React.Component{
    JBSwitchComponentDom = null;
    constructor(config){
        super();
        this.config = observable(config);
    }
    componentWillReceiveProps(nextProps){
        if(this.config.value!=nextProps.value){
            this.config.value=nextProps.value 
        }
    }
    onClick(){
        //call onChange callback
        //temporary we do it ourself
        //we dont make it reacive
        var value = !this.config.value
        var event = new Event("change",{
            detail: {
                oldValue:this.config.value,
                newValue:value
			},
			bubbles: true,
			cancelable: true
        });
        event.simulated = true;
        let tracker = this.JBSwitchComponentDom._valueTracker;
        if (tracker) {
            tracker.setValue(value);
        }
        this.JBSwitchComponentDom.value = value;
        this.JBSwitchComponentDom.onchange = (e)=>this.config.onChange(e);
        this.JBSwitchComponentDom.dispatchEvent(event);
    }
}
export default JBSwitchService