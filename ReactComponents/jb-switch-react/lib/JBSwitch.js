import React                from 'react'
import JBSwitchService      from './JBSwitchService'
import { observer }         from 'mobx-react'
import './JBSwitch.css'

@observer
 class JBSwitch extends React.Component{
    constructor(props){
        super(props);
        this.service = new JBSwitchService(props);
    }
    componentWillReceiveProps(nextProps){
        if(this.service.config.value!=nextProps.value){
            this.service.config.value=nextProps.value 
        }
    }
    render(){
        var renderDom = <div className="jb-switch-component-wrapper" ref={(dom)=>{this.service.JBSwitchComponentDom = dom}}>
            <div className={"caption "+  (this.service.config.value?'active':'')}>{this.service.config.trueTitle?this.service.config.trueTitle:''}</div>
            <div className="svg-wrapper" onClick={(e)=>this.service.onClick(e)}>
                <svg className={"switch-svg " + (this.service.config.value?'active':'')} viewBox="0 0 710 440">
                    <defs>      
                    <filter xmlns="http://www.w3.org/2000/svg" id="dropshadow" height="150%"><feGaussianBlur in="SourceAlpha" stdDeviation="7"></feGaussianBlur><feOffset dx="0" dy="0" result="offsetblur"></feOffset><feComponentTransfer><feFuncA type="linear" slope="0.9"></feFuncA></feComponentTransfer><feMerge><feMergeNode></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter>
                    <radialGradient id="color1" cx="50%" cy="50%" r="75%" > 
                        <stop offset="0%" style={{stopColor:"rgb(255,255,255)",stopOpacity:"1"}} />
                        <stop offset="99%" style={{stopColor:"rgb(224,224,224)",stopOpacity:"1"}} />
                        <stop offset="100%" style={{stopColor:"rgb(224,224,224)",stopOpacity:"1"}} />
                    </radialGradient> 
                    </defs>
                    <rect className="bg-bar"  x="20" y="40" height="360" width="680" stroke="red" rx="180" strokeWidth="0"  />
                    <circle className="trigger-circle" fill="url(#color1)" cx="220" cy="220" r="200" filter="url(#dropshadow)"/>
                    <circle className={"trigger-circle-bar "+(this.service.isLoading?'loading':'')} cx="220" cy="220" r="120" filter="url(#dropshadow)"/>
                </svg>
            </div>
            <div className={"caption "+  (!this.service.config.value?'active':'')}>{this.service.config.falseTitle?this.service.config.falseTitle:''}</div>
        </div>
        return(renderDom);

    }
 }
//  JBSwitch.propTypes = {
//      value:PropTypes.bool.isRequired,
//      onChange:PropTypes.func,
//      trueTitle:PropTypes.string,
//      falseTitle:PropTypes.string,
//      //if we set it to true component will update value by it self and dont need to update value in onChange event 
//      //onChange still calling but not necessary anymore
//  }
 export default JBSwitch