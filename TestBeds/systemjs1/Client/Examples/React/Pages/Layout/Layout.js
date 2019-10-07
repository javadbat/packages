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
                <a className="menu-item" href="/Examples/React" onClick={(e)=>this.Model.loadPage(e)}>dashboard</a>
                <a className="menu-item" href="/Examples/React/FormExamples" onClick={(e)=>this.Model.loadPage(e)}>form examples</a>
                <a className="menu-item" href="/Examples/React/404page" onClick={(e)=>this.Model.loadPage(e)}>404 page</a>
                <a className="menu-item" href="/Examples/React/GridTest" onClick={(e)=>this.Model.loadPage(e)}>Grid test</a>
                <a className="menu-item" href="/Examples/React/SearchBarTest" onClick={(e)=>this.Model.loadPage(e)}>search bar test</a>
            </div>
            <div className="content">
                <div id="PagePlace">loading...</div>
            </div>
        </div>
        return(layout);
    }
}
export default Layout;