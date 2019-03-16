import React     from 'react'
import './Layout.css!'
import LayoutModel from './LayoutModel'
class Layout extends React.Component{
    constructor(){
        super();
        this.Model = new LayoutModel();
    }
    componentDidMount() {

        this.Model.router.pageContainerDidMount();
        //this.router.config.events.onLoadStateChange = this.onRouterLoadStateChange;
         //On Application Bootstrap
         this.Model.router.loadPage(window.location.pathname+(window.location.search?window.location.search:''));
        //this.initStates();

    }
    render(){
        var layout = 
        <div className="layout-wrapper">
            <div className="menu">
                <a href="/Examples/React" onClick={(e)=>this.Model.loadPage(e)}>dashboard</a>
                <a href="/Examples/React/FormExamples" onClick={(e)=>this.Model.loadPage(e)}>form examples</a>
            </div>
            <div className="content">
                <div id="PagePlace">loading...</div>
            </div>
        </div>
        return(layout);
    }
}
export default Layout;