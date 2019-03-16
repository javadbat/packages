import RequestData from 'jb-modules/RequestModule/dist/RequestData.min'
import {fetchResponseHandler,fetchErrorHandler} from 'jb-modules/FetchHandler/dist/FetchHandler.min'
class DashboardModel{
    constructor(){

    }
    createFakeRest(){
        var request = new RequestData({
            url:'https://httpstat.us/408',
            auth:false
        })
        fetch(request.request).catch((err)=>{
            //when we get cors error;
            console.log('cors-error happend')
            debugger
        }).then(fetchResponseHandler(request)).then((data)=>{
            debugger;
        }).catch((err)=>{
            debugger;
            fetchErrorHandler(err)
        })
    }
}
export default DashboardModel;