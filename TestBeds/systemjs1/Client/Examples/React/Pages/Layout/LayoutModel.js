import routerData from '../../Config/JBRouterConfigData'
import Router from '../../../../../../../Modules/jb-router/lib/Router';
import ExceptionHandler from '../../../../../../../Modules/jb-module/ExceptionHandler/lib/ExceptionHandler'
class LayoutModel{

    constructor(){
        this.router = new Router(routerData,ExceptionHandler.newException);
    }
    loadPage(event){
        event.preventDefault();
        var url = event.currentTarget.attributes['href'].value;
        this.router.loadPage(url);
    }

}
export default LayoutModel;