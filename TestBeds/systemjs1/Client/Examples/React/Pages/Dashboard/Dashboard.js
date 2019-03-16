import React     from 'react'
import DashboardModel from './DashboardModel'
class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.model = new DashboardModel();
    }
    render(){
        var layout = 
        <div className="dashboard-wrapper">
            dashboard
            <button onClick={(e)=>this.model.createFakeRest()}>call fetch Rest</button>
        </div>
        return(layout);
    }
}
export default Dashboard;