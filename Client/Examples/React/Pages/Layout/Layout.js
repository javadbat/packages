import React     from 'react'
import './Layout.css!'
class Layout extends React.Component{
    render(){
        var layout = 
        <div className="layout-wrapper">
            <div className="menu">menu</div>
            <div className="content">content</div>
        </div>
        return(layout);
    }
}
export default Layout;